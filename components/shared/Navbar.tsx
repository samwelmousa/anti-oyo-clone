'use client';

import Link from 'next/link';
import { Search, Menu, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1">
                        <div className="text-3xl font-extrabold tracking-tighter text-red-600">OYO</div>
                        <span className="hidden text-xs font-semibold text-gray-400 sm:block">clone</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-6 md:flex">
                        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-500">
                            <Search className="h-4 w-4" />
                            <span>Search location...</span>
                        </div>

                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 font-bold text-gray-700 hover:text-red-600"
                                >
                                    {session.user.name?.split(' ')[0]} {/* First Name */}
                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        {session.user.name?.[0]}
                                    </div>
                                </button>

                                {/* Dropdown */}
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg py-1">
                                        <div className="px-4 py-2 border-b text-xs text-gray-500 truncate">
                                            {session.user.email}
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                        >
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/auth/signin" className="text-sm font-bold text-gray-600 hover:text-gray-900">
                                    Login / Signup
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden">
                        <Menu className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
