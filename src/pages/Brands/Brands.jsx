import { useEffect, useState } from "react";
import { Skeleton, Button, Input } from "@heroui/react";
import useFetch from "../../hooks/useFetch";

/* ─── Brand Card ─────────────────────────────────────────── */
function BrandCard({ brand }) {
    return (
        <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center">
            {/* Image area */}
            <div className="w-full aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 pointer-events-none">
                    <span className="text-white font-bold text-sm tracking-wide px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        {brand.name}
                    </span>
                </div>
            </div>
            {/* Name strip */}
            <div className="w-full py-3 px-3 text-center border-t border-gray-50">
                <h3 className="text-gray-700 text-sm font-semibold truncate group-hover:text-green-600 transition-colors duration-200">
                    {brand.name}
                </h3>
            </div>
        </div>
    );
}

/* ─── Brand Card Skeleton ────────────────────────────────── */
function BrandCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="py-3 px-3 flex justify-center border-t border-gray-50">
                <Skeleton className="h-4 w-20 rounded-md" />
            </div>
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Brands() {
    const [page, setPage] = useState(1);
    const [brands, setBrands] = useState([]);
    const [search, setSearch] = useState("");

    const { data: newBrands, error, isLoading, isFetching } = useFetch("brands", page);

    useEffect(() => {
        if (newBrands) {
            setBrands((prev) => {
                const merged = [...prev, ...newBrands];
                return merged.filter(
                    (b, i, self) => i === self.findIndex((x) => x._id === b._id)
                );
            });
        }
    }, [newBrands]);

    /* Filtered list */
    const filtered = brands.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    /* ── Loading skeleton (initial) ── */
    if (isLoading && page === 1) {
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
                    <Skeleton className="h-11 w-full max-w-sm rounded-xl mb-8 mx-auto" />
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
                            { icon: 'fas fa-truck', text: 'Fast Delivery' },
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
            <section className="bg-gray-50 min-h-screen py-12">
                <div className="container">

                    {/* Search bar */}
                    <div className="max-w-md mx-auto mb-10">
                        <Input
                            id="brand-search"
                            placeholder="Search brands…"
                            value={search}
                            onValueChange={setSearch}
                            startContent={<i className="fas fa-search text-gray-400 text-sm" />}
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
                        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> brands
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

                    {/* Brand Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                        {filtered.map((brand) => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))}
                        {/* Inline skeleton tiles while loading more */}
                        {isFetching && page > 1 &&
                            [...Array(6)].map((_, i) => <BrandCardSkeleton key={`sk-${i}`} />)
                        }
                    </div>

                    {/* Load More */}
                    {page === 1 && !search && (
                        <div className="flex justify-center mt-12">
                            <Button
                                onPress={() => setPage(2)}
                                isLoading={isFetching}
                                size="lg"
                                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-10 shadow-lg shadow-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                startContent={!isFetching && <i className="fas fa-chevron-down" />}
                            >
                                {isFetching ? "Loading…" : "Load More Brands"}
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
