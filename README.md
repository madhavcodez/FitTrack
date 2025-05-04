# FitTrack

<div align="center">
  <img src="docs/screenshots/25e52ef9-f896-4435-8bba-259dc6132b0c.png" alt="FitTrack Logo" width="150"/>
  <h3>AI-Powered Fitness Companion</h3>
</div>

<div align="center">

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)

*Your personal AI fitness coach that helps you achieve your fitness goals with real-time form analysis and personalized workout plans.*

[Getting Started](#getting-started) • [Features](#features) • [Architecture](#architecture) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

## 📱 App Showcase

<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Dashboard</strong></td>
      <td align="center"><strong>Log Workout</strong></td>
      <td align="center"><strong>Track Nutrition</strong></td>
      <td align="center"><strong>Form Analysis</strong></td>
    </tr>
    <tr>
      <td><img src="docs/screenshots/homepage.png" alt="Dashboard" width="200"/></td>
      <td><img src="docs/screenshots/logworkout.png" alt="Log Workout" width="200"/></td>
      <td><img src="docs/screenshots/addfood.png" alt="Track Nutrition" width="200"/></td>
      <td><img src="docs/screenshots/Screenshot 2025-04-14 145033.png" alt="Form Analysis" width="200"/></td>
    </tr>
  </table>
</div>

## 🚀 Features

### Mobile App
- 📱 Cross-platform support (iOS & Android)
- 🎥 Real-time exercise form analysis
- 🎯 Personalized workout plans
- 📊 Progress tracking & analytics
- 🤖 AI-powered recommendations
- 🌙 Dark/Light theme support

### Backend Service
- 🔐 JWT authentication
- 📝 RESTful API
- 📦 MongoDB integration
- 📈 Performance monitoring
- 🔄 Automated backups

### ML Service
- 🏃‍♂️ Real-time pose estimation
- ✅ Exercise form validation
- 📈 Progress prediction
- 🎯 Plan optimization
- 🧠 Continuous learning

## 🏗 Architecture

```mermaid
graph LR
    A[Mobile App] --> B[Backend Service]
    B --> C[ML Service]
    B --> D[(MongoDB)]
    C --> E[Model Registry]
    C --> F[Training Pipeline]
```

## 💻 Tech Stack

### Mobile App (React Native + Expo)
- Navigation: React Navigation
- State Management: Redux Toolkit
- UI Components: React Native Paper
- Camera: Expo Camera
- Animations: React Native Reanimated

### Backend Service (Node.js)
- Framework: Express.js
- Database: MongoDB
- Authentication: JWT
- API Documentation: Swagger
- Testing: Jest

### ML Service (Python)
- Deep Learning: TensorFlow
- Computer Vision: OpenCV
- API: FastAPI
- Model Serving: TensorFlow Serving
- Monitoring: MLflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB 6+
- Android Studio / Xcode

### Quick Start

1. Clone the repository:
```powershell
git clone https://github.com/yourusername/FitTrack.git
Set-Location FitTrack
```

2. Install dependencies:
```powershell
# Mobile App
Set-Location FitTrack_MVP/1_code/fittrack-expo
npm install

# Backend
Set-Location ../backend
npm install

# ML Service
Set-Location ../ml_service
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

3. Start the services:
```powershell
# Start MongoDB
mongod

# Start Backend (new terminal)
Set-Location backend
npm run dev

# Start ML Service (new terminal)
Set-Location ml_service
python app.py

# Start Mobile App (new terminal)
Set-Location fittrack-expo
npm start
```

## 📚 Documentation

- [Mobile App Documentation](FitTrack_MVP/1_code/fittrack-expo/README.md)
- [Backend Documentation](FitTrack_MVP/1_code/backend/README.md)
- [ML Service Documentation](FitTrack_MVP/1_code/ml_service/README.md)
- [API Documentation](FitTrack_MVP/1_code/backend/docs/api.md)
- [Development Guide](FitTrack_MVP/docs/development.md)
- [Deployment Guide](FitTrack_MVP/docs/deployment.md)

## 🧪 Testing

```powershell
# Run Mobile App Tests
Set-Location fittrack-expo
npm test

# Run Backend Tests
Set-Location backend
npm test

# Run ML Service Tests
Set-Location ml_service
pytest
```

## 🔒 Security

- All API endpoints are secured with JWT authentication
- ML models are protected against adversarial attacks
- Regular security audits and dependency updates
- Data encryption at rest and in transit

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TensorFlow](https://www.tensorflow.org/) for ML models
- [React Native](https://reactnative.dev/) for mobile development
- [Expo](https://expo.dev/) for app development tools
- [MongoDB](https://www.mongodb.com/) for database
- All contributors who have helped shape FitTrack

---

<div align="center">

Made with ❤️ by the FitTrack Team

[Website](https://fittrack.com) • [Documentation](https://docs.fittrack.com) • [Community](https://community.fittrack.com)

</div>
