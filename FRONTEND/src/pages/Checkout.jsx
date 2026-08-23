import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/checkout/OrderSummary";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { createOrder } from "../api/orderApi";
import { buildWhatsAppOrderLink } from "../utils/whatsapp";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [details, setDetails] = useState({
    mobile: "",
    email: user?.email || "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateDetails = () => {
    if (!details.mobile.trim()) return "Mobile number is required";
    if (!details.email.trim()) return "Email ID is required";
    if (!details.address.trim()) return "Address is required";
    return "";
  };

  const submitOrder = async () => {
    const validationMessage = validateDetails();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const order = await createOrder({
        customerDetails: {
          name: user?.name || "",
          mobile: details.mobile.trim(),
          email: details.email.trim(),
          address: details.address.trim(),
        },
        totalPrice: total,
        orderItems: items.map((item) => ({
          product: item._id,
          name: item.name,
          image:
            item.image ||
            (Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : ""),
          quantity: item.quantity,
          price: Number(item.price || 0),
        })),
      });

      const whatsappLink = buildWhatsAppOrderLink(order, items);
      clearCart();
      window.location.href = whatsappLink;
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <section
        className="page min-h-[80vh] px-4 sm:px-8 py-10 max-w-4xl mx-auto"
        style={{ backgroundColor: "#FBF7F2" }}
      >
        <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-6">
          Checkout
        </h1>
        <p className="text-sm text-gray-500">Your cart is empty.</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </section>
    );
  }

  return (
    <section
      className="page min-h-[80vh] px-4 sm:px-8 py-10 max-w-4xl mx-auto"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-amber-900/10 p-6 flex flex-col gap-6">
          <p className="text-sm text-gray-600">
            Review your order summary and click Checkout to confirm details.
          </p>
          <Button
            onClick={() => {
              setError("");
              setOpenDetailsModal(true);
            }}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Placing order..." : "Checkout"}
          </Button>
          {error && <p className="error text-sm text-red-500 -mt-2">{error}</p>}
        </div>

        <OrderSummary items={items} total={total} />
      </div>

      <Modal
        open={openDetailsModal}
        title="Confirm your details"
        onClose={() => setOpenDetailsModal(false)}
      >
        <div className="flex flex-col gap-4">
          <Input
            id="checkout-mobile"
            label="Mobile Number"
            value={details.mobile}
            onChange={(e) => setDetails((prev) => ({ ...prev, mobile: e.target.value }))}
          />
          <Input
            id="checkout-email"
            type="email"
            label="Email ID"
            value={details.email}
            onChange={(e) => setDetails((prev) => ({ ...prev, email: e.target.value }))}
          />
          <label className="flex flex-col gap-1" htmlFor="checkout-address">
            <span className="text-sm font-medium text-[#4a2f1d]">Address</span>
            <textarea
              id="checkout-address"
              className="rounded-xl border border-amber-900/20 focus:border-[#7a5236] focus:ring-1 focus:ring-[#7a5236] px-4 py-2 text-sm text-[#2b1a12] placeholder-gray-400 outline-none transition min-h-24"
              placeholder="House no, street, city, pincode"
              value={details.address}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </label>
          {error && <p className="error text-sm text-red-500">{error}</p>}
          <Button onClick={submitOrder} disabled={loading} className="w-full mt-1">
            {loading ? "Redirecting..." : "Continue to WhatsApp"}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
