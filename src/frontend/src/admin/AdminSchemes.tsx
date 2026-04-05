import GenericAdmin from "./GenericAdmin";
export default function AdminSchemes() {
  return (
    <GenericAdmin
      title="Schemes Management"
      contentKey="schemes"
      itemLabel="Scheme"
      fields={[
        { key: "title", label: "Scheme Title" },
        { key: "icon", label: "Icon (emoji)" },
        { key: "category", label: "Category" },
        { key: "desc", label: "Description", type: "textarea" },
        { key: "eligibility", label: "Eligibility" },
        { key: "benefit", label: "Benefit" },
      ]}
    />
  );
}
