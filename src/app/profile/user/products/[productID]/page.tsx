"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductDetails } from "../types";
import {
  Loading,
  Tag,
  Tile,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  AspectRatio,
  ProgressBar,
} from "@carbon/react";
import DashboardLayout from "../../../DashboardLayout";
import styles from "../../../../../styles/ProductPage.module.scss";

const ProductPage = () => {
  const params = useParams();
  const productID = params?.productID as string;
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  /** Handle Tab Change */
  const handleTabChange: (state: { selectedIndex: number }) => void = (
    state
  ) => {
    console.log("Switching to tab:", state.selectedIndex);
    setActiveTab(state.selectedIndex);
  };

  /** Fetch Product Data */
  useEffect(() => {
    if (!productID) {
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(`Fetching product: ${productID}`);
        const response = await fetch(
          `https://dummyjson.com/products/${productID}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        console.log("Fetched Product:", data);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  /** Handle Loading State */
  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ padding: "2rem" }}>
          <Loading description="Loading product details" withOverlay={false} />
        </div>
      </DashboardLayout>
    );
  }

  /** Handle Error State */
  if (error || !product) {
    return (
      <DashboardLayout>
        <div style={{ padding: "2rem" }}>
          <h2>Error loading product</h2>
          <p>{error || "Product not found"}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.productPageContainer}>
        <div className={styles.productGrid}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <AspectRatio ratio="4x3">
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.mainImage}
              />
            </AspectRatio>
            <div className={styles.imageGallery}>
              {product.images.map((image, index) => (
                <AspectRatio key={index} ratio="1x1">
                  <img
                    src={image}
                    alt={`${product.title} - View ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                </AspectRatio>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <Stack gap={6} className={styles.productInfo}>
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <h1>{product.title}</h1>
                <p className={styles.brand}>by {product.brand}</p>
                <div className={styles.tags}>
                  <Tag type="blue">{product.category}</Tag>
                  <Tag type="green">{product.availabilityStatus}</Tag>
                  {product.tags.map((tag) => (
                    <Tag key={tag} type="gray">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Pricing and Stock */}
              <Tile className={styles.pricingTile}>
                <div className={styles.pricing}>
                  <h2>${product.price.toFixed(2)}</h2>
                  {product.discountPercentage > 0 && (
                    <div className={styles.discount}>
                      <span className={styles.originalPrice}>
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <Tag type="red">{product.discountPercentage}% OFF</Tag>
                    </div>
                  )}
                </div>
                <div className={styles.stock}>
                  <span>Stock: {product.stock} units</span>
                  <ProgressBar
                    value={(product.stock / product.minimumOrderQuantity) * 100}
                    max={100}
                    size="small"
                    label="Stock level"
                  />
                </div>
              </Tile>
            </div>

            {/* Tabs Section */}
            <div className={styles.tabsContainer}>
              <Tabs selectedIndex={activeTab} onChange={handleTabChange}>
                <TabList aria-label="Product Information">
                  <Tab>Details</Tab>
                  <Tab>Specifications</Tab>
                  <Tab>Shipping</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <div className={styles.tabContent}>
                  <TabPanels>
                    <TabPanel>
                      <p>{product.description}</p>
                      <div className={styles.specs}>
                        <p>SKU: {product.sku}</p>
                        <p>Category: {product.category}</p>
                        <p>Weight: {product.weight}g</p>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <h4>Dimensions</h4>
                      <p>Width: {product.dimensions.width}cm</p>
                      <p>Height: {product.dimensions.height}cm</p>
                      <p>Depth: {product.dimensions.depth}cm</p>
                      <h4>Additional Info</h4>
                      <p>Barcode: {product.meta.barcode}</p>
                    </TabPanel>
                    <TabPanel>
                      <h4>Shipping Information</h4>
                      <p>{product.shippingInformation}</p>
                      <h4>Return Policy</h4>
                      <p>{product.returnPolicy}</p>
                      <h4>Warranty</h4>
                      <p>{product.warrantyInformation}</p>
                    </TabPanel>
                    <TabPanel>
                      <div className={styles.reviews}>
                        {product.reviews.map((review, index) => (
                          <Tile key={index} className={styles.review}>
                            <h4>{review.reviewerName}</h4>
                            <p>Rating: {review.rating}/5</p>
                            <p>{review.comment}</p>
                            <small>
                              {new Date(review.date).toLocaleDateString()}
                            </small>
                          </Tile>
                        ))}
                      </div>
                    </TabPanel>
                  </TabPanels>
                </div>
              </Tabs>
            </div>
          </Stack>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductPage;
