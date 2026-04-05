import GenericAdmin from "./GenericAdmin";
export default function AdminB2BPlans() {
  return (
    <GenericAdmin
      title="B2B Plans"
      contentKey="b2b_page"
      itemLabel="Plan"
      fields={[
        { key: "name", label: "Plan Name" },
        { key: "price", label: "Price" },
        { key: "badge", label: "Badge" },
        { key: "features", label: "Features (comma separated)" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
