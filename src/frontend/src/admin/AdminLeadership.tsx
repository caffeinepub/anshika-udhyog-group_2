import GenericAdmin from "./GenericAdmin";
export default function AdminLeadership() {
  return (
    <GenericAdmin
      title="Leadership Team"
      contentKey="leadership"
      itemLabel="Leader"
      fields={[
        { key: "name", label: "Full Name" },
        { key: "designation", label: "Designation" },
        { key: "qualification", label: "Qualification" },
        { key: "message", label: "Message/Quote", type: "textarea" },
        { key: "photo", label: "Photo", type: "image" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
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
