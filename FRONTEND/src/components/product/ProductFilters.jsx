import Input from "../common/Input";

export default function ProductFilters({
  search,
  onSearchChange,
  minPrice,
  onMinPriceChange,
}) {
  return (
    <div className="filters bg-white rounded-2xl shadow-sm border border-amber-900/10 p-5 flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          id="search"
          label="Search"
          placeholder="Search by name"
          value={search}
          onChange={onSearchChange}
        />
      </div>
      <div className="sm:w-40">
        <Input
          id="min-price"
          label="Min Price"
          type="number"
          min="0"
          value={minPrice}
          onChange={onMinPriceChange}
        />
      </div>
    </div>
  );
}