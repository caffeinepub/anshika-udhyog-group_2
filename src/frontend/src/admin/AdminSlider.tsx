import GenericAdmin from "./GenericAdmin";
export default function AdminSlider() {
  return (
    <GenericAdmin
      title="Image Slider"
      contentKey="slider"
      itemLabel="Slide"
      fields={[
        { key: "title", label: "Slide Title" },
        { key: "subtitle", label: "Subtitle" },
        { key: "imageUrl", label: "Image", type: "image" },
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
