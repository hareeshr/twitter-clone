import { ArrowPathIcon } from '@heroicons/react/24/solid';

type LoadingSpinnerProps = {
  big?: boolean;
}

function LoadingSpinner({ big = false }: LoadingSpinnerProps) {
  // Determine the size classes based on the "big" prop
  const sizeClasses = big ? "w-16 h-16" : "w-10 h-10";

  return (
    <div className="flex justify-center p-2">
      <ArrowPathIcon className={`animate-spin ${sizeClasses}`} />
    </div>
  );
}

export default LoadingSpinner;
