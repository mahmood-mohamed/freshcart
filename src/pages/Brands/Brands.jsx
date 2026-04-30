import { useEffect, useState } from "react";
import { Skeleton, Input } from "@heroui/react";
import useFetch from "../../hooks/useFetch";

function BrandCard({ brand }) {
    return (
        <div className="group relative bg-white rounded-2xl shadow-sm border border-emerald-100
            hover:shadow-[0_6px_24px_rgba(16,185,129,0.22)] hover:-translate-y-1
            transition-all duration-300 flex flex-col overflow-hidden cursor-default">

            {/* ── Arch header ── */}
            <div className="relative h-20 bg-gradient-to-br from-emerald-400 to-green-600 overflow-visible">
                {/* Curved bottom edge */}
                <div className="absolute -bottom-4 left-0 w-full h-8 bg-white rounded-t-[50%] border-t border-emerald-100" />

                {/* Leaf accent */}
                <svg className="absolute top-1.5 right-1.5 w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:rotate-180 transition-all ease-out duration-5000"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8z"/>
                </svg>

                {/* Logo — large, prominent, floats over arch */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2
                    w-20 h-20 rounded-2xl bg-white shadow-lg border-2 border-emerald-100
                    flex items-center justify-center p-2.5
                    group-hover:border-emerald-400
                    group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)]
                    group-hover:scale-110 transition-all duration-300 z-10">
                    <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* ── Name ── */}
            <div className="pt-12 pb-4 px-2 text-center">
                <h3 className="text-gray-700 text-sm font-semibold truncate w-full
                    group-hover:text-emerald-600 transition-colors duration-200">
                    {brand.name}
                </h3>
            </div>
        </div>
    );
}

function BrandCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden bg-white border border-emerald-100 shadow-sm flex flex-col">
            <div className="h-20 bg-gradient-to-br from-emerald-100 to-green-100 animate-pulse relative">
                <div className="absolute -bottom-4 left-0 w-full h-8 bg-white rounded-t-[50%]" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-emerald-100 animate-pulse" />
            </div>
            <div className="pt-12 pb-4 px-2 flex justify-center">
                <div className="h-3 w-16 rounded-full bg-gray-200 animate-pulse" />
            </div>
        </div>
    );
}

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [search, setSearch]  = useState("");

    // Fetch both pages in parallel
    const p1 = useFetch("brands", 1);
    const p2 = useFetch("brands", 2);

    // Merge page 1 + page 2 as soon as either arrives
    useEffect(() => {
        const all = [...(p1.data ?? []), ...(p2.data ?? [])];
        if (all.length === 0) return;
        setBrands(
            all.filter((b, i, self) => i === self.findIndex((x) => x._id === b._id))
        );
    }, [p1.data, p2.data]);

    const isLoading = p1.isLoading;
    const error     = p1.error;
    const filtered  = brands.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    /* ── Loading skeleton (initial) ── */
    if (isLoading) {
        return (
            <div className="overflow-x-hidden">
                {/* Hero skeleton */}
                <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 py-16">
                    <div className="container text-center space-y-4">
                        <Skeleton className="h-5 w-28 rounded-full mx-auto bg-white/20" />
                        <Skeleton className="h-10 w-72 rounded-xl mx-auto bg-white/20" />
                        <Skeleton className="h-4 w-96 rounded-lg mx-auto bg-white/20" />
                    </div>
                </div>
                {/* Grid skeleton */}
                <div className="container py-12">
                    <Skeleton className="h-11 w-full max-w-md rounded-xl mt-15 mb-10 mx-auto" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {[...Array(18)].map((_, i) => <BrandCardSkeleton key={i} />)}
                    </div>
                </div>
            </div>
        );
    }

    /* ── Error ── */
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-3xl">
                    <i className="fas fa-exclamation-triangle" />
                </div>
                <h2 className="text-xl font-bold text-gray-700">Failed to load brands</h2>
                <p className="text-gray-400 text-sm">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden">

            {/* ── Hero Banner ── */}
            <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white overflow-hidden">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container relative z-10 py-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white/90 rounded-full text-sm font-semibold tracking-widest uppercase mb-5 animate-fade-in-down">
                        <i className="fas fa-tag text-green-200" />
                        Discover Brands
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight animate-fade-in-down delay-200">
                        Shop by <span className="text-green-200">Top Brands</span>
                    </h1>
                    <p className="text-white/75 text-lg mt-4 max-w-xl mx-auto leading-relaxed animate-fade-in delay-500">
                        Explore our curated collection of trusted brands — from everyday essentials to premium
                        labels, all in one place.
                    </p>

                    {/* Stats strip */}
                    <div className="flex flex-wrap justify-center gap-8 mt-10 animate-fade-in delay-500">
                        {[
                            { icon: 'fas fa-certificate', text: `${brands.length}+ Brands` },
                            { icon: 'fas fa-shield-alt', text: 'Verified Sellers' },
                            { icon: 'fas fa-truck',       text: 'Fast Delivery' },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                <i className={`${s.icon} text-green-200`} />
                                {s.text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="bg-gray-50 min-h-screen py-6" aria-label="All Brands">
                <div className="container">

                    {/* Search bar */}
                    <div className="max-w-md mx-auto mb-10">
                        <Input
                            id="brand-search"
                            placeholder="Search brands…"
                            value={search}
                            onValueChange={setSearch}
                            startContent={<i className="fas fa-search text-gray-400 text-sm animate-pop-in" />}
                            classNames={{
                                base: "shadow-sm",
                                inputWrapper: "bg-white border border-gray-200 rounded-xl h-11 hover:border-green-400 focus-within:border-green-500 transition-colors",
                                input: "text-gray-700 placeholder:text-gray-400",
                            }}
                            isClearable
                        />
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-gray-400 mb-6 text-center">
                        Showing{" "}
                        <span className="font-semibold text-gray-600">{filtered.length}</span>{" "}
                        brands
                        {search && <> matching <span className="font-semibold text-green-600">"{search}"</span></>}
                    </p>

                    {/* No results */}
                    {filtered.length === 0 && (
                        <div className="flex flex-col items-center gap-4 py-20 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-400 flex items-center justify-center text-3xl">
                                <i className="fas fa-search" />
                            </div>
                            <p className="text-gray-500 font-medium">No brands found for "<span className="text-green-600">{search}</span>"</p>
                            <button onClick={() => setSearch("")} className="text-sm text-green-600 hover:underline">Clear search</button>
                        </div>
                    )}

                    {/* Brand Grid — stable, no conditional children */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {filtered.map((brand) => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
