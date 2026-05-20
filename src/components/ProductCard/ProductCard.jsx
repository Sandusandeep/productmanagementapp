import styles from "./ProductCard.module.css";

import { useNavigate } from "react-router-dom";

function ProductCard({ product, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>₹ {product.price}</p>
      <p className={styles.category}>{product.category}</p>

      <div className={styles.buttonContainer}>
        <button
          className={styles.editBtn}
          onClick={() =>
            navigate("/admin", {
              state: product,
            })
          }
        >
          Edit
        </button>

        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
