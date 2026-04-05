import GenericAdmin from "./GenericAdmin";
export default function AdminYouTube() {
  return (
    <GenericAdmin
      title="YouTube Videos"
      contentKey="youtube"
      itemLabel="Video"
      fields={[
        { key: "title", label: "Video Title" },
        { key: "url", label: "YouTube URL" },
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
