export const QUERY_KEYS = {
  VENDORS: "vendors",
  PRODUCTS: "products",
  RIDERS: "riders",
  ROLES: "roles",
  ORDERS: "orders",
  TRANSAC: "transactions",
  ERRANDS: "errands",
  Categories: "categories",
  SubCategory: "subcategories",
  CUSTOMERS: "customers",
} as const;

// Function to check for duplicate values
export const validateQueryKeys = () => {
  const values = Object.values(QUERY_KEYS);
  const duplicates = values.filter((item, index) => values.indexOf(item) !== index);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate query keys found: ${duplicates.join(", ")}`);
  }
};
