"use client";
import SubCategory from "@/components/screens/products/SubCategory";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubCategory />
    </Suspense>
  );
}
