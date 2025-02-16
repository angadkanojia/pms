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
      <label className="block pb-2 font-bold text-gray-700">
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      <input
        type={type}
        className={`w-full rounded-lg border px-4 py-2 text-black outline-none ${
          error ? "border-red-700" : "border-inherit"
        } ${className}`}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="text-sm italic text-red-700">{error}</span>}
    </div>
  );
};

export default Input;
