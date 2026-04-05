import GenericAdmin from "./GenericAdmin";
export default function AdminFranchise() {
  return (
    <GenericAdmin
      title="Franchise Page"
      contentKey="franchise_page"
      itemLabel="Section"
      fields={[
        { key: "name", label: "Name/Title" },
        { key: "investment", label: "Investment" },
        { key: "area", label: "Area Required" },
        { key: "machines", label: "Machines Count" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "photo", label: "Photo", type: "image" },
      ]}
    />
  );
}
