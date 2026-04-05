import GenericAdmin from "./GenericAdmin";
export default function AdminOurTeam() {
  return (
    <GenericAdmin
      title="Our Team"
      contentKey="team"
      itemLabel="Team Member"
      fields={[
        { key: "name", label: "Full Name" },
        { key: "designation", label: "Designation" },
        { key: "department", label: "Department" },
        { key: "bio", label: "Bio", type: "textarea" },
        { key: "email", label: "Email" },
        { key: "photo", label: "Photo", type: "image" },
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
