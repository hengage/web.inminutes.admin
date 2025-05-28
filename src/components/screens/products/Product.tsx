"use client";
import React, { useState } from "react";
import Tab from "@/components/ui/custom/Tabs";
import ProductCategory from "./ProductCategory";
import AllProduct from "./AllProduct";
import ReviewProduct from "./ReviewProduct";
import { Icon } from "@/components/ui/Icon";
import CreateCategoryModal from "./CreateCategory";
import { CustomButton as Button } from "@/components/ui/custom/button";
import Link from "next/link";
import useUrlHash from "@/hooks/useUrlHash";

const Product = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const { hashParams, updateHashUrl } = useUrlHash();

  return (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4 text-[#160A62]">Products</h1>

        {hashParams.tab === "1" && (
          <Button
            variant="ctm-primary"
            slotBefore={<Icon name="add" height={16} width={16} />}
            onClick={() => setOpenCategoryModal(true)}
          >
            <p>New Category</p>
          </Button>
        )}
      </div>

      <div>
        <Tab
          items={[
            {
              trigger: (
                <Link
                  href={{
                    pathname: "/product",
                    query: { page: 1, limit: 25 },
                    hash: updateHashUrl({ tab: "0" }).substring(1),
                  }}
                  className="px-4 py-2 text-sm font-medium hover:text-indigo-700"
                >
                  All Products
                </Link>
              ),

              content: <AllProduct />,
              key: "0",
            },
            {
              trigger: (
                <Link
                  href={{
                    pathname: "/product",
                    query: { page: 1, limit: 25 },
                    hash: updateHashUrl({ tab: "1" }).substring(1),
                  }}
                  className="px-4 py-2 text-sm font-medium hover:text-indigo-700"
                >
                  Product Category
                </Link>
              ),
              content: <ProductCategory />,
              key: "1",
            },
            {
              trigger: (
                <Link
                  href={{
                    pathname: "/product",
                    query: { page: 1, limit: 25 },
                    hash: updateHashUrl({ tab: "2" }).substring(1),
                  }}
                  className="px-4 py-2 text-sm font-medium hover:text-indigo-700"
                >
                  Reviewing Products
                </Link>
              ),
              content: <ReviewProduct />,
              key: "2",
            },
          ]}
          value={hashParams.tab ?? "0"}
        />
      </div>

      {/* ✅ Category Modal */}
      <CreateCategoryModal open={openCategoryModal} onOpenChange={setOpenCategoryModal} />
    </div>
  );
};

export default Product;
