import { getHotels } from "@/lib/data/hotel-queries";
import SearchClient from "@/components/search/search-client";

export const dynamic = "force-dynamic"; // Ensure fresh data if needed, or rely on cache revalidation

export default async function SearchPage() {
    const hotels = await getHotels();

    return <SearchClient initialHotels={hotels} />;
}
