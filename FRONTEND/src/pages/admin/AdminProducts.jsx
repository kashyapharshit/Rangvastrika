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
// Icons import kar rahe hain UI ko accha banane ke liye
import { ImagePlus, Trash2, Edit2, X } from "lucide-react"; 

const emptyForm = {
  name: "",
  price: "",
  description: "",
  sizes: "",
  material: "",
  weather: "",
  stock: "",
  images: [],
};

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
    setMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      sizes: form.sizes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      material: form.material.trim(),
      weather: form.weather
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      countInStock: Number(form.stock || 0),
      images: form.images,
      image: form.images && form.images.length > 0 ? form.images[0] : "",
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, payload);
        setMessage("Product successfully updated!");
      } else {
        await createProduct(payload);
        setMessage("New product successfully created!");
      }

      resetForm();
      await refetchProducts();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to save product.");
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage("Uploading images... Please wait.");

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
      setMessage("Images uploaded successfully.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Image upload failed.");
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
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : "",
      material: product.material || "",
      weather: Array.isArray(product.weather) ? product.weather.join(", ") : "",
      stock: product.countInStock ?? 0,
      images:
        product.images && product.images.length > 0
          ? product.images
          : product.image
            ? [product.image]
            : [],
    });
    // Scroll to top of the form smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDeleteProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully.");
      if (editingProductId === id) {
        resetForm();
      }
      await refetchProducts();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    // OUTER WRAPPER: Full width with sidebar
    <div className="flex min-h-screen w-full bg-[#FBF7F2]">
      <Sidebar />
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 overflow-y-auto w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b1a12] mb-2">
              Product Management
            </h1>
            <p className="text-sm text-gray-600">
              Add new inventory or manage existing products.
            </p>
          </div>
        </div>

        {/* ALERTS / MESSAGES */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
            message.includes('failed') || message.includes('error') 
              ? 'bg-red-50 text-red-700 border-red-200' 
              : 'bg-green-50 text-green-700 border-green-200'
          }`}>
            {message}
          </div>
        )}

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
          
          {/* --- LEFT COLUMN: ADD/EDIT FORM (Takes 2/5 width on very large screens) --- */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-[#7a5236]/15 p-6 sm:p-8 sticky top-6">
            
            <h2 className="text-xl font-serif font-bold text-[#2b1a12] mb-6 border-b border-gray-100 pb-4">
              {editingProductId ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <Input
                id="product-name"
                label="Product Name"
                placeholder="e.g. Red Silk Saree"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                id="product-price"
                type="number"
                min="0"
                label="Price (₹)"
                placeholder="e.g. 1500"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              
              <div className="flex flex-col">
                <label htmlFor="product-description" className="text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="product-description"
                  rows="3"
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a5236]/50 bg-gray-50 text-sm"
                  placeholder="Describe the product..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="product-sizes"
                  label="Sizes"
                  placeholder="S, M, L"
                  value={form.sizes}
                  onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                />
                <Input
                  id="product-stock"
                  type="number"
                  min="0"
                  label="Stock Quantity"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="product-material"
                  label="Material"
                  placeholder="Cotton, Silk"
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                />
                <Input
                  id="product-weather"
                  label="Weather/Season"
                  placeholder="Summer, Winter"
                  value={form.weather}
                  onChange={(e) => setForm({ ...form, weather: e.target.value })}
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="border border-dashed border-[#7a5236]/30 rounded-xl p-4 bg-gray-50 mt-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#2b1a12] mb-3 cursor-pointer w-max">
                  <ImagePlus size={18} className="text-[#7a5236]" />
                  <span>Upload Images</span>
                  <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                </label>
                
                {uploading && <p className="text-xs text-[#7a5236] animate-pulse">Uploading securely...</p>}

                {form.images && form.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {form.images.map((src, idx) => (
                      <div key={`${src}-${idx}`} className="relative group">
                        <img src={src} alt={`Upload ${idx}`} className="w-20 h-24 object-cover rounded-lg shadow-sm border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <Button type="submit" className="flex-1 py-3" disabled={uploading}>
                  {editingProductId ? "Save Changes" : "Create Product"}
                </Button>
                {editingProductId && (
                  <button 
                    type="button" 
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* --- RIGHT COLUMN: PRODUCT LIST (Takes 3/5 width on very large screens) --- */}
          <div className="xl:col-span-3 bg-white rounded-3xl shadow-sm border border-[#7a5236]/15 p-6 sm:p-8">
            <h2 className="text-xl font-serif font-bold text-[#2b1a12] mb-6 border-b border-gray-100 pb-4">
              Inventory List ({productList.length})
            </h2>

            {loading && <p className="text-sm text-gray-500 py-10 text-center">Loading inventory...</p>}
            {error && <p className="text-sm text-red-500 py-10 text-center">{error}</p>}

            {!loading && !productList.length ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No products found in inventory.</p>
                <p className="text-xs text-gray-400 mt-1">Add a product using the form.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {productList.map((product) => {
                  const stock = Number(product.countInStock || 0);
                  const inStock = stock > 0;
                  const thumb = (product.images && product.images[0]) || product.image || "https://placehold.co/100?text=No+Img";

                  return (
                    <article
                      key={product._id}
                      className="group border border-gray-100 hover:border-[#7a5236]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition-all duration-300 bg-white"
                    >
                      {/* Thumbnail */}
                      <img 
                        src={thumb} 
                        alt={product.name} 
                        className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl bg-gray-50 border border-gray-100" 
                      />
                      
                      {/* Details */}
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-base font-bold text-[#2b1a12] line-clamp-1">{product.name}</h3>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {inStock ? `${stock} in stock` : 'Out of Stock'}
                          </span>
                        </div>
                        
                        <p className="text-lg font-bold text-[#7a5236] mb-2">{formatCurrency(product.price)}</p>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <p><span className="font-medium text-gray-700">Sizes:</span> {Array.isArray(product.sizes) && product.sizes.length ? product.sizes.join(", ") : "N/A"}</p>
                          <p><span className="font-medium text-gray-700">Material:</span> {product.material || "N/A"}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                        <button 
                          onClick={() => startEdit(product)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition-colors"
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button 
                          onClick={() => onDeleteProduct(product._id)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}