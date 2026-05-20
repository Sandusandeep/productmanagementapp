import { useEffect, useState } from "react";

import API from "../../services/api";

import ProductCard from "../../components/ProductCard/ProductCard";

import Navbar from "../../components/Navbar/Navbar";

import styles from "./Prodcuts.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  const lastItemIndex = currentPage * itemsPerPage;

  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Recast Listing Page</h1>

      <div className={styles.container}>
        <Navbar />

        <div className={styles.content}>
          <div className={styles.controls}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Categories</option>

              <option value="Men">Men</option>

              <option value="Women">Women</option>

              <option value="Electronics">Electronics</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="">Price: All</option>

              <option value="lowToHigh">Price: Low to High</option>
            </select>
          </div>

          <div className={styles.gridContainer}>
            {currentProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                handleDelete={deleteProduct}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={
                  currentPage === index + 1
                    ? styles.activePage
                    : styles.pageButton
                }
              >
                {index + 1}
              </button>
            ))}

            <button className={styles.pageButton}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
