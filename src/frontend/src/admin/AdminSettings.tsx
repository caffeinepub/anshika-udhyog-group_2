import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

export default function AdminSettings() {
  const { settings, saveContent } = useAppContext();
  const [form, setForm] = useState({ ...settings });
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(settings.logoUrl);

  async function handleSave() {
    setLoading(true);
    try {
      await saveContent("settings", { ...form, logoUrl: logoPreview });
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  const inputCls = "w-full border rounded px-3 py-2 text-sm";

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-xl">Company Settings</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-6">
            <div>
              <img
                src={
                  logoPreview ||
                  "/assets/generated/anshika-logo.dim_200x200.png"
                }
                alt="Logo"
                className="w-20 h-20 rounded-full object-cover border-2 border-green-200"
              />
            </div>
            <div className="flex-1">
              <label
                className="text-sm font-medium block mb-1"
                htmlFor="settings_field_1"
              >
                Organization Logo
              </label>
              <input
                id="settings_field_1"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                data-ocid="settings.upload_button"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 200x200px PNG/JPG
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="settings_field_2">
                Organization Name
              </label>
              <input
                id="settings_field_2"
                className={inputCls}
                value={form.orgName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, orgName: e.target.value }))
                }
                data-ocid="settings.name.input"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="settings_field_3">
                Tagline
              </label>
              <input
                id="settings_field_3"
                className={inputCls}
                value={form.tagline}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tagline: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="settings_field_4">
                Subtitle
              </label>
              <input
                id="settings_field_4"
                className={inputCls}
                value={form.subtitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subtitle: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="settings_field_5">
                WhatsApp Number
              </label>
              <input
                id="settings_field_5"
                className={inputCls}
                value={form.whatsappNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, whatsappNumber: e.target.value }))
                }
                placeholder="918349600835"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="settings_field_6">
                Phone
              </label>
              <input
                id="settings_field_6"
                className={inputCls}
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="settings_field_7">
                Email
              </label>
              <input
                id="settings_field_7"
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="settings_field_8">
                Address
              </label>
              <textarea
                id="settings_field_8"
                className={inputCls}
                rows={2}
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="settings_field_9">
                Footer Text
              </label>
              <input
                id="settings_field_9"
                className={inputCls}
                value={form.footerText}
                onChange={(e) =>
                  setForm((p) => ({ ...p, footerText: e.target.value }))
                }
              />
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={handleSave}
            className="bg-green-700 hover:bg-green-800"
            data-ocid="settings.save_button"
          >
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import type React from "react";
