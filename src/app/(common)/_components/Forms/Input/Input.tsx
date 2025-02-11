import React from "react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  register: any;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  register,
  error,
  className,
}) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-1">{label}</label>
      <input {...register(name)} type={type} className={`${className}`} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
