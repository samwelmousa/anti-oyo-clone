import { create } from 'zustand'

interface AppState {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    hotels: any[]
    setHotels: (hotels: any[]) => void
}

export const useStore = create<AppState>((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    hotels: [],
    setHotels: (hotels) => set({ hotels }),
}))
