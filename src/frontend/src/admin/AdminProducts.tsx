import GenericAdmin from "./GenericAdmin";
export default function AdminProducts() {
  return (
    <GenericAdmin
      title="Products Management"
      contentKey="products"
      itemLabel="Product"
      fields={[
        { key: "name", label: "Product Name" },
        { key: "price", label: "Price" },
        { key: "mrp", label: "MRP" },
        { key: "category", label: "Category" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "stock", label: "Stock Quantity", type: "number" },
        { key: "imageUrl", label: "Product Image", type: "image" },
        {
          key: "isActive",
          label: "Active",
          type: "select",
          options: ["true", "false"],
        },
      ]}
    />
  );
}
