"use client";
import DashboardLayout from "@/app/profile/DashboardLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Search,
  Button,
  InlineLoading,
} from "@carbon/react";
import { ArrowLeft } from "@carbon/icons-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((product) => ({
      id: product.id.toString(),
      title: product.title,
      description: product.description,
      price: `$${product.price.toFixed(2)}`,
    }));

  const headers = [
    { key: "id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "price", header: "Price" },
  ];

  return (
    <DashboardLayout>
      <Button
        kind="secondary"
        onClick={() => router.back()}
        renderIcon={ArrowLeft}
        disabled={loading}
      >
        Back
      </Button>
      <Search
        size="lg"
        labelText="Search products"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={loading}
      />
      {loading && <InlineLoading description="Loading products..." />}
      <DataTable rows={filteredProducts} headers={headers}>
        {({ rows, headers, getTableProps }) => (
          <Table {...getTableProps()} size="lg">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} isSortable={false}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={headers.length}>
                    <InlineLoading description="Loading products..." />
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() =>
                      router.push(`/profile/user/products/${row.id}`)
                    }
                  >
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id} style={{ cursor: "pointer" }}>
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </DashboardLayout>
  );
};

export default ProductList;
