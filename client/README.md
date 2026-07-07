# MediPredict+ Frontend

A modern, AI-powered healthcare prediction platform built with React, Vite, and Tailwind CSS.

## 🏗️ Architecture Overview

The frontend follows a scalable, component-based architecture with clear separation of concerns:

### Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Modal, etc.)
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── admin/          # Admin portal components
│   ├── routes/         # Route wrappers (ProtectedRoute, PublicRoute)
│   └── ErrorBoundary.jsx
├── pages/              # Page-level components
│   ├── Landing/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Prediction/
│   ├── Simulator/
│   ├── Reports/
│   ├── Profile/
│   ├── Settings/
│   ├── Doctor/
│   ├── Admin/
│   ├── NotFound/
│   └── Unauthorized/
├── hooks/              # Custom React hooks
│   ├── useApi.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   ├── useToggle.js
│   ├── useForm.js
│   ├── useMediaQuery.js
│   └── useToast.js
├── services/           # API service layer
│   ├── api.js          # Centralized axios instance
│   ├── authService.js
│   ├── adminService.js
│   ├── doctorService.js
│   ├── predictionService.js
│   ├── simulatorService.js
│   ├── reportService.js
│   ├── profileService.js
│   └── settingsService.js
├── mock/               # Mock API handlers
│   └── api/
│       ├── auth.js
│       ├── prediction.js
│       ├── simulator.js
│       ├── reports.js
│       ├── profile.js
│       ├── settings.js
│       ├── doctor.js
│       └── admin.js
├── constants/          # Application constants
│   ├── routes.js       # Route definitions
│   ├── apiEndpoints.js # API endpoint constants
│   └── theme.js        # Theme configuration
├── utils/              # Utility functions
│   ├── helpers.js      # Common helper functions
│   └── validators.js   # Validation functions
├── context/            # React contexts
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── config/             # Configuration files
│   └── env.js          # Environment configuration
├── layouts/            # Layout components
│   └── AuthLayout.jsx
├── data/               # Mock data
└── assets/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MediPredict+
VITE_APP_VERSION=1.0.0
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 🎯 Key Features

### Architecture Improvements

1. **Centralized API Service**
   - Single axios instance with interceptors
   - Automatic JWT token handling
   - Error handling and token refresh logic

2. **Reusable UI Components**
   - Button, Card, Modal, Loader components
   - Skeleton loading states
   - Empty state components
   - Toast notification system

3. **Custom Hooks**
   - `useApi` - API call management
   - `useLocalStorage` - Local storage synchronization
   - `useDebounce` - Debounced values
   - `useToggle` - Toggle state management
   - `useForm` - Form state management
   - `useMediaQuery` - Responsive design hooks
   - `useToast` - Toast notifications

4. **Route Protection**
   - ProtectedRoute wrapper for authenticated routes
   - PublicRoute wrapper for public routes
   - Role-based access control
   - Lazy loading with Suspense

5. **Error Handling**
   - Error Boundary component
   - Global error handling
   - User-friendly error pages (404, 401)

6. **Mock API Layer**
   - Complete mock API for development
   - Easy switch to real API via `USE_MOCK_API` flag
   - Preserves client-side calculation logic for offline use

7. **Constants Management**
   - Centralized route constants
   - API endpoint constants
   - Theme configuration

8. **Performance Optimization**
   - React.memo for component optimization
   - Lazy loading for routes
   - Code splitting

## 🔧 Configuration

### Switching to Real API

To switch from mock API to real backend API, set `USE_MOCK_API = false` in each service file:

```javascript
const USE_MOCK_API = false; // Set to false when backend is ready
```

### Theme Configuration

Theme constants are defined in `src/constants/theme.js` and can be customized as needed.

## 📦 Dependencies

- **React 19** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Recharts** - Charts
- **React Hot Toast** - Toast notifications
- **React Hook Form** - Form management

## 🎨 UI Components

### Base Components

- **Button** - Reusable button with variants (primary, secondary, outline, danger, ghost)
- **Card** - Card component with variants (default, glass, gradient)
- **Modal** - Modal dialog with animations
- **Loader** - Loading spinner component
- **Skeleton** - Skeleton loading placeholder
- **EmptyState** - Empty state component

### Route Components

- **ProtectedRoute** - Route wrapper for authenticated pages
- **PublicRoute** - Route wrapper for public pages
- **LoadingScreen** - Loading screen component

## 🔐 Authentication

Authentication is managed through:
- `AuthContext` - Global authentication state
- `authService` - Authentication API calls
- JWT token storage in localStorage
- Automatic token refresh on 401 errors

## 📱 Responsive Design

The application is fully responsive and uses:
- Tailwind CSS breakpoints
- Custom media query hooks
- Mobile-first approach

## 🧪 Testing

The application is prepared for testing with:
- Component structure suitable for unit testing
- Service layer separation for API testing
- Mock API for integration testing

## 🚀 Deployment

### Build Optimization

- Code splitting via lazy loading
- Tree shaking
- Asset optimization
- Environment-specific builds

### Environment Files

- `.env` - Default environment
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.example` - Example configuration

## 📝 Backend Integration

All services are prepared for backend integration:

1. Set `USE_MOCK_API = false` in service files
2. Update `VITE_API_URL` in `.env`
3. Ensure backend endpoints match `API_ENDPOINTS` constants
4. Remove or update mock data as needed

## 🤝 Contributing

1. Follow the existing code structure
2. Use the established naming conventions
3. Add reusable components to `components/ui/`
4. Create custom hooks in `hooks/`
5. Update constants when adding new routes or endpoints

## 📄 License

This project is part of MediPredict+ healthcare platform. in your project.
