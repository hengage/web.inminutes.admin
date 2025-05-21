"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateSubCategoryModal from "./CreateSubcategoryModal";

const SubCategory = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const name = searchParams.get("name") ?? "";
  const [selectedCategory, setSelectedCategory] = useState(11);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  console.log(id);
  const subCategories = [
    { id: 14, name: "Genesis Foods", productCount: 8 },
    { id: 13, name: "Genesis Foods", productCount: 15 },
    { id: 12, name: "Genesis Foods", productCount: 22 },
    { id: 11, name: "Genesis Foods", productCount: 10 },
    { id: 10, name: "Genesis Foods", productCount: 6 },
    { id: 9, name: "Genesis Foods", productCount: 0 },
    { id: 8, name: "Genesis Foods", productCount: 40 },
    { id: 7, name: "Genesis Foods", productCount: 50 },
    { id: 6, name: "Genesis Foods", productCount: 8 },
    { id: 5, name: "Genesis Foods", productCount: 10 },
    { id: 4, name: "Genesis Foods", productCount: 14 },
    { id: 3, name: "Genesis Foods", productCount: 8 },
    { id: 2, name: "Genesis Foods", productCount: 10 },
    { id: 1, name: "Genesis Foods", productCount: 2 },
  ];

  const products = [
    { id: 10, name: "Product Name" },
    { id: 9, name: "Product Name" },
    { id: 8, name: "Product Name" },
    { id: 7, name: "Product Name" },
    { id: 6, name: "Product Name" },
    { id: 5, name: "Product Name" },
    { id: 4, name: "Product Name" },
    { id: 3, name: "Product Name" },
    { id: 2, name: "Product Name" },
    { id: 1, name: "Product Name" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center">
        <span onClick={() => router.back()} className=" bg-[#EEEBFF] rounded p-2 mr-3">
          <svg
            className="h-5 w-5 text-gray-500 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </span>
        <h1 className="text-2xl font-medium text-[#160A62]">{name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] pb-6 gap-8">
        {/* Sub-Categories Section */}
        <div className=" bg-white p-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
            <div className="font-medium text-[#160A62]">
              Sub-Category{" "}
              <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                ({subCategories.length})
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 focus:outline-none"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-1">
            {subCategories.map((category) => (
              <div
                key={category.id}
                className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                  selectedCategory === category.id ? "bg-indigo-600 text-white" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center">
                  <span
                    className={`w-8 text-sm ${selectedCategory === category.id ? "" : "text-gray-500"}`}
                  >
                    {String(category.id).padStart(2, "0")}
                  </span>
                  <span>{category.name}</span>
                </div>
                <span
                  className={`px-2 py-0.5 text-sm rounded-full ${
                    selectedCategory === category.id
                      ? "bg-white bg-opacity-25 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.productCount} Products
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=" bg-white p-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
            <div className="font-medium text-[#160A62]">
              Products{" "}
              <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                ({products.length})
              </span>
            </div>
          </div>

          <div className="space-y-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <span className="w-8 text-sm text-gray-500">
                  {String(product.id).padStart(2, "0")}
                </span>
                <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded mr-2">
                  🚗
                </div>
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateSubCategoryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};
export default SubCategory;
