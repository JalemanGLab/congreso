import { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";

export interface PersonalFormData {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
    phone: string;
    city: string;
    authorization: boolean;
}

export interface ProfessionalFormData {
    distributor: string;
    main_procedure: string;
    brand: string;
    cases_per_week: string;
}

export interface PaymentFormData {
    bank: string;
    document_type: string;
    card_name?: string;
    card_number?: string;
    expiry_date?: string;
    cvc?: string;
}

export interface CardFormData {
    card_name: string;
    card_number: string;
    expiry_date: string;
    cvc: string;
}

export interface InputFieldProps {
    name: string;
    inputType?: string;
    register: UseFormRegister<any>;
    childrenIcon?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: FieldErrors<any>;
    rules?: RegisterOptions;
    placeholder?: string;
    label?: string;
}

export interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
    phone: string;
    city: string;
    authorization: boolean;
    distributor: string;
    main_procedure: string;
    brand: string;
    cases_per_week: string;
    bank: string;
    document_type: string;
}

export interface SelectDataProps {
   label: string;
   options: { value: string; label: string }[];
   register: UseFormRegister<FormData>;
   name: keyof FormData;
   icon?: React.ElementType;
   hasError?: boolean;
   errorMessage?: string;
   required?: boolean;
}