"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
const ProductDetails = () => {
  const router = useRouter();
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between mb-6 ">
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
          <h1 className="text-xl font-semibold text-gray-800">Product Details</h1>
        </div>
        <div className="flex space-x-2">
          {/* <button className="px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-md">
            Update
          </button> */}
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
          <h2 className="text-lg font-medium">ID: #32678FGBDF</h2>
          <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1"></span>
            Approved
          </span>
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
              src="https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
              alt="Product"
              width={300}
              height={300}
              className="w-full h-auto object-contain mb-4"
            />
            <h3 className="font-medium mb-2">Product Name</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Sed enim tempor eu odio elementum et. Neque
              adipiscing scelerisque mattis leo. Nec ornare egestas hendrerit etiam nibh sapien
              vestibulum. Quam ac in elit tortor.
            </p>
          </div>
        </div>

        {/* Product details table */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium border-b pb-3 mb-2">Product Details</h3>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Price</h2>
              <p className="text-right font-medium    ">₦40,000</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Vendor</h2>
              <p className="text-right text-blue-600 underline">John Doe</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Date Added</h2>
              <p className="text-right">21/01/2025</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">In Stock</h2>
              <p className="text-right">10</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <h2 className="text-gray-500">Category</h2>
              <p className="text-right  text-blue-600 underline">Food & Beverages</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <div className="text-gray-500">Sub-category</div>
              <p className="text-right  text-blue-600 underline">Food</p>
            </div>

            <div className="grid grid-cols-2 border-b py-3">
              <div className="text-gray-500">Tags</div>
              <div className="text-right">0</div>
            </div>

            <div className="grid grid-cols-2 py-3">
              <div className="text-gray-500">Add-Ons</div>
              <div className="text-right">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
