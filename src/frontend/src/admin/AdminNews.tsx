import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Image, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { generateId } from "../utils/auth";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  imageUrl: string;
  isPublished: boolean;
}

export default function AdminNews() {
  const { contentMap, saveContent } = useAppContext();
  const news = (contentMap.news || []) as NewsItem[];
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<Partial<NewsItem>>({});
  const [showForm, setShowForm] = useState(false);

  async function handleSave() {
    const updated = editing
      ? news.map((n) => (n.id === editing.id ? { ...n, ...form } : n))
      : [...news, { id: generateId(), isPublished: true, ...form } as NewsItem];
    await saveContent("news", updated);
    toast.success("News saved!");
    setShowForm(false);
    setEditing(null);
    setForm({});
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this news?")) return;
    await saveContent(
      "news",
      news.filter((n) => n.id !== id),
    );
    toast.success("Deleted!");
  }

  async function togglePublish(item: NewsItem) {
    await saveContent(
      "news",
      news.map((n) =>
        n.id === item.id ? { ...n, isPublished: !n.isPublished } : n,
      ),
    );
    toast.success("Updated!");
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((p) => ({ ...p, imageUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">News Management</h1>
        <Button
          className="bg-green-700 hover:bg-green-800 gap-1"
          onClick={() => {
            setEditing(null);
            setForm({ isPublished: true });
            setShowForm(true);
          }}
          data-ocid="news.primary_button"
        >
          <Plus size={16} /> Add News
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {news.length === 0 ? (
          <p className="text-muted-foreground" data-ocid="news.empty_state">
            No news yet. Add some!
          </p>
        ) : (
          news.map((item, idx) => (
            <Card key={item.id} data-ocid={`news.item.${idx + 1}`}>
              <CardContent className="p-4 flex gap-4 items-start">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-gray-500">
                    {item.date} &bull; {item.category}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge
                    className={
                      item.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {item.isPublished ? "Published" : "Draft"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(item);
                      setForm(item);
                      setShowForm(true);
                    }}
                    data-ocid={`news.edit_button.${idx + 1}`}
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublish(item)}
                  >
                    {item.isPublished ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    data-ocid={`news.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editing ? "Edit" : "Add"} News</CardTitle>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  value={form.title || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="news.title.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border rounded px-3 py-2 text-sm"
                    value={form.date || ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
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
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Summary</label>
                <textarea
                  className="w-full mt-1 border rounded px-3 py-2 text-sm"
                  rows={3}
                  value={form.summary || ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, summary: e.target.value }))
                  }
                  data-ocid="news.summary.textarea"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image</label>
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  data-ocid="news.upload_button"
                />
              </div>
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={handleSave}
                data-ocid="news.save_button"
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
