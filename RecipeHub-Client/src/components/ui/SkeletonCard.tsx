export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-gray-200 to-gray-100 h-56 w-full animate-pulse rounded-t-2xl" />
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-4/5 animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/5 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-14 animate-pulse" />
        </div>
        <div className="pt-2">
          <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
