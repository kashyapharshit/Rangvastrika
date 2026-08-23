import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { createProduct } from "../../api/productApi";
import axiosInstance from "../../api/axiosInstance";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function AdminProducts() {
  const [form, setForm] = useState({ name: "", price: "", description: "", images: [] });
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        images: form.images,
        // keep single image field for compatibility (first image)
        image: form.images && form.images.length > 0 ? form.images[0] : '',
      });
      setMessage("Product created");
      setForm({ name: "", price: "", description: "", images: [] });
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to create product");
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage('Uploading images...');

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await axiosInstance.post('/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (data?.url) uploadedUrls.push(data.url);
      }
      setForm((s) => ({ ...s, images: [...s.images, ...uploadedUrls] }));
      setMessage('Images uploaded');
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => {
    setForm((s) => ({ ...s, images: s.images.filter((_, i) => i !== idx) }));
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

            {/* Image upload input (multiple) */}
            <div>
              <label className="text-sm text-[#2b1a12] mb-1 block">Images</label>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} />
              {uploading && <p className="text-xs text-gray-500 mt-2">Uploading...</p>}

              {form.images && form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.images.map((src, idx) => (
                    <div key={idx} className="relative">
                      <img src={src} alt={`img-${idx}`} className="w-24 h-24 object-cover rounded" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-white rounded-full px-1.5">✕</button>
                    </div>
                  ))}
                </div>
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
