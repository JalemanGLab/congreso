import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore, UserRole } from "@/store/useAuthStore";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
  userId: string | null;
}

interface UseProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const useProtectedRoute = ({
  allowedRoles,
  redirectTo = "/login",
}: UseProtectedRouteProps = {}) => {
  const navigate = useNavigate();
  const { session, user, accessToken, isAuthenticated } = useAuthStore();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userRole: null,
    userId: user?.id || null,
  });

  useEffect(() => {
    // Verificación inmediata de autenticación
    if (!isAuthenticated || !session || !user || !accessToken) {
      navigate(redirectTo);
      return;
    }

    const userRole = user.user_metadata?.role as UserRole;

    if (
      !userRole ||
      (allowedRoles?.length && !allowedRoles.includes(userRole))
    ) {
      toast.error("No tienes permisos para acceder a esta página");
      navigate("/login");
      return;
    }

    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      userRole,
      userId: user.id,
    });
  }, [
    session,
    user,
    accessToken,
    isAuthenticated,
    redirectTo,
    allowedRoles,
    navigate,
  ]);

  return authState;
};
