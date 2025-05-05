import Image from "next/image";
import React from "react";
const ProductDetails = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-auto">
      {/* Main content */}
      <div className="p-6">
        {/* Header with back button and actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-gray-500 mr-3"
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
            <h1 className="text-xl font-semibold text-gray-800">Product Details</h1>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-md">
              Update
            </button>
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

        {/* Product ID and status */}
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-medium">ID: #32678FGBDF</h2>
          <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1"></span>
            Approved
          </span>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs uppercase text-gray-500 mb-1">PRODUCT SOLD</div>
            <div className="text-2xl font-semibold">200</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs uppercase text-gray-500 mb-1">PRODUCT RETURNED</div>
            <div className="text-2xl font-semibold">10</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs uppercase text-gray-500 mb-1">PRODUCT IN STOCK</div>
            <div className="text-2xl font-semibold">10</div>
          </div>
        </div>

        {/* Product details section */}
        <div className="grid grid-cols-3 gap-8">
          {/* Product image and name */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <Image
                src="https://via.placeholder.com/300x200"
                alt="Product"
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
                <div className="text-gray-500">Price</div>
                <div className="text-right font-medium">₦40,000</div>
              </div>

              <div className="grid grid-cols-2 border-b py-3">
                <div className="text-gray-500">Vendor</div>
                <div className="text-right text-blue-600">John Doe</div>
              </div>

              <div className="grid grid-cols-2 border-b py-3">
                <div className="text-gray-500">Date Added</div>
                <div className="text-right">21/01/2025</div>
              </div>

              <div className="grid grid-cols-2 border-b py-3">
                <div className="text-gray-500">In Stock</div>
                <div className="text-right">10</div>
              </div>

              <div className="grid grid-cols-2 border-b py-3">
                <div className="text-gray-500">Category</div>
                <div className="text-right text-blue-600">Food & Beverages</div>
              </div>

              <div className="grid grid-cols-2 border-b py-3">
                <div className="text-gray-500">Sub-category</div>
                <div className="text-right text-blue-600">Food</div>
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
    </div>
  );
};

export default ProductDetails;
