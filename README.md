# MediPredict+ 🏥✨

> An Enterprise Healthcare AI Platform for Predictive Analytics and Clinical Management

MediPredict+ is a comprehensive, AI-powered healthcare analytics platform built for the modern medical enterprise. It seamlessly bridges the gap between patient diagnostics, health metrics forecasting, and professional clinical management using state-of-the-art Machine Learning models.

## 🚀 Features

- **Enterprise AI Engine**: Robust FastAPI microservice running 6 discrete Machine Learning Models (Diabetes, Heart Disease, CKD, Stroke, Liver, Hypertension).
- **Explainable AI (XAI)**: Understand the *why* behind every prediction with integrated SHAP (SHapley Additive exPlanations) values providing top feature importance and natural language summaries.
- **Dynamic Health Scoring**: Real-time multi-variate health score calculators generating detailed risk categories based on live vitals.
- **Role-Based Portals**:
  - **Patient Dashboard**: Track health metrics, view prediction history, and simulate future health outcomes.
  - **Doctor Portal**: Manage patient rosters, prescribe actions, and review AI-generated reports.
  - **Admin Dashboard**: System-wide analytics, user management, and broadcast notifications.
- **Real-Time Communication**: WebSockets (`Socket.IO`) integration for instantaneous event broadcasting.
- **Secure Architecture**: JWT-based authentication, bcrypt hashing, and strict role validation.

## 📸 Screenshots

Here is a glimpse of the MediPredict+ platform in action:

<div align="center">
  <img src="screenshots/Screenshot%202026-07-07%20104619.png" width="45%" alt="Platform Interface 1" />
  <img src="screenshots/Screenshot%202026-07-07%20104718.png" width="45%" alt="Platform Interface 2" />
</div>
<br>
<div align="center">
  <img src="screenshots/Screenshot%202026-07-07%20104735.png" width="45%" alt="Platform Interface 3" />
  <img src="screenshots/Screenshot%202026-07-07%20104753.png" width="45%" alt="Platform Interface 4" />
</div>
<br>
<div align="center">
  <img src="screenshots/Screenshot%202026-07-07%20104822.png" width="45%" alt="Platform Interface 5" />
  <img src="screenshots/Screenshot%202026-07-07%20104839.png" width="45%" alt="Platform Interface 6" />
</div>
<br>
<div align="center">
  <img src="screenshots/Screenshot%202026-07-07%20104856.png" width="45%" alt="Platform Interface 7" />
  <img src="screenshots/Screenshot%202026-07-07%20104918.png" width="45%" alt="Platform Interface 8" />
</div>
<br>
<div align="center">
  <img src="screenshots/Screenshot%202026-07-07%20104933.png" width="45%" alt="Platform Interface 9" />
</div>

## 🛠 Technology Stack

**Frontend**
- React 18 (Vite)
- TailwindCSS & Lucide Icons
- Axios & React Router
- Recharts (Data Visualization)

**Backend**
- Node.js & Express.js
- MongoDB Atlas (Mongoose)
- Socket.IO
- JWT & bcrypt

**AI Engine**
- Python 3.12 & FastAPI
- Scikit-Learn & XGBoost
- SHAP (Explainable AI)
- Pandas & NumPy

## 📐 Architecture

The platform operates on a strictly decoupled **Microservices Architecture**:
1. **Client (React)**: Handles UI/UX and client-state. Communicates exclusively with the Node API.
2. **Orchestrator (Node.js)**: Manages database transactions, authentication, and acts as a secure reverse-proxy to the AI Engine.
3. **AI Engine (Python/FastAPI)**: A stateless, high-performance inference engine that loads `.pkl` models via Joblib and responds to REST requests from the Node server.

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js v18+
- Python 3.12+
- MongoDB instance (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/ArshSyed17/MediPredict-Plus.git
cd MediPredict-Plus
```

### 2. Setup the Express Backend
```bash
cd server
npm install
cp .env.example .env # Update with your MongoDB URI
npm run dev
```

### 3. Setup the FastAPI AI Engine
```bash
cd ai-service
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python training/scripts/train_all.py # Train initial models
uvicorn app.main:app --reload
```

### 4. Setup the React Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## 🌍 Deployment

- **Frontend**: Optimized for [Vercel](https://vercel.com).
- **Backend & AI Service**: Ready for [Render](https://render.com) using the provided `render.yaml`.
- **Database**: MongoDB Atlas.

## 🔮 Future Improvements
- [ ] Direct Doctor-Patient chat interface via Socket.IO.
- [ ] Integration with wearable APIs (Apple Health, Fitbit).
- [ ] Expanded AI Engine supporting image classification (X-Ray/MRI).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.