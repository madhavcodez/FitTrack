# FitTrack ML Service

Machine Learning service for FitTrack's form analysis and workout plan generation.

## Features

- Real-time pose estimation
- Exercise form analysis
- Personalized workout plan generation
- Progress prediction models
- Model versioning and A/B testing

## Prerequisites

- Python 3.9+
- CUDA 11.8+ (for GPU acceleration)
- Docker (optional)

## Installation

1. Create and activate virtual environment:
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Install dependencies:
```powershell
python -m pip install -r requirements.txt
```

3. Download model weights:
```powershell
# Download pose estimation model
python scripts/download_models.py --model pose

# Download form analysis model
python scripts/download_models.py --model form
```

4. Configure environment:
```powershell
Copy-Item .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MODEL_PATH=./models
CUDA_VISIBLE_DEVICES=0
LOG_LEVEL=INFO
```

## Development

Start the development server:
```powershell
python app.py
```

Run model training:
```powershell
# Train form analysis model
python train.py --config configs/form_analysis.yaml

# Train plan generation model
python train.py --config configs/plan_generation.yaml
```

## Models

### Pose Estimation

- Architecture: MoveNet Thunder
- Input: 256x256 RGB image
- Output: 17 keypoints with confidence scores
- Performance: 30+ FPS on GPU

### Form Analysis

- Architecture: Custom transformer
- Input: Sequence of keypoints
- Output: Form quality score (0-100)
- Metrics: MAE < 5.0, F1 > 0.85

### Plan Generation

- Architecture: GPT-2 fine-tuned
- Input: User profile and goals
- Output: Structured workout plan
- Evaluation: Human-in-the-loop validation

## API Documentation

### Pose Estimation

```
POST /api/v1/pose
Content-Type: multipart/form-data

Parameters:
- video: Video file (MP4/MOV)
- frame_rate: Sampling rate (optional)
```

### Form Analysis

```
POST /api/v1/analyze
Content-Type: application/json

{
    "keypoints": [...],
    "exercise": "squat"
}
```

### Plan Generation

```
POST /api/v1/generate-plan
Content-Type: application/json

{
    "user_profile": {...},
    "goals": [...],
    "constraints": {...}
}
```

## Project Structure

```
ml_service/
├── app.py              # FastAPI application
├── models/            # Model implementations
├── processors/        # Data processing
├── trainers/         # Training scripts
├── configs/          # Model configurations
├── scripts/          # Utility scripts
└── tests/            # Test suites
```

## Testing

```powershell
# Run unit tests
pytest

# Run specific test suite
pytest tests/test_pose_estimation.py

# Generate coverage report
pytest --cov=. tests/
```

## Docker Support

Build the container:
```powershell
docker build -t fittrack-ml .
```

Run with GPU support:
```powershell
docker run --gpus all -p 5000:5000 fittrack-ml
```

## Monitoring

The service includes:
- Model performance metrics
- GPU utilization tracking
- Inference latency monitoring
- Data drift detection

## Model Deployment

1. Export models:
```powershell
python export.py --model form --format onnx
```

2. Deploy to production:
```powershell
python deploy.py --env production
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT - see LICENSE for details. 