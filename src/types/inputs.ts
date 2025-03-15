import { UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface InputFieldProps {
   label: string;
   placeholder: string;
   register: UseFormRegister<any>; // Cambia 'any' por el tipo de tu formulario
   name: string;
   icon: IconType; // Tipo para el icono
   type?: string; // Tipo de input, por defecto será "text"
   error?: boolean; // Cambiado a booleano para indicar si hay un error
}

export interface SelectDataProps {
   label: string;
   options: { value: string; label: string }[];
   register: UseFormRegister<any>;
   name: string;
   icon?: React.ElementType;
   error?: boolean;
}