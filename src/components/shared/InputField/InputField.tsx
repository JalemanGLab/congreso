import React from 'react';
import { InputFieldProps } from '@/types/inputs';

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    register,
    name,
    icon: Icon,
    type = 'text',
    error = false,
}) => {
    return (
        <div className="w-full">
            <label className="text-sm text-gray-500 font-normal">{label}</label>
            <div className="relative">
                {Icon && (
                    <Icon className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`w-full h-[40px] border  pl-10 pr-2 text-gray-600 outline-none rounded-[5px] ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
        </div>
    );
};

export default InputField;