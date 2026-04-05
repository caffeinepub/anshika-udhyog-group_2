import GenericAdmin from "./GenericAdmin";
export default function AdminLoan() {
  return (
    <GenericAdmin
      title="Loan Management"
      contentKey="loans"
      itemLabel="Loan Type"
      fields={[
        { key: "title", label: "Title" },
        { key: "id", label: "ID (mudra/shg/udhyog)" },
        { key: "amount", label: "Loan Amount" },
        { key: "interest", label: "Interest Rate" },
        { key: "tenure", label: "Tenure" },
        { key: "icon", label: "Icon (emoji)" },
        { key: "desc", label: "Description", type: "textarea" },
      ]}
    />
  );
}
