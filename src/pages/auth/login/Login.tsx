import logo from "@assets/img/solventum-v1.png";
import bg_login from "@assets/img/bg-login.jpg";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { useLogin } from "./useLogin";
import load from "@assets/img/loading.svg";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCalendarDays } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosTime } from "react-icons/io";

const PageLogin = () => {
  const {
    register,
    onSubmit,
    errors,
    isLoading,
    showPassword,
    navigate,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <div className="flex w-full h-screen">
      {/* Panel izquierdo - Formulario */}
      <div className="flex w-full items-center justify-center lg:w-[40%]">
        <div className="flex w-full max-w-[450px] flex-col items-center p-6 sm:p-6 md:p-8">
          <img
            src={logo}
            alt="logo"
            className="w-[200px] py-2 sm:w-[240px] md:w-[280px] md:py-4"
          />
          <p className="mb-4 text-xs text-gray-600 sm:text-sm sm:mb-6">
            Accede a tu cuenta para empezar la experiencia
          </p>

          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-3 sm:gap-4"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <MdOutlineMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    {...register("email", {
                      required: "El email es requerido",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Formato de email inválido",
                      },
                    })}
                    type="email"
                    placeholder="Email"
                    className="w-full h-10 sm:h-11 pl-10 pr-4 border border-gray-200 rounded-[5px] focus:outline-none focus:border-gray-400 text-sm sm:text-base"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="relative">
                  <IoLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-10 sm:h-11 pl-10 pr-12 border border-gray-200 rounded-[5px] focus:outline-none focus:border-gray-400 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    ) : (
                      <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/recover")}
              className="text-xs sm:text-sm text-right cursor-pointer text-gray-500 hover:text-gray-700"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-gradient-to-b cursor-pointer from-black to-neutral-800 text-white rounded-[5px] mt-2 flex items-center justify-center text-sm sm:text-base"
            >
              {isLoading ? (
                <img
                  src={load}
                  alt="loading"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            <p className="text-xs sm:text-sm text-center text-gray-500">
              ¿Aún no tienes una cuenta?{" "}
              <button
                onClick={() => navigate("/register")}
                className="cursor-pointer font-medium"
              >
                Regístrate <span className="text-black font-bold">aquí</span>
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Panel derecho - Imagen de fondo */}
      <div className="hidden lg:block md:w-[60%] relative">
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${bg_login})`,
          }}
        >
          <div className="relative h-full flex flex-col gap-2 justify-center p-8 lg:p-16 text-white">
            <div className="w-[180px] lg:w-[196px] flex items-center gap-4 lg:gap-5 px-3 lg:px-4 py-2 lg:py-3 rounded-[5px] bg-gradient-to-b from-black/56 to-[#1a1a1a]/56">
              <FaRegCalendarDays className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base pt-1">
                27 Abril de 2025
              </span>
            </div>
            <h1 className="text-4xl lg:text-[50px] xl:text-[60px] font-bold">
              Congreso Magno 3.0
            </h1>
            <p className="text-base lg:text-lg mb-6 lg:mb-8 max-w-[610px] px-6 lg:px-10 py-4 lg:py-6 rounded-[5px] bg-gradient-to-b from-black/56 to-[#1a1a1a]/56">
              El evento odontológico más importante del año. Únete a expertos
              internacionales y descubre las últimas innovaciones en tecnología
              dental.
            </p>
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-sm lg:text-base">
                  Centro de converciones, Bogotá - Colombia.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoIosTime className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-sm lg:text-base">9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-[180px] lg:w-[220px] px-3 lg:px-4 py-2 cursor-pointer rounded-[5px] bg-gradient-to-b from-black to-[#1e1e1e] text-sm lg:text-base"
            >
              Ver sitio web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
