import Input from '../common/Input';

export default function AddressForm({ value, onChange }) {
  return (
    <Input
      id="shipping-address"
      label="Shipping Address"
      placeholder="House no, street, city, pincode"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
