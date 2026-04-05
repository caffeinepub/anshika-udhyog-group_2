import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { generateId } from "../utils/auth";

interface GalleryItem {
  id: string;
  type: "photo" | "video";
  url: string;
  caption: string;
  category: string;
  isActive: boolean;
}

export default function AdminGallery() {
  const { contentMap, saveContent } = useAppContext();
  const gallery = (contentMap.gallery || []) as GalleryItem[];
  const [form, setForm] = useState<Partial<GalleryItem>>({
    type: "photo",
    isActive: true,
  });
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function handleSave() {
    const item = { id: editing?.id || generateId(), ...form } as GalleryItem;
    const updated = editing
      ? gallery.map((g) => (g.id === editing.id ? item : g))
      : [...gallery, item];
    await saveContent("gallery", updated);
    toast.success("Gallery updated!");
    setShowForm(false);
    setEditing(null);
    setForm({ type: "photo", isActive: true });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    await saveContent(
      "gallery",
      gallery.filter((g) => g.id !== id),
    );
    toast.success("Deleted!");
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((p) => ({ ...p, url: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Gallery Management</h1>
        <Button
          className="bg-green-700 gap-1"
          onClick={() => {
            setEditing(null);
            setForm({ type: "photo", isActive: true });
            setShowForm(true);
          }}
          data-ocid="gallery.primary_button"
        >
          <Plus size={16} /> Add Item
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.length === 0 ? (
          <p
            className="col-span-4 text-muted-foreground"
            data-ocid="gallery.empty_state"
          >
            No items.
          </p>
        ) : (
          gallery.map((item, idx) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden border"
              data-ocid={`gallery.item.${idx + 1}`}
            >
              {item.type === "video" ? (
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <Play size={24} className="text-gray-500" />
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full aspect-square object-cover"
                />
              )}
              <div className="p-2">
                <p className="text-xs font-medium truncate">{item.caption}</p>
                <Badge className="text-xs">{item.category}</Badge>
              </div>
              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-white"
                  onClick={() => {
                    setEditing(item);
                    setForm(item);
                    setShowForm(true);
                  }}
                  data-ocid={`gallery.edit_button.${idx + 1}`}
                >
                  <Edit size={10} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDelete(item.id)}
                  data-ocid={`gallery.delete_button.${idx + 1}`}
                >
                  <Trash2 size={10} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{editing ? "Edit" : "Add"} Gallery Item</CardTitle>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form.type || "photo"}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      type: e.target.value as "photo" | "video",
                    }))
                  }
                  data-ocid="gallery.type.select"
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
              </div>
              {form.type === "video" ? (
                <div>
                  <label className="text-sm font-medium">Video URL</label>
                  <input
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form.url || ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, url: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium">Photo</label>
                  {form.url && (
                    <img
                      src={form.url}
                      alt=""
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    data-ocid="gallery.upload_button"
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Caption</label>
                <input
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form.caption || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, caption: e.target.value }))
                  }
                  data-ocid="gallery.caption.input"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <input
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form.category || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  placeholder="Training, Events, etc."
                />
              </div>
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={handleSave}
                data-ocid="gallery.save_button"
              >
                Save
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

import type React from "react";
