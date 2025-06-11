"use client";

interface Props {
  id?: string;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function Textarea({
  id,
  rows = 10,
  placeholder,
  value,
  onChange,
  className,
}: Props) {
  return (
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-slate-300 rounded-md px-4 py-2 w-full ${className}`}
    />
  )
}
