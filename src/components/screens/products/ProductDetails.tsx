"use client";
import { useGetProductByIdQuery } from "@/api/product";
import Tag from "@/components/general/Tag";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { tag } from "@/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { Suspense } from "react";
const Details = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(Array.isArray(id) ? id[0] : (id ?? ""));
  if (isLoading) return <div>Loading...</div>;
  const product = data;
  console.log(product);
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
          <Button variant="ctm-outline" asChild className="border-2">
            <Link href={"/product/update"}>Update</Link>
          </Button>
          <button
            className="p-1.5 border border-red-500 text-red-500 rounded-md"
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

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-medium">ID: #{product._id}</h2>
          <Tag tag={product.status as tag} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-[#EAEAEC] rounded-lg p-4 text-center shadow">
            <div className="text-xs uppercase text-gray-500 mb-1">PRODUCT SOLD</div>
            <div className="text-2xl font-semibold">200</div>
          </div>
          <div className="bg-[#EAEAEC] rounded-lg p-4 text-center shadow">
            <div className="text-xs uppercase text-gray-500 mb-1">PRODUCT RETURNED</div>
            <div className="text-2xl font-semibold">10</div>
          </div>
          <div className="bg-[#EAEAEC] rounded-lg p-4 text-center shadow">
            <div className="text-xs uppercase text-gray-500 mb-1">PRODUCT IN STOCK</div>
            <div className="text-2xl font-semibold">10</div>
          </div>
        </div>
      </div>

      {/* Product details section */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-auto object-contain mb-4"
            />
            <h3 className="font-medium mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        </div>

        {/* Product details table */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium border-b pb-3 mb-2">Product Details</h3>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Price</h2>
              <p className="text-right font-medium">₦{Number(product.cost).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Vendor</h2>
              <p className="text-right text-blue-600 underline">{product.vendor || "N/A"} </p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Date Added</h2>
              <p className="text-right">{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">In Stock</h2>
              <p className="text-right">{product.quantity}</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Category</h2>
              <p className="text-right text-blue-600 underline">
                {typeof product.category === "string" ? product.category : product.category.name}
              </p>
            </div>

            {/* <div className="grid grid-cols-2 border-b py-3">
              <div className="text-gray-500">Sub-category</div>
              <p className="text-right  text-blue-600 underline">Food</p>
            </div> */}

            <div className="grid grid-cols-2 border-b py-3">
              <div className="text-gray-500">Tags</div>
              <div className="text-right">
                {product.tags?.map((tag) => (
                  <span key={tag} className="mr-2 bg-gray-100 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 py-3">
              <div className="text-gray-500">Add-Ons</div>
              <div>
                {product.addOns?.length > 0 ? (
                  product.addOns.map((addon, index) => (
                    <div key={index} className="text-right">
                      <p>Item: {addon?.item}</p>
                      <p>Cost: {addon?.cost}</p>
                    </div>
                  ))
                ) : (
                  <p>No add-ons available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => (
  <Suspense>
    <Details />
  </Suspense>
);

export default ProductDetails;
