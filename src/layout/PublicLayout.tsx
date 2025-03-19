import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
const PublicLayout = () => {
  const location = useLocation();

  const getHeaderContent = () => {
    switch (location.pathname) {
      case "/contacts":
        return {
          title: "Contacto",
          subtitle: "¿Necesitas ayuda?",
          description:
            "Estamos aquí para responder tus dudas y ayudarte en lo que necesites. No dudes en contactarnos.",
        };
      case "/faq":
        return {
          title: "Preguntas Frecuentes",
          subtitle: "Todo lo que necesitas saber",
          description:
            "Encuentra respuestas a las preguntas más comunes sobre el Congreso Magno 3.0.",
        };
      case "/register":
        return {
          title: "Congreso Magno 3.0",
          subtitle: "Únete a la élite de la odontología",
          description:
            "Completa tu registro para acceder a talleres exclusivos, ponencias internacionales y las últimas innovaciones en tecnología dental.",
        };
      case "/recover":
        return {
          title: "Congreso Magno 3.0",
          //   subtitle: "Recupera tu contraseña",
          description:
            "La seguridad de tu cuenta es importante para nosotros asi que recupera el acceso a tu cuenta de manera rápida y segura. Te enviaremos las instrucciones para restablecer tu contraseña en minutos.",
        };
      default:
        return {
          title: "Congreso Magno 3.0",
          subtitle: "Únete a la élite de la odontología",
          description:
            "Bienvenido al evento más importante de odontología del año.",
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Toaster position="top-right" />
      {/* Header con gradiente */}
      <div className="w-full bg-gradient-to-b from-[#000000] to-[#333333] px-4 md:px-10 py-16 md:py-20 h-[400px]">
        <div className="max-w-7xl px-6 sm:px-0 mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4">
            {headerContent.title}
          </h1>
          <h2 className="text-lg md:text-xl text-[#A8A8A8] font-medium mb-2 md:mb-3">
            {headerContent.subtitle}
          </h2>
          <p className="text-sm md:text-base text-[#A8A8A8] max-w-2xl">
            {headerContent.description}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-4 md:px-10 -mt-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-96 bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
