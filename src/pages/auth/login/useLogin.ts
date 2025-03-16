import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import { LoginFormValues, LoginState } from "@/types/pages/auth";
export const useLogin = () => {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    showPassword: false,
  });
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuthError = (error: AuthError) => {
    const errorMessages: Record<string, string> = {
      "Invalid login credentials": "Usuario o contraseña incorrectos",
      "Email not confirmed": "Por favor confirma tu email",
      "Invalid email": "El email no es válido",
      "Rate limit exceeded": "Demasiados intentos, por favor espera un momento",
    };

    toast.error(errorMessages[error.message] || "Error al iniciar sesión");
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      if (!formData.email || !formData.password) {
        toast.error("Por favor completa todos los campos");
        return;
      }

      const { data, error } = (await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })) as AuthResponse;

      if (error) {
        handleAuthError(error);
        return;
      }

      if (!data?.session) {
        toast.error("Error al iniciar sesión");
        return;
      }

      setAuth(data.session);
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  });

  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      clearAuth();
      navigate("/login");
      toast.success("Sesión cerrada");
    } catch (error) {
      const authError = error as AuthError;
      handleAuthError(authError);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const togglePasswordVisibility = () => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  return {
    register,
    onSubmit,
    errors,
    isLoading: state.isLoading,
    showPassword: state.showPassword,
    togglePasswordVisibility,
    logout,
    navigate,
  };
};
