import Product from "@/components/screens/products/Product";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Product />
    </Suspense>
  );
};

export default page;
