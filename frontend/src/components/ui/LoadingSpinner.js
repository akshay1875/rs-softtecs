const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    default: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="large" className="mb-4" />
      <p className="text-gray-500">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
