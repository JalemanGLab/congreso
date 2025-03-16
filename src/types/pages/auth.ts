export interface LoginFormValues {
   email: string;
   password: string;
 }
 
export interface LoginState {
   isLoading: boolean;
   showPassword: boolean;
 }