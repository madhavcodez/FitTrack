# FitTrack Backend Service

Node.js/Express backend service for the FitTrack fitness application.

## Features

- RESTful API endpoints
- MongoDB database integration
- JWT authentication
- Form analysis ML pipeline
- Workout plan generation
- Progress tracking analytics

## Prerequisites

- Node.js 18+
- MongoDB 6+
- Python 3.9+ (for ML pipeline)
- Docker (optional)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fittrack
JWT_SECRET=your-secret-key
ML_SERVICE_URL=http://localhost:5000
```

3. Install Python dependencies (for ML pipeline):
```bash
cd ml_service
python -m pip install -r requirements.txt
```

## Development

Start the development server:
```bash
npm run dev
```

Start MongoDB (if running locally):
```bash
mongod --dbpath /path/to/data
```

Start ML service:
```bash
cd ml_service
python app.py
```

## API Documentation

### Authentication

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

### Workouts

```
GET /api/workouts
POST /api/workouts
GET /api/workouts/:id
PUT /api/workouts/:id
DELETE /api/workouts/:id
```

### Plans

```
GET /api/plans
POST /api/plans
GET /api/plans/:id
PUT /api/plans/:id
DELETE /api/plans/:id
```

### Form Analysis

```
POST /api/analysis/form
GET /api/analysis/:id
```

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Helper functions
├── ml_service/         # Python ML service
└── tests/             # Test suites
```

## Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run all tests with coverage
npm run test:coverage
```

## Docker Support

Build the container:
```bash
docker build -t fittrack-backend .
```

Run with Docker Compose:
```bash
docker-compose up
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start in production:
```bash
npm start
```

## Monitoring

The service includes:
- Health check endpoint (`/health`)
- Prometheus metrics (`/metrics`)
- Winston logging
- Error tracking with Sentry

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT - see LICENSE for details. 