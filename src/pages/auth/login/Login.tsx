import { useState } from "react";
import logo from "@assets/img/solventum-v2.svg";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { useLogin } from "./useLogin";

const PageLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

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

            <form onSubmit={handleLogin} className="flex flex-col gap-2 py-10">
              <div className="flex flex-col gap-6">
                <div className="relative flex items-center">
                  <MdOutlineMailOutline className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[40px] px-11 border text-gray-600 rounded-[5px]"
                  />
                </div>
                <div className="relative flex items-center">
                  <IoLockClosed className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[40px] px-11 border text-gray-600 rounded-[5px]"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
                  disabled={loading}
                  className="w-full bg-[#1e1e1e] text-white py-2.5 rounded-[5px] disabled:opacity-70"
                >
                  {loading ? "Iniciando sesión..." : "Iniciar sesión"}
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
