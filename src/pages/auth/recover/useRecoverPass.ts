import { RecoveryStep, RecoverFormData } from "@/types/pages/recover";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRecoverPass = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<RecoveryStep>(
    () => (localStorage.getItem("recoveryStep") as RecoveryStep) || "email"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecoverFormData>({
    mode: "onChange",
  });

  const updateStep = (step: RecoveryStep) => {
    setCurrentStep(step);
    localStorage.setItem("recoveryStep", step);
  };

  const handleEmailSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      // Validar email y enviar código
      updateStep("otp");
      console.log(data.email);
      toast.success("Código enviado a tu correo");
    } catch (error) {
      toast.error("Error al enviar el código");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (data: { otp: string }) => {
    try {
      if (data.otp.length !== 6) {
        toast.error("Digite un codigo valido");
        return;
      }
      setIsLoading(true);
      // Validar OTP
      console.log(data.otp);
      updateStep("changePassword");
      toast.success("Código verificado correctamente");
    } catch (error) {
      toast.error("Código inválido");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      console.log(data);
      // Actualizar contraseña
      localStorage.removeItem("recoveryStep");
      navigate("/login");
      toast.success("Contraseña actualizada correctamente");
    } catch (error) {
      toast.error("Error al actualizar la contraseña");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      // Falta implementar reenvío de código
      console.log("reenviando código");
      toast.success("Código reenviado");
    } catch (error) {
      toast.error("Error al reenviar el código");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    currentStep,
    handleEmailSubmit,
    handleOTPSubmit,
    handlePasswordSubmit,
    resendOTP,
    otpValue,
    navigate,
    setOtpValue,
    watch,
    showPassword,
    setShowPassword,
  };
};
