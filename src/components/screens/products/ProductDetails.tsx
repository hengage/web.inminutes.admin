"use client";
import { useGetProductByIdQuery } from "@/api/product";
import Tag from "@/components/general/Tag";
import { tag } from "@/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(Array.isArray(id) ? id[0] : (id ?? ""));

  if (isLoading) return <div>Loading...</div>;
  const product = data;
  if (!product) return <div>No product found</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between mb-6 ">
        <div className="flex items-center">
          <div className="p-3">
            <ArrowLeft
              onClick={() => router.back()}
              className=" cursor-pointer hover:bg-purple-100 text-purple-800 "
              size={35}
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Product Details</h1>
        </div>
        <div className="flex space-x-2">
          <button className="border-2 border-[#3F2BC3] text-[#3F2BC3] rounded-md px-3 py-1.5 hover:bg-[#F7F7F7]">
            Update
          </button>
          <button
            className="p-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            title="Delete Product"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ID and Status */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">ID: #{product._id}</h2>
          <Tag tag={product.status as tag} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F7F7F7] rounded-lg p-4 text-center">
            <div className="text-xs uppercase text-gray-500 mb-2 font-medium">PRODUCT SOLD</div>
            <div className="text-2xl font-bold text-gray-900">200</div>
          </div>
          <div className="bg-[#F7F7F7] rounded-lg p-4 text-center">
            <div className="text-xs uppercase text-gray-500 mb-2 font-medium">PRODUCT RETURNED</div>
            <div className="text-2xl font-bold text-gray-900">10</div>
          </div>
          <div className="bg-[#F7F7F7] rounded-lg p-4 text-center">
            <div className="text-xs uppercase text-gray-500 mb-2 font-medium">PRODUCT IN STOCK</div>
            <div className="text-2xl font-bold text-gray-900">10</div>
          </div>
        </div>
      </div>

      {/* Main Product Details Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-8">
          {/* Left side - Product Image and Basic Info */}
          <div className="flex-shrink-0" style={{ width: "500px" }}>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={268}
                height={200}
                className="w-full h-[200px] object-cover rounded-md"
              />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Right side - Product Details Table */}
          <div className="flex-1">
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className=" px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Product Details</h3>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Price</span>
                  <span className="text-gray-900 font-semibold">
                    ₦{Number(product.cost).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Vendor</span>
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    {product.vendor ? product.vendor.businessName : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Date Added</span>
                  <span className="text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">In Stock</span>
                  <span className="text-gray-900 font-semibold">{product.quantity}</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Category</span>
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    {typeof product.category === "string"
                      ? product.category
                      : product.category.name}
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Sub-category</span>
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    Food
                  </span>
                </div>

                <div className="flex justify-between items-start px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Tags</span>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                    {product.tags?.length > 0 ? (
                      product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">0</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-start px-4 py-3 hover:bg-gray-50">
                  <span className="text-gray-600 font-medium">Add-Ons</span>
                  <div className="text-right max-w-[200px]">
                    {product.addOns?.length > 0 ? (
                      <div className="space-y-2">
                        {product.addOns.map((addon, index) => (
                          <div key={index} className="text-sm">
                            <p className="font-medium text-gray-900">{addon?.item}</p>
                            <p className="text-gray-600">₦{Number(addon?.cost).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">0</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
