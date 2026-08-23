import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/checkout/AddressForm";
import OrderSummary from "../components/checkout/OrderSummary";
import Button from "../components/common/Button";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../api/orderApi";
import { validateAddress } from "../utils/validators";
import { buildWhatsAppOrderLink } from "../utils/whatsapp";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitOrder = async () => {
    const validationMessage = validateAddress(shippingAddress);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const order = await createOrder({
        shippingAddress,
        totalPrice: total,
        orderItems: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: Number(item.price || 0),
        })),
      });

      const whatsappLink = buildWhatsAppOrderLink(order, items);
      window.open(whatsappLink, "_blank", "noopener,noreferrer");

      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to place order");
    } finally {
      setLoading(false);
    }
  };

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
          <AddressForm value={shippingAddress} onChange={setShippingAddress} />
          {error && (
            <p className="error text-sm text-red-500 -mt-2">{error}</p>
          )}
          <Button
            onClick={submitOrder}
            disabled={!items.length || loading}
            className="w-full"
          >
            {loading ? "Placing order..." : "Place Order via WhatsApp"}
          </Button>
        </div>

        <OrderSummary items={items} total={total} />
      </div>
    </section>
  );
}