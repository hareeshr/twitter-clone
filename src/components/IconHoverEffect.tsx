import type { ReactNode } from "react";

type IconHoverEffectProps = {
  children: ReactNode;
  red?: boolean;
}

function IconHoverEffect({ children, red = false }: IconHoverEffectProps) {
  // Determine the color classes based on the "red" prop
  const colorClasses = red
    ? "outline-red-400 hover:bg-red-200 group-hover:bg-red-200 focus-visible:bg-red-200"
    : "outline-gray-400 hover:bg-gray-200 group-hover:bg-gray-200 focus-visible:bg-gray-200";

  return (
    <div className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}>
      {children}
    </div>
  );
}

export default IconHoverEffect;
