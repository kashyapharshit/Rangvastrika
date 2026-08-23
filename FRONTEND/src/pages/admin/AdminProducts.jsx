import { useMemo, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../api/productApi";
import axiosInstance from "../../api/axiosInstance";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useFetch } from "../../hooks/useFetch";
import { formatCurrency } from "../../utils/formatCurrency";

const emptyForm = { name: "", price: "", description: "", images: [] };

export default function AdminProducts() {
  const [form, setForm] = useState(emptyForm);
  const [editingProductId, setEditingProductId] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    data: products,
    loading,
    error,
    run: refetchProducts,
  } = useFetch(getProducts);

  const productList = useMemo(() => products || [], [products]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingProductId("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      images: form.images,
      image: form.images && form.images.length > 0 ? form.images[0] : "",
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, payload);
        setMessage("Product updated");
      } else {
        await createProduct(payload);
        setMessage("Product created");
      }

      resetForm();
      await refetchProducts();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save product");
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage("Uploading images...");

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axiosInstance.post("/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data?.url) uploadedUrls.push(data.url);
      }
      setForm((s) => ({ ...s, images: [...s.images, ...uploadedUrls] }));
      setMessage("Images uploaded");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => {
    setForm((s) => ({ ...s, images: s.images.filter((_, i) => i !== idx) }));
  };

  const startEdit = (product) => {
    setMessage("");
    setEditingProductId(product._id);
    setForm({
      name: product.name || "",
      price: product.price ?? "",
      description: product.description || "",
      images:
        product.images && product.images.length > 0
          ? product.images
          : product.image
            ? [product.image]
            : [],
    });
  };

  const onDeleteProduct = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setMessage("Product deleted");
      if (editingProductId === id) {
        resetForm();
      }
      await refetchProducts();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <section className="page admin-layout flex min-h-screen">
      <Sidebar />
      <div
        className="flex-1 px-6 sm:px-10 py-10"
        style={{ backgroundColor: "#FBF7F2" }}
      >
        <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-6">
          Admin Products
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-amber-900/10 p-6">
            <form onSubmit={onSubmit} className="stack flex flex-col gap-4">
              <Input
                id="product-name"
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                id="product-price"
                type="number"
                min="0"
                label="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <Input
                id="product-description"
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div>
                <label className="text-sm text-[#2b1a12] mb-1 block">Images</label>
                <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}

                {form.images && form.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.images.map((src, idx) => (
                      <div key={`${src}-${idx}`} className="relative">
                        <img src={src} alt={`img-${idx}`} className="w-24 h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-white rounded-full px-1.5"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full mt-2" disabled={uploading}>
                {editingProductId ? "Update Product" : "Create Product"}
              </Button>
              {editingProductId && (
                <Button type="button" className="w-full" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </form>
            {message && (
              <p className="text-sm text-center text-[#4a2f1d] mt-4">{message}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-amber-900/10 p-6">
            <h2 className="text-xl font-semibold text-[#2b1a12] mb-4">Existing Products</h2>

            {loading && <p className="text-sm text-gray-500">Loading products...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex flex-col gap-3">
              {productList.map((product) => (
                <article
                  key={product._id}
                  className="border border-amber-900/10 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#2b1a12]">{product.name}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="px-3 py-1.5 text-xs" onClick={() => startEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      className="px-3 py-1.5 text-xs"
                      style={{ backgroundColor: "#9f3a2f" }}
                      onClick={() => onDeleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </article>
              ))}

              {!loading && !productList.length && (
                <p className="text-sm text-gray-500">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
