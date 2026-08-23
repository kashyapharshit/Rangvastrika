import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { createProduct } from "../../api/productApi";
import axiosInstance from "../../api/axiosInstance";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function AdminProducts() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
      });
      setMessage("Product created");
      setForm({ name: "", price: "", description: "", image: "" });
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to create product");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      setMessage("Uploading image...");
      const { data } = await axiosInstance.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((s) => ({ ...s, image: data.url }));
      setMessage("Image uploaded");
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
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

        <div className="bg-white rounded-2xl shadow-sm border border-amber-900/10 p-6 max-w-md">
          <form onSubmit={onCreate} className="stack flex flex-col gap-4">
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

            {/* Image upload input */}
            <div>
              <label className="text-sm text-[#2b1a12] mb-1 block">Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}
              {form.image && (
                <img src={form.image} alt="preview" className="w-32 mt-2 rounded" />
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={uploading}>
              Create Product
            </Button>
          </form>
          {message && (
            <p className="text-sm text-center text-[#4a2f1d] mt-4">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
