// Purpose : Express server for FitTrack with SQLite persistence and API integrations
// Date    : 2025-05-04
// Version : v1.0.0

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const axios = require('axios');

// Configuration (normally would be in .env file)
const PORT = 3000;
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID || 'your-app-id-here';
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY || 'your-api-key-here';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here'; // Use environment variable
const DB_PATH = path.resolve(__dirname, 'fittrack.db');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SQLite database setup
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        calories INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        food_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// API Endpoints

// GET /entries - Get all stored entries
app.get('/entries', (req, res) => {
  db.all('SELECT * FROM entries ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve entries' });
    }
    res.json(rows);
  });
});

// POST /entries - Save a new entry
app.post('/entries', (req, res) => {
  const { calories, timestamp, food_name } = req.body;
  
  if (!calories || !timestamp) {
    return res.status(400).json({ error: 'Calories and timestamp are required' });
  }

  const sql = `
    INSERT INTO entries (calories, timestamp, food_name)
    VALUES (?, ?, ?)
  `;
  
  db.run(sql, [calories, timestamp, food_name || null], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to save entry' });
    }
    
    // Return the newly created entry
    db.get('SELECT * FROM entries WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to retrieve new entry' });
      }
      res.status(201).json(row);
    });
  });
});

// POST /nutrition/search - Search Nutritionix API
app.post('/nutrition/search', async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    // First try to get detailed nutrition info using the natural/nutrients endpoint
    try {
      const nutrientsResponse = await axios({
        method: 'post',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_API_KEY,
        },
        data: {
          query: query
        }
      });
      
      // If successful, return the formatted response
      if (nutrientsResponse.data && nutrientsResponse.data.foods && nutrientsResponse.data.foods.length > 0) {
        return res.json({ foods: nutrientsResponse.data.foods });
      }
    } catch (nutrientsError) {
      // If the nutrients endpoint fails, we'll continue to the search endpoint
      console.log("Natural language endpoint failed, trying search endpoint");
    }
    
    // Fall back to the search endpoint if natural/nutrients fails
    const searchResponse = await axios({
      method: 'get',
      url: 'https://trackapi.nutritionix.com/v2/search/instant',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_API_KEY,
      },
      params: {
        query: query,
        detailed: true
      }
    });
    
    // Check if we have any common foods in the response
    if (searchResponse.data && searchResponse.data.common && searchResponse.data.common.length > 0) {
      // For search results, we need to get detailed nutrition for the first item
      const commonFood = searchResponse.data.common[0];
      
      try {
        const detailResponse = await axios({
          method: 'post',
          url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': NUTRITIONIX_APP_ID,
            'x-app-key': NUTRITIONIX_API_KEY,
          },
          data: {
            query: commonFood.food_name
          }
        });
        
        if (detailResponse.data && detailResponse.data.foods && detailResponse.data.foods.length > 0) {
          return res.json({ foods: detailResponse.data.foods });
        }
      } catch (detailError) {
        // If we can't get detailed info, construct a basic response
        console.log("Could not get detailed nutrition, using basic info");
        
        const basicFoods = [
          {
            food_name: commonFood.food_name,
            serving_qty: 1,
            serving_unit: 'serving',
            nf_calories: commonFood.nf_calories || 100, // Default or estimated values
            nf_protein: 0,
            nf_total_carbohydrate: 0,
            nf_total_fat: 0,
            photo: {
              thumb: commonFood.photo?.thumb || 'https://via.placeholder.com/100'
            }
          }
        ];
        
        return res.json({ foods: basicFoods });
      }
    }
    
    // If no foods were found in either endpoint
    return res.json({ 
      foods: [], 
      message: "No matching foods found" 
    });
    
  } catch (error) {
    console.error('Nutritionix API error:', error.message);
    
    // Return sample food data on error so the app can still work
    const sampleFood = {
      food_name: query,
      serving_qty: 1,
      serving_unit: 'serving',
      nf_calories: 100, // Default calories
      nf_protein: 0,
      nf_total_carbohydrate: 0,
      nf_total_fat: 0,
      photo: {
        thumb: 'https://via.placeholder.com/100'
      }
    };
    
    // Return a 200 response with sample data instead of error
    res.json({ 
      foods: [sampleFood],
      message: "Using estimated data" 
    });
  }
});

// POST /chatbot - OpenAI chatbot integration
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  try {
    // Call OpenAI API with the user's message
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a fitness and nutrition expert. Provide concise, helpful advice about fitness, workouts, nutrition, and health. Focus on evidence-based information and practical tips to help users improve their fitness journey.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }
    });
    
    // Extract the assistant's reply from the OpenAI response
    const aiResponse = response.data.choices[0].message.content;
    
    // Return the AI's response
    res.json({
      response: aiResponse
    });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    
    // Return a fallback response in case of error
    res.json({
      response: "I'm having trouble connecting to my knowledge base right now. Here's some general advice: For fitness improvement, aim for a mix of cardio, strength training, and flexibility exercises. For nutrition, focus on whole foods, adequate protein, and staying hydrated. Remember that consistency is key for both fitness and nutrition progress."
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
}); 