import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function AdminFooter() {
  const { contentMap, saveContent } = useAppContext();
  const footer = (contentMap.footer_settings || {}) as Record<string, string>;
  const [form, setForm] = useState(footer);

  async function handleSave() {
    await saveContent("footer_settings", form);
    toast.success("Footer settings saved!");
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">Footer Settings</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["facebook", "Facebook URL"],
              ["twitter", "Twitter URL"],
              ["instagram", "Instagram URL"],
              ["youtube", "YouTube URL"],
              ["footerText", "Footer Description"],
            ].map(([key, label]) => (
              <div
                key={key}
                className={key === "footerText" ? "col-span-2" : ""}
              >
                <label className="text-sm font-medium">{label}</label>
                <input
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form[key] || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [key]: e.target.value }))
                  }
                  data-ocid={`footer.${key}.input`}
                />
              </div>
            ))}
          </div>
          <Button
            className="bg-green-700"
            onClick={handleSave}
            data-ocid="footer.save_button"
          >
            Save Footer Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
