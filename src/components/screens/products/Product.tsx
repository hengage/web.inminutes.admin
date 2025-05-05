import Tab from "@/components/ui/custom/Tabs";
import React from "react";
import ProductCategory from "./ProductCategory";
import AllProduct from "./AllProduct";
import ReviewProduct from "./ReviewProduct";

const Product = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-4">Products</h1>
      </div>
      <div>
        <Tab
          items={[
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  All Products
                </button>
              ),
              content: <AllProduct />,
              key: "0",
            },
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  Product Category
                </button>
              ),
              content: <ProductCategory />,
              key: "1",
            },
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  Reviewing Product
                </button>
              ),
              content: <ReviewProduct />,
              key: "2",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Product;
