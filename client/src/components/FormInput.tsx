import React from "react";
// import { UseFormRegisterReturn } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  register,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
