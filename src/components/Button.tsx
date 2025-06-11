"use client";

interface Props {
  title?: string;
  icon?: React.ReactElement;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void | boolean | Promise<void>;
  className?: string;
}

export default function Button({
    title,
    icon,
    type = "button",
    disabled,
    onClick,
    className,
}: Props) {

  return (
    <button 
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`text-inherit rounded-md !flex items-center justify-center gap-3 cursor-pointer ${className}`}
    >
        {title && title}
        {icon && icon}
    </button>
  )
}
