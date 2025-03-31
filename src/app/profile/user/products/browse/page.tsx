"use client";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../../../../../components/ProductCard";
import DashboardLayout from "../../../DashboardLayout";
import { Loading } from "@carbon/react";
import styles from "../../../../../styles/UserPage.module.scss"; // Import CSS module

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  aiLabel?: string; // AI-generated label (optional)
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) throw new Error("Failed to fetch products.");

      const data = await response.json();

      // Simulating AI-generated labels
      const labeledProducts = data.products.map(
        (product: Product, index: number) => ({
          ...product,
          aiLabel: index % 2 === 0 ? "Best Seller" : undefined, // Assigning label to some products
        })
      );

      setProducts(labeledProducts);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1>User Dashboard</h1>

        {loading && (
          <div className={styles.loadingContainer}>
            <Loading small />
          </div>
        )}

        {error && <p className={styles.errorMessage}>Error: {error}</p>}

        {!loading && !error && (
          <div className={styles.productList}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductPage;
