import React from 'react';
import useFetch from "../../hooks/useFetch";
import LoadingScreen from "../LoadingScreens/LoadingScreen";
import { Link } from 'react-router-dom';

import { Skeleton } from "@heroui/react";

export default function SubCategorySection() {
  const { data: categories, error, isLoading } = useFetch("categories");

  if (isLoading) {
    return (
      <section className="">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center gap-1 mb-10">
            <div>
              <Skeleton className="w-48 h-6 rounded-lg mb-2">
                <div className="w-full h-full bg-default-300"></div>
              </Skeleton>
              <Skeleton className="w-72 h-4 rounded-lg">
                <div className="w-full h-full bg-default-200"></div>
              </Skeleton>
            </div>
            <Skeleton className="w-20 h-5 rounded-lg">
              <div className="w-full h-full bg-default-200"></div>
            </Skeleton>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="rounded-2xl aspect-square w-full">
                <div className="w-full h-full bg-default-300"></div>
              </Skeleton>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) return null;

  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-1 mb-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Our Departments</h2>
            <p className="text-gray-500 mt-2">Explore everything from daily essentials to luxury finds</p>
          </div>
          <button className="text-green-600 font-semibold text-sm md:text-md flex items-center gap-2 hover:underline">
            <Link to="/categories">
              View All <span className="text-md">→</span>
            </Link>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories?.slice(0, 10).map((category) => (
            <div 
              key={category._id} 
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-square"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-white text-lg font-semibold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
