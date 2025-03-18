export interface RecoverFormData {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export type RecoveryStep = "email" | "otp" | "changePassword";
