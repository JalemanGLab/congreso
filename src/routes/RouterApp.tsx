
import { Routes, Route } from 'react-router-dom';
import PrivateLayout from '@/layout/PrivateLayout';
//  auth
import PageLogin from '@/pages/auth/login/Login';
import PageRecover from '@/pages/auth/recover/RecoverPass';

//  crear  validacion para que no se pueda acceder a la pagina si no esta logeado


import PageProfile from '@/pages/profile/Profile';
import PageScanQr from '@/pages/scanqr/ScanQr';






function RouterApp() {
  return (
    <Routes>
      {/* de Rutas públicas */}
      <Route path="/" element={<PageLogin />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/recover" element={<PageRecover />} />

      {/* Rutas privadas (con PrivateLayout) */}
      <Route element={<PrivateLayout />}>
        <Route path="/profile" element={<PageProfile />} />
        <Route path="/scanqr" element={<PageScanQr />} />
      </Route>

    </Routes>
  );
}

export default RouterApp;