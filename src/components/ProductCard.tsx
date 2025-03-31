import React from "react";
import { ClickableTile, Tag } from "@carbon/react";
import styles from "../styles/ProductCard.module.scss";

// Define the type for product
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  aiLabel?: string; // AI-generated label (optional)
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <ClickableTile
      href={`/profile/user/products/${product.id}`}
      className={styles.productCard}
    >
      {product.aiLabel && (
        <div className={styles.productCardHeader}>
          <Tag type="blue">{product.aiLabel}</Tag>
        </div>
      )}

      <div className={styles.productContent}>
        <img
          src={product.thumbnail || "/default-thumbnail.png"}
          alt={`Thumbnail of ${product.title}`}
          className={styles.productImage}
        />
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>
          <strong>Price:</strong> ${product.price}
        </p>
      </div>
    </ClickableTile>
  );
};

export default ProductCard;
