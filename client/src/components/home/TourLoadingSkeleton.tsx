export default function TourLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="h-64 bg-slate-200" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="h-8 bg-slate-200 rounded w-24" />
              <div className="h-10 bg-slate-200 rounded w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
