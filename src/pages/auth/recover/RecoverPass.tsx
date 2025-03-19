import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { IoLockClosed } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import load from "@assets/img/loading.svg";
import InputField from "@/components/shared/InputField/InputField";
import { useRecoverPass } from "./useRecoverPass";

const PageRecoverPass = () => {
  const {
    register,
    errors,
    handleSubmit,
    isLoading,
    currentStep,
    resendOTP,
    otpValue,
    setOtpValue,
    showPassword,
    setShowPassword,
    handleEmailSubmit,
    handleOTPSubmit,
    handlePasswordSubmit,
    navigate,
  } = useRecoverPass();
  return (
    <div className="w-full flex flex-col justify-center gap-2">
      {currentStep === "email" && (
        <>
          <h1 className="text-xl font-bold">Recuperar contraseña</h1>
          <span className="text-[14px] text-gray-500">
            Ingresa tu correo electrónico para recuperar tu cuenta
          </span>
          <form
            className="flex flex-col gap-2 py-2"
            onSubmit={handleSubmit(handleEmailSubmit)}
          >
            <InputField
              name="email"
              inputType="email"
              placeholder="correo@ejemplo.com"
              childrenIcon={<HiOutlineMail className="text-2xl" />}
              register={register}
              errors={errors}
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-gradient-to-b cursor-pointer from-black to-neutral-800 text-white rounded-[5px] mt-2 flex items-center justify-center text-sm sm:text-base"
            >
              {isLoading ? (
                <img
                  src={load}
                  alt="loading"
                  className="w-5 h-5 sm:w-5 sm:h-5"
                />
              ) : (
                "Enviar instrucciones"
              )}
            </button>
          </form>
          <div className="flex items-center gap-3">
            <div className="w-full h-0.5 bg-gray-200 rounded-full"></div>
            <span className="text-gray-500 text-sm">O</span>
            <div className="w-full h-0.5 bg-gray-200 rounded-full"></div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full text-sm text-gray-500 border border-gray-200 rounded-[5px] px-4 py-2 flex items-center justify-center hover:text-gray-700 mt-2"
          >
            Volver a Iniciar Sesión
          </button>
        </>
      )}
      {currentStep === "otp" && (
        <>
          <h1 className="text-xl font-bold">Verificar Codigo</h1>
          <span className="text-[15px] text-gray-500">
            Ingresa el codigo que llega al correo electronico asociado a tu
            cuenta.
          </span>
          <form
            onSubmit={handleSubmit(() => handleOTPSubmit({ otp: otpValue }))}
          >
            <div className="w-full px-2 flex items-center">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-black text-white rounded mt-4"
            >
              {isLoading ? (
                <img
                  src={load}
                  alt="loading"
                  className="w-5 h-5 sm:w-5 sm:h-5"
                />
              ) : (
                "Verificar Código"
              )}
            </button>
            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                onClick={resendOTP}
                disabled={isLoading}
                className="text-sm text-gray-500 hover:text-gray-700 mt-2"
              >
                No recibiste el código? Intenta de nuevo
              </button>
            </div>
          </form>
        </>
      )}
      {currentStep === "changePassword" && (
        <>
          <h1 className="text-xl font-bold">Actualizar contraseña</h1>
          <span className="text-[15px] text-gray-500">
            Ingresa tu nueva contraseña
          </span>
          <form className="flex flex-col gap-4 py-2" onSubmit={handleSubmit(handlePasswordSubmit)}>
            <InputField
              name="newPassword"
              inputType={showPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              childrenIcon={<IoLockClosed className="text-2xl" />}
              register={register}
              errors={errors}
              rules={{
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              }}
            />

            <InputField
              name="confirmPassword"
              inputType={showPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              childrenIcon={<IoLockClosed className="text-2xl" />}
              register={register}
              errors={errors}
              rules={{
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              }}
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span>Mostrar contraseñas</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-black text-white rounded mt-4"
            >
              {isLoading ? (
                <img
                  src={load}
                  alt="loading"
                  className="w-5 h-5 sm:w-5 sm:h-5"
                />
              ) : (
                "Confirmar contraseña"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PageRecoverPass;
