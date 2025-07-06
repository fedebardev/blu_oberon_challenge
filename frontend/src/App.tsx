import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import AppLayout from "./components/AppLayout";
import AppliedJobsPage from "./pages/AppliedJobs";
import RegisterPage from "./pages/RegisterPage";
import MyJobOffersPage from "./pages/MyJobOffers";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/applied" element={<AppliedJobsPage />} />
        <Route path="/offers" element={<MyJobOffersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
