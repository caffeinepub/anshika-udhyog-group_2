import GenericAdmin from "./GenericAdmin";
export default function AdminOurPartners() {
  return (
    <GenericAdmin
      title="Our Partners"
      contentKey="partners"
      itemLabel="Partner"
      fields={[
        { key: "name", label: "Organization Name" },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: [
            "Banking",
            "Government",
            "Training",
            "Industry",
            "NGO",
            "Corporate",
            "Other",
          ],
        },
        { key: "desc", label: "Description", type: "textarea" },
        { key: "website", label: "Website URL" },
        { key: "logo", label: "Logo", type: "image" },
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
