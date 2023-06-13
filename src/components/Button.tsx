import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

// Define the props for the Button component
type ButtonProps = {
  small?: boolean, // Indicates if the button should be small
  gray?: boolean, // Indicates if the button should be gray
  className?: string, // Additional CSS class for the button
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// Button component
function Button({ small = false, gray = false, className = "", ...props }: ButtonProps) {
  // Determine the size classes based on the "small" prop
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  
  // Determine the color classes based on the "gray" prop
  const colorClasses = gray ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300" 
                            : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400";
  
  return (
    <button
      className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-white ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    >
    </button>
  );
}

export default Button;