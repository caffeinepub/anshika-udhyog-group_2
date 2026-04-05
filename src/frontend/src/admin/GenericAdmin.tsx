import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
// Generic admin content manager for simple list-based content
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { generateId } from "../utils/auth";

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image" | "select" | "date" | "number";
  options?: string[];
}

interface GenericAdminProps {
  title: string;
  contentKey: string;
  fields: Field[];
  itemLabel?: string;
}

export default function GenericAdmin({
  title,
  contentKey,
  fields,
  itemLabel = "Item",
}: GenericAdminProps) {
  const { contentMap, saveContent } = useAppContext();
  const items = (contentMap[contentKey] || []) as Record<string, unknown>[];
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function handleSave() {
    const item = { id: (editing?.id as string) || generateId(), ...form };
    const updated = editing
      ? items.map((i) =>
          (i.id as string) === (editing.id as string) ? item : i,
        )
      : [...items, item];
    await saveContent(contentKey, updated);
    toast.success(`${itemLabel} saved!`);
    setShowForm(false);
    setEditing(null);
    setForm({});
  }

  async function handleDelete(id: string) {
    if (!confirm(`Delete this ${itemLabel}?`)) return;
    await saveContent(
      contentKey,
      items.filter((i) => (i.id as string) !== id),
    );
    toast.success("Deleted!");
  }

  function handleImageUpload(
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((p) => ({ ...p, [key]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{title}</h1>
        <Button
          className="bg-green-700 gap-1"
          onClick={() => {
            setEditing(null);
            setForm({});
            setShowForm(true);
          }}
          data-ocid={`${contentKey}.primary_button`}
        >
          <Plus size={16} /> Add {itemLabel}
        </Button>
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p
            className="text-muted-foreground"
            data-ocid={`${contentKey}.empty_state`}
          >
            No items. Add some!
          </p>
        ) : (
          items.map((item, idx) => (
            <Card
              key={String(item.id)}
              data-ocid={`${contentKey}.item.${idx + 1}`}
            >
              <CardContent className="p-4 flex items-start gap-3">
                {(item.imageUrl as string) && (
                  <img
                    src={String(item.imageUrl)}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                {(item.photo as string) && (
                  <img
                    src={String(item.photo)}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  {fields.slice(0, 3).map((f) => (
                    <div key={f.key} className="text-sm">
                      <span className="font-medium">{f.label}: </span>
                      <span className="text-gray-600">
                        {String(item[f.key] || "-")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(item);
                      setForm(item);
                      setShowForm(true);
                    }}
                    data-ocid={`${contentKey}.edit_button.${idx + 1}`}
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(String(item.id))}
                    data-ocid={`${contentKey}.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editing ? "Edit" : "Add"} {itemLabel}
              </CardTitle>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full mt-1 border rounded px-3 py-2 text-sm"
                      rows={3}
                      value={String(form[field.key] || "")}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [field.key]: e.target.value }))
                      }
                    />
                  ) : field.type === "image" ? (
                    <div>
                      {(form[field.key] as string) && (
                        <img
                          src={String(form[field.key])}
                          alt=""
                          className="w-full h-28 object-cover rounded mb-2"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(field.key, e)}
                        data-ocid={`${contentKey}.upload_button`}
                      />
                    </div>
                  ) : field.type === "select" ? (
                    <select
                      className="w-full mt-1 border rounded px-3 py-2 text-sm"
                      value={String(form[field.key] || "")}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [field.key]: e.target.value }))
                      }
                    >
                      <option value="">Select...</option>
                      {(field.options || []).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      className="w-full mt-1 border rounded px-3 py-2 text-sm"
                      value={String(form[field.key] || "")}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [field.key]: e.target.value }))
                      }
                    />
                  )}
                </div>
              ))}
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={handleSave}
                data-ocid={`${contentKey}.save_button`}
              >
                Save {itemLabel}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
