import React from 'react';
import LoadingScreen from '../LoadingScreens/LoadingScreen';

export default function SubCategories({ subCategory, subCategoryError, subCategoryLoading }) {
  if (subCategoryLoading) {
    return (
      <div className="text-center">
        <p className="text-xl mt-3 font-semibold">Loading SubCategories...</p>
        <LoadingScreen />
      </div>
    );
  }

  if (subCategoryError) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        Error loading SubCategories: {subCategoryError.message}
      </div>
    );
  }

  if (!subCategory || subCategory.length === 0) {
    return (
      <div className="text-center text-lg font-semibold text-gray-500">
        No subcategories available
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {subCategory?.map((category) => (
        <div 
          key={category._id} 
          className="bg-gray-50 border border-gray-200 rounded-xl shadow-md py-5 px-6 min-w-[150px] md:min-w-[200px] text-center
                 hover:shadow-lg transition duration-300"
        >
          <h3 className="text-md text-slate-900 font-semibold selected-none">{category.name}</h3>
        </div>
      ))}
    </div>

  );
}
