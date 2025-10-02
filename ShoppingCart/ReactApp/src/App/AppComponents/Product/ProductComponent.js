import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SaveProductToDBUsingFetch,
  FetchProductsFromDBUsingFetch,
  DeleteProductFromDBUsingFetch,
  UpdateProductInDBUsingFetch
} from "../../State/Product/ProductAcctions"; 
import { addItem } from "../../State/Cart/CartActions"; 

const ProductComponent = () => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descRef = useRef(null);
  const ratingRef = useRef(null);

  const dispatch = useDispatch();
  const { products, error } = useSelector((s) => s.productState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(FetchProductsFromDBUsingFetch());
  }, [dispatch]);

  //  Edit helpers 
  const beginEdit = (p) => {
    setEditingId(p._id);
    if (nameRef.current) nameRef.current.value = p.productName || "";
    if (priceRef.current) priceRef.current.value = p.productPrice ?? "";
    if (descRef.current) descRef.current.value = p.productDesc || "";
    if (ratingRef.current) ratingRef.current.value = p.rating ?? "";
  };

  const cancelEdit = () => {
    setEditingId(null);
    if (nameRef.current) nameRef.current.value = "";
    if (priceRef.current) priceRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
    if (ratingRef.current) ratingRef.current.value = "";
  };

  // ----- Save (create or update) -----
  const handleSave = async (e) => {
    e.preventDefault();

    const productName = (nameRef.current?.value || "").trim();
    const productDesc = (descRef.current?.value || "").trim();
    const productPrice = parseFloat(priceRef.current?.value || "0");
    const rating = Math.max(0, Math.min(5, parseFloat(ratingRef.current?.value || "0")));

    if (!productName) {
      alert("Please enter a product name");
      return;
    }

    const payload = {
      productName,
      productPrice: isNaN(productPrice) ? 0 : productPrice,
      productDesc,
      rating: isNaN(rating) ? 0 : rating,
    };

    try {
      if (editingId) {
        await dispatch(UpdateProductInDBUsingFetch(editingId, payload));
        cancelEdit();
        alert("Product updated");
      } else {
        await dispatch(SaveProductToDBUsingFetch(payload));
        // refresh list (optional; reducer also prepends)
        dispatch(FetchProductsFromDBUsingFetch());
        cancelEdit();
        alert("Product saved");
      }
    } catch (err) {
      alert("Failed to save product: " + err.message);
    }
  };

  // ----- Delete -----
  const handleDelete = async (id) => {
    await dispatch(DeleteProductFromDBUsingFetch(id));
  };

// ----- Add to Cart -----
  const handleAddToCart = (product, qty = 1) => {
  dispatch(addItem(product, qty));
};

  return (
    <>
      <h1>Product Create Page</h1>

      <div className="form col-md-12">
        <div className="form-control">
          <div className="col-md-3"><b>Product Name</b></div>
          <div className="col-md-7">
            <input
              ref={nameRef}
              type="text"
              className="form-control textbox"
              placeholder="e.g. Dumbbell Set"
              maxLength={120}
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-3"><b>Price</b></div>
          <div className="col-md-7">
            <input
              ref={priceRef}
              type="number"
              step="0.01"
              min="0"
              className="form-control textbox"
              placeholder="e.g. 199.99"
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-3"><b>Description</b></div>
          <div className="col-md-7">
            <input
              ref={descRef}
              type="text"
              className="form-control textbox"
              placeholder="Short description"
              maxLength={2000}
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-3"><b>Rating (0–5)</b></div>
          <div className="col-md-7">
            <input
              ref={ratingRef}
              type="number"
              min="0"
              max="5"
              step="0.1"
              className="form-control textbox"
              placeholder="e.g. 4.5"
            />
          </div>
        </div>

        <div className="form-control">
          <div className="col-md-7 button">
            <input
              type="submit"
              className="button"
              onClick={handleSave}
              value={editingId ? "Update Product" : "Save Product"}
            />
            {editingId && (
              <button type="button" onClick={cancelEdit} style={{ marginLeft: 8 }}>
                Cancel
              </button>
            )}
          </div>
        </div>

        <hr />

        <h2>Products</h2>
        {error && <p style={{ color: "crimson" }}>{error}</p>}

       <table className="table" style={{ maxWidth: 1000 }}>
        <thead>
            <tr>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>Price</th>
            <th>Description</th>
            <th style={{ textAlign: "right" }}>Rating</th>
            <th style={{ textAlign: "center" }}>Edit</th>
            <th style={{ textAlign: "center" }}>Delete</th>
            <th style={{ textAlign: "center" }}>Add</th>
            </tr>
        </thead>

        <tbody>
            {(products || []).length === 0 ? (
            <tr>
                {/* 7 total columns now */}
                <td colSpan="7"><em>No products yet.</em></td>
            </tr>
            ) : (
            products.map((p) => (
                <tr key={p._id}>
                <td>{p.productName}</td>
                <td style={{ textAlign: "right" }}>
                    {typeof p.productPrice === "number"
                    ? p.productPrice.toFixed(2)
                    : p.productPrice}
                </td>
                <td>{p.productDesc}</td>
                <td style={{ textAlign: "right" }}>{p.rating}</td>

                {/* one cell per action */}
                <td style={{ textAlign: "center" }}>
                    <button onClick={() => beginEdit(p)}>Edit</button>
                </td>
                <td style={{ textAlign: "center" }}>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={async () => {
                        try {
                          await handleAddToCart(p, 1);
                          alert("Item placed in cart");
                        } catch (e) {
                          alert(e?.message || "Failed to add item");
                        }
                      }}
                    >Add</button>
                  </td>
                </tr>
            ))
            )}
        </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductComponent;
