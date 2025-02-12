import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
} & InputProps;

const Input: React.FC<Props> = ({
  label,
  type = "text",
  placeholder,
  error,
  required = false,
  className,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold pb-2">
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-2 border rounded-lg outline-none text-black ${
          error ? "border-red-700" : "border-inherit"
        } ${className}`}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="text-red-700 italic text-sm">{error}</span>}
    </div>
  );
};

export default Input;
