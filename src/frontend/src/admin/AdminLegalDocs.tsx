import GenericAdmin from "./GenericAdmin";
export default function AdminLegalDocs() {
  return (
    <GenericAdmin
      title="Legal Documents"
      contentKey="legal_docs"
      itemLabel="Document"
      fields={[
        { key: "title", label: "Document Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "issuedBy", label: "Issued By" },
        { key: "issuedDate", label: "Issued Date", type: "date" },
        { key: "validUpto", label: "Valid Upto" },
        { key: "fileUrl", label: "File URL" },
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
