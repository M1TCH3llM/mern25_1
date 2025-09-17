export const SaveProductToDBUsingFetch = ({ productName, productPrice = 0, productDesc = "", rating = 0 }) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:9000/product/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productPrice, productDesc, rating })
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save product");
      }
      const saved = await res.json();
      dispatch({ type: "PRODUCT_SAVE_SUCCESS", payload: saved });
      return saved;
    } catch (err) {
      dispatch({ type: "PRODUCT_SAVE_ERROR", payload: err.message });
      throw err;
    }
  };
};

// GET /product
export const FetchProductsFromDBUsingFetch = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:9000/product/");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "PRODUCT_LIST_ERROR", payload: err.message });
    }
  };
};

// DELETE /product/:id
export const DeleteProductFromDBUsingFetch = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:9000/product/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete product");
      }
      dispatch({ type: "PRODUCT_DELETE_SUCCESS", payload: id });
    } catch (err) {
      dispatch({ type: "PRODUCT_DELETE_ERROR", payload: err.message });
    }
  };
};

// PUT /product/:id
export const UpdateProductInDBUsingFetch = (id, payload) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:9000/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to update product");
      }
      const updated = await res.json();
      dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: updated });
      return updated;
    } catch (err) {
      dispatch({ type: "PRODUCT_UPDATE_ERROR", payload: err.message });
      throw err;
    }
  };
};