import GenericAdmin from "./GenericAdmin";
export default function AdminEmployment() {
  return (
    <GenericAdmin
      title="Employment Management"
      contentKey="employment"
      itemLabel="Job"
      fields={[
        { key: "title", label: "Job Title" },
        { key: "location", label: "Location" },
        {
          key: "type",
          label: "Type",
          type: "select",
          options: ["Full Time", "Part Time", "Contract"],
        },
        { key: "salary", label: "Salary Range" },
        { key: "requirements", label: "Requirements" },
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
