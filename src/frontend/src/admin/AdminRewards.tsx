import GenericAdmin from "./GenericAdmin";
export default function AdminRewards() {
  return (
    <GenericAdmin
      title="Rewards & Awards"
      contentKey="rewards"
      itemLabel="Award"
      fields={[
        { key: "title", label: "Award Title" },
        { key: "icon", label: "Icon (emoji)" },
        { key: "category", label: "Category" },
        { key: "desc", label: "Description", type: "textarea" },
      ]}
    />
  );
}
