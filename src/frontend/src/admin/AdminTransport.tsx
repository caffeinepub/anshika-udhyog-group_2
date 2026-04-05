import GenericAdmin from "./GenericAdmin";
export default function AdminTransport() {
  return (
    <GenericAdmin
      title="Transport Management"
      contentKey="transport_data"
      itemLabel="Vehicle"
      fields={[
        { key: "vehicleNumber", label: "Vehicle Number" },
        {
          key: "type",
          label: "Type",
          type: "select",
          options: ["Truck", "Van", "Bike", "Auto", "Car"],
        },
        { key: "capacity", label: "Capacity" },
        { key: "driverName", label: "Driver Name" },
        { key: "driverPhone", label: "Driver Phone" },
        { key: "route", label: "Route" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: ["Active", "Inactive", "In Transit"],
        },
      ]}
    />
  );
}
