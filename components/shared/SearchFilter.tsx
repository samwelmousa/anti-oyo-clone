import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function SearchFilter() {
    return (
        <div className="sticky top-14 z-40 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-center p-4">
                <div className="flex w-full max-w-4xl items-center rounded-full border bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
                    {/* Location */}
                    <div className="flex flex-1 items-center border-r px-4">
                        <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">Where</span>
                            <input
                                type="text"
                                placeholder="Search destinations"
                                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex flex-1 items-center border-r px-4">
                        <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">Check-in - Check-out</span>
                            <span className="text-sm text-gray-400">Add dates</span>
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="flex flex-1 items-center px-4">
                        <Users className="mr-2 h-5 w-5 text-gray-500" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">Guests</span>
                            <span className="text-sm text-gray-400">1 guest</span>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 font-bold text-white transition-colors hover:bg-red-700">
                        <Search className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
