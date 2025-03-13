import logo from "@assets/img/solventum-v2.svg";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { useLogin } from "./useLogin";
import load from "@assets/img/loading.svg";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

const PageLogin = () => {
  const { register, onSubmit, errors, isLoading, showPassword, togglePasswordVisibility } =
    useLogin();

  return (
    <div className="w-full h-screen flex">
      <div className="hidden md:flex w-[65%] items-center bg-gradient-to-b from-[#000000] to-[#1E1E1E]">
        <div className=" w-full flex flex-col gap-5 items-center">
          <img src={logo} alt="logo" className="w-[520px] h-[150px]" />

          <div className="w-[520px] flex flex-col gap-5 items-start">
            <h1 className="text-start text-white text-[22px] font-light">
              Inicia sesión para gestionar o ver tu cupón.
            </h1>
            <button className="bg-[#252525] hover:bg-[#353535] transition-all duration-300 text-[14px] cursor-pointer text-white px-8 py-2.5 rounded-[5px]">
              Ver Sitio Web
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[35%] px-10 md:px-0 flex items-center justify-center">
        <div className="w-full md:w-[60%] flex items-center justify-center">
          <div className="w-full max-w-[400px] flex flex-col">
            <div className="flex flex-col gap-1">
              <h1 className="text-[24px] font-semibold">
                ¡Bienvenido de nuevo!
              </h1>
              <p className="text-gray-600">Accede a tu cuenta</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-2 py-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="relative flex items-center">
                    <MdOutlineMailOutline
                      className={cn(
                        "w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      )}
                    />
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
                      className={cn(
                        "w-full h-[40px] px-11 border rounded-[5px] transition-colors"
                      )}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-xs pl-2 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                  <div className="relative flex items-center">
                    <IoLockClosed
                      className={cn(
                        "w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      )}
                    />
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
                      placeholder="Contraseña"
                      className={cn(
                        "w-full h-[40px] px-11 border rounded-[5px] transition-colors"
                      )}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash className="w-6 h-6 cursor-pointer text-gray-400 " />
                      ) : (
                        <IoEyeOutline className="w-6 h-6 cursor-pointer text-gray-400 " />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-xs pl-2 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    /* Implementar recuperación de contraseña */
                  }}
                  className="text-[13px] cursor-pointer text-gray-500"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="flex flex-col gap-3 py-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1e1e1e] cursor-pointer text-white py-2.5 rounded-[5px] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <img src={load} alt="loading" className="w-5 h-5" />
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>
                <p className="text-[13px] text-center text-gray-500">
                  ¿Aún no tienes una cuenta?{" "}
                  <a href="#" className="text-[#05dd4d]">
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
