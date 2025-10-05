export default function ErrorMessage({ message }) {
  return (
    <div className="glass-effect-strong rounded-2xl p-6 border-2 border-red-300/50 animate-scale-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">
            Oops! Something went wrong
          </h3>
          <p className="text-white/90 text-sm">
            {message ||
              "Unable to fetch currency data. Please check your connection and try again."}
          </p>
        </div>
      </div>
    </div>
  );
}
