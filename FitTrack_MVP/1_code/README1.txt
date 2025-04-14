# FitTrack MVP - Code Installation and Execution Instructions

## Prerequisites

Before running the FitTrack application, ensure you have the following installed:

1. Node.js (v16+) and npm (v8+)
2. Python (v3.8+) and pip
3. Android Studio (for Android development/emulation)
4. XCode (for iOS development/emulation, macOS only)
5. Firebase account with a project set up

## Project Structure

The FitTrack MVP consists of three main components:

1. **Mobile App** - React Native application
2. **Backend API** - Node.js with Express and TypeScript
3. **AI Services** - Python with FastAPI

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/FitTrack.git
cd FitTrack
```

### Step 2: Set Up Environment Variables

1. Create a `.env` file in the `backend_api` directory with the following variables:

```
PORT=5000
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

2. Create a `.env` file in the `ai_services` directory:

```
PORT=5001
```

### Step 3: Install Dependencies and Run the Backend API

```bash
cd FitTrack_MVP/1_code/backend_api
npm install
npm run dev:api
```

The backend API should now be running on http://localhost:5000.

### Step 4: Install Dependencies and Run the AI Services

```bash
cd FitTrack_MVP/1_code/ai_services
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 5001
```

The AI services should now be running on http://localhost:5001.

### Step 5: Install Dependencies and Run the Mobile App

```bash
cd FitTrack_MVP/1_code/mobile_app
npm install
```

#### Running on Android

1. Start an Android emulator from Android Studio or connect a physical device
2. Run the following command:

```bash
npm run android
```

#### Running on iOS (macOS only)

1. Install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

2. Run the following command:

```bash
npm run ios
```

## Troubleshooting

### Metro Bundler Issues

If the Metro bundler crashes or has issues:

```bash
npx react-native start --reset-cache
```

### Android Device Not Found

If you get an error about no Android devices found:

1. Ensure you have an emulator running or a physical device connected
2. Run `adb devices` to verify the device is recognized
3. If using a physical device, ensure USB debugging is enabled

### iOS Build Failures

For iOS build issues:

1. Delete the `ios/build` directory
2. Run `cd ios && pod install && cd ..`
3. Try running `npm run ios` again

### Backend Connection Issues

If the mobile app cannot connect to the backend:

1. Ensure the backend is running
2. Check if the IP address in the mobile app configuration is correct (should point to your local machine)
3. For Android emulators, use `10.0.2.2` instead of `localhost`

## Running Tests

### Mobile App Tests

```bash
cd FitTrack_MVP/1_code/mobile_app
npm test
```

### Backend API Tests

```bash
cd FitTrack_MVP/1_code/backend_api
npm test
```

### AI Services Tests

```bash
cd FitTrack_MVP/1_code/ai_services
pytest
```

## Creating an Android Virtual Device (AVD)

1. Open Android Studio
2. Click on "More Actions" or the three-dot menu and select "Virtual Device Manager"
3. Click "Create device"
4. Select a phone model (e.g., Pixel 4) and click "Next"
5. Select a system image (e.g., Android 11) and click "Next"
   - If you need to download the system image, click "Download" and follow the instructions
6. Give your AVD a name and click "Finish"
7. To start the emulator, click the play button in the AVD Manager

## Deployment

For a production deployment:

1. Backend API: Deploy to a cloud provider like AWS, Google Cloud, or Heroku
2. AI Services: Deploy to a cloud provider with Python support
3. Mobile App: Build release versions for Android and iOS

## Additional Resources

- React Native Documentation: https://reactnative.dev/docs/getting-started
- Express.js Documentation: https://expressjs.com/
- FastAPI Documentation: https://fastapi.tiangolo.com/
- Firebase Documentation: https://firebase.google.com/docs 