import GenericAdmin from "./GenericAdmin";
export default function AdminTraining() {
  return (
    <GenericAdmin
      title="Training Programs"
      contentKey="training"
      itemLabel="Program"
      fields={[
        { key: "title", label: "Title" },
        { key: "duration", label: "Duration" },
        { key: "eligibility", label: "Eligibility" },
        {
          key: "certification",
          label: "Certification",
          type: "select",
          options: ["Yes", "No"],
        },
        { key: "description", label: "Description", type: "textarea" },
        { key: "imageUrl", label: "Image", type: "image" },
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
