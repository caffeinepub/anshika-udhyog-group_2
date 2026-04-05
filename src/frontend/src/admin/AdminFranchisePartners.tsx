import GenericAdmin from "./GenericAdmin";
export default function AdminFranchisePartners() {
  return (
    <GenericAdmin
      title="Franchise Partners"
      contentKey="franchise_partners"
      itemLabel="Partner"
      fields={[
        { key: "name", label: "Partner Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "territory", label: "Territory" },
        { key: "plan", label: "Plan" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: ["Active", "Inactive", "Pending"],
        },
        { key: "photo", label: "Photo", type: "image" },
        { key: "joinDate", label: "Join Date", type: "date" },
      ]}
    />
  );
}
