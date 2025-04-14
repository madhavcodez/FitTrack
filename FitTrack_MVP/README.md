# FitTrack MVP

A comprehensive fitness tracking application with AI-powered recommendations and pose analysis.

## Project Structure

The FitTrack MVP project is organized into the following structure:

```
FitTrack_MVP/
├── 1_code/                      # All source code
│   ├── mobile_app/              # React Native mobile application
│   ├── backend_api/             # Node.js + Express REST API
│   ├── ai_services/             # Python FastAPI AI microservices
│   └── README1.txt              # Code setup instructions
├── 2_data_collection/           # Data collection and generation
│   ├── scripts/                 # Data generation scripts
│   └── README2.txt              # Data collection instructions
├── 3_basic_function_testing/    # Test suites
│   ├── mobile_tests/            # Mobile app tests
│   ├── api_tests/               # Backend API tests
│   ├── ai_tests/                # AI services tests
│   └── README3.txt              # Testing instructions
└── documentation/               # Project documentation
```

## Getting Started

For detailed setup instructions, please refer to the README files in each section:

1. [Code Setup Instructions](./1_code/README1.txt)
2. [Data Collection Instructions](./2_data_collection/README2.txt)
3. [Testing Instructions](./3_basic_function_testing/README3.txt)

## Features

- User authentication and profile management
- Workout tracking and logging
- AI-powered form analysis using computer vision
- Personalized workout and nutrition recommendations
- Progress visualization and reporting

## Tech Stack

- **Mobile App**: React Native, TypeScript, Redux Toolkit, React Navigation
- **Backend API**: Node.js, Express, TypeScript, Firebase (Auth & Firestore)
- **AI Services**: Python, FastAPI, TensorFlow, OpenCV

## Development Process

1. Clone the repository
2. Set up each component following the instructions in README1.txt
3. Generate test data using the scripts in the data_collection directory
4. Run the tests to ensure everything is working correctly
5. Start developing new features

## License

This project is licensed under the MIT License - see the LICENSE file for details. 