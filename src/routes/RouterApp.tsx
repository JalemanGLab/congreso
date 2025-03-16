import { Routes, Route, Navigate } from "react-router-dom";
import PrivateLayout from "@/layout/PrivateLayout";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { useAuthStore } from "@/store/useAuthStore";
import loading from "@/assets/img/loading.svg";
//  auth
import PageLogin from "@/pages/auth/login/Login";
import PageRecover from "@/pages/auth/recover/RecoverPass";

//  register
import RegisterForm from '@/pages/register/RegisterForm';

//  crear  validacion para que no se pueda acceder a la pagina si no esta logeado

import PageProfile from "@/pages/profile/Profile";
import PageScanQr from "@/pages/scanqr/ScanQr";
import PageDashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
// Componente para la ruta de login
const LoginRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <PageLogin />;
};

// Componente para proteger rutas por rol
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: ("user" | "admin" | "superadmin")[];
}) => {
  const { isAuthenticated, isLoading } = useProtectedRoute({
    allowedRoles,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={loading} alt="loading" className="w-10 h-10" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function RouterApp() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/recover" element={<PageRecover />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Rutas privadas con diferentes niveles de acceso */}
      <Route element={<PrivateLayout />}>
        {/* Rutas accesibles para todos los usuarios autenticados */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]}>
              <PageDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]}>
              <PageProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scanqr"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "superadmin"]}>
              <PageScanQr />
            </ProtectedRoute>
          }
        />

        {/* Rutas exclusivas para superadmin */}
        {/* <Route path="/admin/*" element={} /> */}
      </Route>
    </Routes>
  );
}

export default RouterApp;
