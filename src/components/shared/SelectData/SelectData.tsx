import React from 'react';
import { SelectDataProps } from '@/types/inputs';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectData: React.FC<SelectDataProps> = ({
    label,
    options,
    register,
    name,
    icon: Icon,
    error = false,
}) => {
    return (
      <div className="w-full">
         <label className="text-sm text-gray-500 font-normal">{label}</label>
         <div className="relative">
            {Icon && (
               <Icon className="text-xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            )}
            <Select {...register(name)}>
               <SelectTrigger className={`h-[40px] shadow-none rounded-[5px] ${Icon ? 'pl-10' : 'pl-2'} ${error ? 'border-red-500' : 'border-gray-300'}`}>
                     <SelectValue placeholder="Seleccione una opción" />
               </SelectTrigger>
               <SelectContent>
                     <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options.map((option) => (
                           <SelectItem key={option.value} value={option.value}>
                                 {option.label}
                           </SelectItem>
                        ))}
                     </SelectGroup>
               </SelectContent>
            </Select>
         </div>
      </div>
    );
};

export default SelectData;