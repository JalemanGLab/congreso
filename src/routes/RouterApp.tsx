
import { Routes, Route } from 'react-router-dom';
import PrivateLayout from '@/layout/PrivateLayout';
//  auth
import PageLogin from '@/pages/auth/login/Login';
import PageRecover from '@/pages/auth/recover/RecoverPass';

//  register
import RegisterForm from '@/pages/register/RegisterForm';

//  crear  validacion para que no se pueda acceder a la pagina si no esta logeado


import PageProfile from '@/pages/profile/Profile';
import PageScanQr from '@/pages/scanqr/ScanQr';
import PageDashboard from '@/pages/dashboard/Dashboard';






function RouterApp() {
  return (
    <Routes>
      {/* de Rutas públicas */}
      <Route path="/" element={<PageLogin />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/recover" element={<PageRecover />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Rutas privadas (con PrivateLayout) */}
      <Route element={<PrivateLayout />}>
        <Route path="/profile" element={<PageProfile />} />
        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path="/scanqr" element={<PageScanQr />} />
      </Route>

    </Routes>
  );
}

export default RouterApp;