export default function LoadingSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 shadow-glass animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="h-4 w-20 bg-gray-300 rounded mb-3"></div>
          <div className="h-8 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex-1 flex flex-col justify-between sm:items-end">
          <div className="h-4 w-32 bg-gray-300 rounded mb-3 sm:ml-auto"></div>
          <div className="h-12 w-full sm:w-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
