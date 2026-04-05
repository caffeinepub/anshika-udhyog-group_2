import GenericAdmin from "./GenericAdmin";
export default function AdminInternship() {
  return (
    <GenericAdmin
      title="Internship Vacancies"
      contentKey="internship_vacancies"
      itemLabel="Vacancy"
      fields={[
        { key: "title", label: "Job Title" },
        { key: "department", label: "Department" },
        { key: "location", label: "Location" },
        { key: "stipend", label: "Stipend" },
        { key: "duration", label: "Duration" },
        { key: "seats", label: "Seats", type: "number" },
        { key: "lastDate", label: "Last Date", type: "date" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "imageUrl", label: "Photo", type: "image" },
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
