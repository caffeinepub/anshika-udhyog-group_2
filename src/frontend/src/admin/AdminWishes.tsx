import GenericAdmin from "./GenericAdmin";
export default function AdminWishes() {
  return (
    <GenericAdmin
      title="Wishes Letters"
      contentKey="wishes"
      itemLabel="Wish"
      fields={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "organization", label: "Organization" },
        { key: "message", label: "Message", type: "textarea" },
        { key: "photo", label: "Photo", type: "image" },
        { key: "date", label: "Date", type: "date" },
      ]}
    />
  );
}
