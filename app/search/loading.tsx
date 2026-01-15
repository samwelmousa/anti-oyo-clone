export default function Loading() {
    return (
        <div className="container mx-auto flex gap-6 p-6 min-h-screen">
            {/* Left Column Skeleton */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm h-[300px] flex flex-col">
                            <div className="h-48 bg-gray-200 rounded-t-lg animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column Map Skeleton */}
            <div className="hidden lg:block lg:w-[40%]">
                <div className="sticky top-32 h-[calc(100vh-9rem)] w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>
        </div>
    );
}
