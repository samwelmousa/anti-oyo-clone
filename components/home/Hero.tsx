'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Search, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-6 border border-red-100 shadow-sm">
                        <Sparkles className="w-4 h-4" />
                        Next-Gen Marketplace Engine
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]"
                >
                    Upgrade Your Stay. <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-indigo-600">
                        Maximize Your Revenue.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    The complete platform for travelers looking for premium stays and property owners
                    aiming to build a professional hotel business.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/search"
                        className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-gray-900 px-8 py-4 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2 font-bold">
                            <Search className="w-5 h-5" />
                            Explore Stays
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>

                    <Link
                        href="/dashboard/owner"
                        className="w-full sm:w-auto rounded-2xl border-2 border-gray-100 bg-white px-8 py-4 font-bold text-gray-900 transition-all hover:border-gray-900 hover:bg-gray-50 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Building2 className="w-5 h-5 text-gray-400" />
                        List Your Property
                    </Link>
                </motion.div>

                {/* Trust Metrics */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-100 pt-10"
                >
                    {[
                        { label: 'Platform Fee', value: '15%' },
                        { label: 'Active Users', value: '10k+' },
                        { label: 'Partner Hotels', value: '500+' },
                        { label: 'Total Payouts', value: '$2M+' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
