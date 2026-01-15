export interface Hotel {
    id: string;
    name: string;
    location: string;
    price: number;
    images: string[];
    rating: number;
    slug: string;
    isVerified: boolean;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export const MOCK_HOTELS: Hotel[] = [
    {
        id: "1",
        name: "OYO Premium Times Square",
        location: "New York, NY",
        price: 120,
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
        rating: 4.5,
        slug: "oyo-premium-times-square",
        isVerified: true,
        coordinates: {
            lat: 40.7580,
            lng: -73.9855
        }
    },
    {
        id: "2",
        name: "OYO Townhouse Brooklyn",
        location: "Brooklyn, NY",
        price: 85,
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
        rating: 4.2,
        slug: "oyo-townhouse-brooklyn",
        isVerified: false,
        coordinates: {
            lat: 40.6782,
            lng: -73.9442
        }
    },
    {
        id: "3",
        name: "OYO Cube Chelsea",
        location: "Manhattan, NY",
        price: 150,
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
        rating: 4.8,
        slug: "oyo-cube-chelsea",
        isVerified: true,
        coordinates: {
            lat: 40.7465,
            lng: -74.0014
        }
    },
    {
        id: "4",
        name: "OYO Flagship Downtown",
        location: "New York, NY",
        price: 95,
        images: ["https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
        rating: 3.9,
        slug: "oyo-flagship-downtown",
        isVerified: true,
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        }
    },
    {
        id: "5",
        name: "Sanctuary Hotel",
        location: "Queens, NY",
        price: 60,
        images: ["https://images.unsplash.com/photo-1590490360182-f33efe80a713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
        rating: 4.0,
        slug: "sanctuary-hotel-queens",
        isVerified: false,
        coordinates: {
            lat: 40.7282,
            lng: -73.7949
        }
    }
];
