"use client";
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateSubCategoryModal from "./CreateSubcategoryModal";
import { useGetSubCategoriesQuery } from "@/api/product";

interface SubCategory {
  _id: string;
  name: string;
  productCount: number;
}

const SubCategory = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const name = searchParams.get("name") ?? "";
  const { data, isLoading } = useGetSubCategoriesQuery(id);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center">
        <div className="p-3">
          <ArrowLeft
            onClick={() => router.back()}
            className="cursor-pointer hover:bg-purple-100 text-purple-800"
            size={35}
          />
        </div>
        <h1 className="text-2xl font-medium text-[#160A62]">{name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_470px] pb-6 gap-8">
        {/* Sub-Categories Section */}
        <div className="bg-white p-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
            <div className="font-medium text-[#160A62]">
              Sub-Category{" "}
              <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                {isLoading ? "..." : `(${data?.totalSubCategories ?? 0})`}
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 focus:outline-none"
            >
              <Plus size={16} />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
            </div>
          ) : (
            <div className="space-y-1">
              {data?.subCategories?.map((category: SubCategory) => (
                <div
                  key={category._id}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                    selectedCategory === category._id
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <span>{category.name}</span>
                  <span
                    className={`px-2 py-0.5 text-sm rounded-full ${
                      selectedCategory === category._id
                        ? "bg-white bg-opacity-25 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.productCount} Products
                  </span>
                </div>
              ))}
              {!data?.subCategories?.length && !isLoading && (
                <div className="text-center py-4 text-gray-500">No subcategories found</div>
              )}
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="bg-white p-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
            <div className="font-medium text-[#160A62]">
              Products{" "}
              <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                (0)
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center h-48 text-gray-500">
            {!selectedCategory ? (
              <div>Select a subcategory to view products</div>
            ) : (
              <div>Products for this subcategory will be available soon</div>
            )}
          </div>
        </div>
      </div>
      <CreateSubCategoryModal open={isModalOpen} onOpenChange={setIsModalOpen} categoryId={id} />
    </div>
  );
};
export default SubCategory;
