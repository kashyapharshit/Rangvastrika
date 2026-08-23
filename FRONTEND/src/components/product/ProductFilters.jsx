import Input from '../common/Input';

export default function ProductFilters({ search, onSearchChange, minPrice, onMinPriceChange }) {
  return (
    <div className="filters">
      <Input id="search" label="Search" placeholder="Search by name" value={search} onChange={onSearchChange} />
      <Input
        id="min-price"
        label="Min Price"
        type="number"
        min="0"
        value={minPrice}
        onChange={onMinPriceChange}
      />
    </div>
  );
}
