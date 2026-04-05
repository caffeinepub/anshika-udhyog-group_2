import GenericAdmin from "./GenericAdmin";
export default function AdminCenters() {
  return (
    <GenericAdmin
      title="Center Management"
      contentKey="centers"
      itemLabel="Center"
      fields={[
        { key: "name", label: "Center Name" },
        { key: "state", label: "State" },
        { key: "district", label: "District" },
        { key: "address", label: "Address", type: "textarea" },
        { key: "phone", label: "Phone" },
        { key: "facilities", label: "Facilities (comma separated)" },
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
