import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

const PAGES = [
  { key: "home", label: "Home" },
  { key: "about", label: "About Us" },
  { key: "training", label: "Training" },
  { key: "centers", label: "Centers" },
  { key: "schemes", label: "Schemes" },
  { key: "loan", label: "Loan" },
  { key: "employment", label: "Employment" },
  { key: "rewards", label: "Rewards" },
  { key: "news", label: "News" },
  { key: "gallery", label: "Gallery" },
  { key: "downloads", label: "Downloads" },
  { key: "legal", label: "Legal Documents" },
  { key: "wishes", label: "Wishes" },
  { key: "ourteam", label: "Our Team" },
  { key: "ourpartners", label: "Our Partners" },
  { key: "franchise", label: "Franchise" },
  { key: "b2b", label: "B2B Plan" },
  { key: "internship", label: "Internship" },
  { key: "contact", label: "Contact" },
  { key: "faq", label: "FAQ" },
  { key: "terms", label: "Terms" },
  { key: "rules", label: "Rules" },
  { key: "complaint", label: "Complaint" },
];

interface PageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  pageContent: string;
  isActive: boolean;
}

const DEFAULT_PAGE_DATA: PageData = {
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  pageContent: "",
  isActive: true,
};

export default function AdminPageContent() {
  const { contentMap, saveContent } = useAppContext();
  const [selectedPage, setSelectedPage] = useState(PAGES[0].key);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pageKey = `page_${selectedPage}`;
  const existingData = (contentMap[pageKey] || DEFAULT_PAGE_DATA) as PageData;
  const [formData, setFormData] = useState<PageData>(existingData);

  const galleryImages = (contentMap.gallery || []) as Array<{
    id: string;
    url: string;
    type: string;
    title: string;
  }>;
  const photoGallery = galleryImages.filter((g) => g.type !== "video");

  function handlePageSelect(key: string) {
    setSelectedPage(key);
    setSaved(false);
    const data = (contentMap[`page_${key}`] || DEFAULT_PAGE_DATA) as PageData;
    setFormData({ ...DEFAULT_PAGE_DATA, ...data });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((p) => ({ ...p, heroImage: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent(pageKey, formData);
      setSaved(true);
      toast.success(
        `${PAGES.find((p) => p.key === selectedPage)?.label} page saved!`,
      );
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const currentPageLabel = PAGES.find((p) => p.key === selectedPage)?.label;

  return (
    <div
      className="flex gap-0 h-full"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* Left sidebar page list */}
      <aside className="w-52 shrink-0 bg-white border-r border-border overflow-y-auto">
        <div className="p-3 border-b bg-green-50">
          <h2 className="text-xs font-bold text-green-800 uppercase tracking-wide">
            Pages
          </h2>
        </div>
        {PAGES.map((page) => {
          const pd = (contentMap[`page_${page.key}`] ||
            {}) as Partial<PageData>;
          const isSet = pd.heroTitle || pd.heroSubtitle;
          return (
            <button
              type="button"
              key={page.key}
              onClick={() => handlePageSelect(page.key)}
              className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2 transition-colors border-b border-gray-50 ${
                selectedPage === page.key
                  ? "bg-green-700 text-white font-medium"
                  : "hover:bg-green-50 text-gray-700"
              }`}
              data-ocid={`pagecms.${page.key}.tab`}
            >
              <span className="flex-1">{page.label}</span>
              {isSet && (
                <CheckCircle2
                  size={12}
                  className={
                    selectedPage === page.key
                      ? "text-green-200"
                      : "text-green-500"
                  }
                />
              )}
            </button>
          );
        })}
      </aside>

      {/* Editor area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-xl text-gray-900">
                {currentPageLabel} Page
              </h1>
              <p className="text-sm text-gray-500">
                Edit hero section and content for this page
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  id="page-active"
                  checked={formData.isActive}
                  onCheckedChange={(v) =>
                    setFormData((p) => ({ ...p, isActive: v }))
                  }
                  data-ocid="pagecms.isactive.switch"
                />
                <Label htmlFor="page-active" className="text-sm">
                  {formData.isActive ? "Active" : "Hidden"}
                </Label>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-700 hover:bg-green-800"
                data-ocid="pagecms.save_button"
              >
                {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-green-900">
                Hero Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="lbl_1"
                >
                  Hero Title
                </label>
                <input
                  id="lbl_1"
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.heroTitle}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, heroTitle: e.target.value }))
                  }
                  placeholder={`e.g. Welcome to ${currentPageLabel}`}
                  data-ocid="pagecms.herotitle.input"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="lbl_2"
                >
                  Hero Subtitle
                </label>
                <input
                  id="lbl_2"
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.heroSubtitle}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, heroSubtitle: e.target.value }))
                  }
                  placeholder="Short description or tagline"
                  data-ocid="pagecms.herosubtitle.input"
                />
              </div>

              {/* Hero Image Upload */}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Hero Background Image
                </p>
                <div className="mt-2 space-y-3">
                  {formData.heroImage && (
                    <div className="relative inline-block">
                      <img
                        src={formData.heroImage}
                        alt="Hero"
                        className="h-32 w-auto rounded-lg object-cover border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, heroImage: "" }))
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 border border-dashed border-green-400 rounded-lg text-sm text-green-700 hover:bg-green-50 transition-colors"
                      data-ocid="pagecms.upload_button"
                    >
                      <Upload size={14} /> Upload Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {/* Gallery Picker */}
                  {photoGallery.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <ImageIcon size={11} /> Pick from gallery
                      </p>
                      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                        {photoGallery.map((img) => (
                          <button
                            type="button"
                            key={img.id}
                            onClick={() =>
                              setFormData((p) => ({ ...p, heroImage: img.url }))
                            }
                            className={`relative rounded overflow-hidden border-2 transition-all ${
                              formData.heroImage === img.url
                                ? "border-green-600 ring-2 ring-green-400"
                                : "border-transparent hover:border-green-300"
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-16 h-12 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page Content */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-green-900">
                Page Content / Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={8}
                value={formData.pageContent}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, pageContent: e.target.value }))
                }
                placeholder="Main content / description text for this page..."
                data-ocid="pagecms.content.textarea"
              />
              <p className="text-xs text-gray-400 mt-1">
                This text will display on the public page
              </p>
            </CardContent>
          </Card>

          {/* Status / Info */}
          <Card className="border-green-100 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Page Status
                  </p>
                  <p className="text-xs text-green-600 mt-0.5">
                    {formData.isActive
                      ? "This page is visible to the public"
                      : "This page is hidden from public"}
                  </p>
                </div>
                <Badge
                  className={
                    formData.isActive
                      ? "bg-green-700 text-white"
                      : "bg-gray-400 text-white"
                  }
                >
                  {formData.isActive ? "Active" : "Hidden"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="pb-6">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-700 hover:bg-green-800 h-11"
              data-ocid="pagecms.bottom.save_button"
            >
              {saving
                ? "Saving to server..."
                : saved
                  ? "✓ Changes Saved Successfully"
                  : "Save All Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import type React from "react";
