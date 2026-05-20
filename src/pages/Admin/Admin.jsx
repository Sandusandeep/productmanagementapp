import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";

import styles from "./Admin.module.css";

function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state;
  const [title, setTitle] = useState(productToEdit?.title || "");
  const [price, setPrice] = useState(productToEdit?.price || "");
  const [category, setCategory] = useState(productToEdit?.category || "");

  const [description, setDescription] = useState(
    productToEdit?.description || "",
  );
  const [image, setImage] = useState(productToEdit?.image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: Number(price),
      category,
      description,
      image,
    };

    try {
      if (productToEdit) {
        await API.put(`/products/${productToEdit.id}`, productData);
      } else {
        await API.post("/products", productData);
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      <div className={styles.container}>
        <Navbar />

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>
              {productToEdit ? "Edit Product" : "Add New Product"}
            </h2>

            <label>Title</label>

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />

            <label>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.input}
              required
            />

            <label>Image URL</label>

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
              required
            />

            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.input}
              required
            >
              <option value="">Select Category</option>

              <option value="Men">Men</option>

              <option value="Women">Women</option>

              <option value="Electronics">Electronics</option>
            </select>

            <label>Description</label>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              required
            />

            <button type="submit" className={styles.button}>
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
