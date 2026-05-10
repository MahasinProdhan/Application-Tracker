import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ApplicationsPage from "./pages/applications/ApplicationsPage";
import KanbanPage from "./pages/applications/KanbanPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
  <Routes>
    <Route
      element={
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      }
    >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Route>

    <Route
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/kanban" element={<KanbanPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
