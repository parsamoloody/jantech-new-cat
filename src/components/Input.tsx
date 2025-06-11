"use client";

interface Props {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}: Props) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-slate-400 rounded-md p-1.5 xs:px-4 xs:py-2 w-full ${className}`}
    />
  )
}
