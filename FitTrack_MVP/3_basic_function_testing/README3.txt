# FitTrack MVP - Testing Instructions

## Overview

This directory contains all the test suites for the FitTrack MVP, organized by component:

1. **mobile_tests** - Tests for the React Native mobile application
2. **api_tests** - Tests for the Node.js/Express backend API
3. **ai_tests** - Tests for the Python FastAPI AI services

## Prerequisites

- Node.js (v16+) and npm (v8+) for mobile and API tests
- Python 3.8+ for AI service tests
- Jest test runner (`npm install -g jest`)
- PyTest (`pip install pytest`)

## Running the Tests

### Mobile App Tests

The mobile app tests use Jest and React Native Testing Library to test components, screens, and Redux state management.

```bash
cd FitTrack_MVP/3_basic_function_testing/mobile_tests
npm install
npm test
```

For coverage report:

```bash
npm test -- --coverage
```

### Backend API Tests

The API tests use Jest/Mocha/Chai with Supertest to test the API endpoints.

```bash
cd FitTrack_MVP/3_basic_function_testing/api_tests
npm install
npm test
```

For coverage report:

```bash
npm test -- --coverage
```

### AI Services Tests

The AI service tests use PyTest to verify the functionality of the pose estimation and recommendation services.

```bash
cd FitTrack_MVP/3_basic_function_testing/ai_tests
pip install -r requirements.txt
pytest
```

For coverage report:

```bash
pytest --cov=app
```

## Test Structure

### Mobile Tests

```
mobile_tests/
├── components/       # Tests for UI components
├── screens/          # Tests for application screens
├── redux/            # Tests for Redux actions and reducers
├── navigation/       # Tests for navigation functionality
└── integration/      # End-to-end tests
```

### API Tests

```
api_tests/
├── auth/             # Tests for authentication endpoints
├── workouts/         # Tests for workout-related endpoints
├── ai/               # Tests for AI integration endpoints
└── integration/      # End-to-end API flows
```

### AI Tests

```
ai_tests/
├── pose_service/     # Tests for pose estimation service
├── recommend_service/# Tests for recommendation service
└── integration/      # Tests for service interactions
```

## Mock Data

Test data for all components is stored in the `test_cases` directory. This includes:

- Mock user profiles
- Sample workout logs
- Test images for pose estimation
- Expected API responses

## Continuous Integration

All tests are configured to run in the CI/CD pipeline. The GitHub Actions workflow is defined in `.github/workflows/tests.yml`.

The workflow runs:
1. Linting (ESLint for JS/TS, ruff for Python)
2. Unit and integration tests for all components
3. Coverage reports

## Debugging Failed Tests

### Mobile Tests

For Jest tests, you can debug by adding `console.log()` statements or using a debugger:

```javascript
// Add this to pause execution
debugger;
```

Then run:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### API Tests

For debugging API tests:

```bash
DEBUG=supertest* npm test
```

### AI Tests

For debugging AI tests:

```bash
pytest -vs  # Verbose mode with stdout capture disabled
```

## Adding New Tests

When adding new features, follow these guidelines for test creation:

1. Create unit tests for all new components and functions
2. Add integration tests for workflows that span multiple components
3. Aim for at least 80% code coverage
4. For critical business logic, strive for 100% coverage
5. Use meaningful test descriptions that document expected behavior

## Performance Testing

For load and performance testing:

1. API endpoints: Use Apache JMeter or Locust scripts in the `api_tests/performance` directory
2. Mobile app: Use the React Native performance testing utilities in `mobile_tests/performance`

## Security Testing

Security tests focus on:

1. Authentication and authorization
2. Input validation
3. Data encryption
4. Secure API communications

Run security tests with:

```bash
cd FitTrack_MVP/3_basic_function_testing
npm run test:security
``` 