import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Save, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

interface IDCardData {
  id: string;
  fullName: string;
  designation: string;
  memberId: string;
  organization: string;
  dob: string;
  mobile: string;
  address: string;
  validTill: string;
  memberPhoto: string;
  sealImage: string;
  signatureImage: string;
  selectedDesign: number;
  createdAt: string;
}

const DESIGNS = [
  {
    name: "Classic Green",
    desc: "Green header, white body",
    bgHeader: "#15803d",
    bgBody: "#fff",
    textHeader: "#fff",
    textBody: "#1a1a1a",
    border: "#15803d",
    accent: "#dcfce7",
  },
  {
    name: "Premium Gold",
    desc: "Navy bg, gold accents",
    bgHeader: "#1e3a5f",
    bgBody: "#0f2240",
    textHeader: "#ffd700",
    textBody: "#f0e6b2",
    border: "#ffd700",
    accent: "#ffd700",
  },
  {
    name: "Government Blue",
    desc: "Blue with tricolor strip",
    bgHeader: "#1a4b8c",
    bgBody: "#f0f6ff",
    textHeader: "#fff",
    textBody: "#1a2a4a",
    border: "#1a4b8c",
    accent: "#dbeafe",
  },
  {
    name: "Corporate White",
    desc: "Clean minimal, gray borders",
    bgHeader: "#f8fafc",
    bgBody: "#fff",
    textHeader: "#1a1a1a",
    textBody: "#374151",
    border: "#9ca3af",
    accent: "#f3f4f6",
  },
  {
    name: "Saffron Pride",
    desc: "Indian flag colors",
    bgHeader: "#ff9933",
    bgBody: "#fff",
    textHeader: "#fff",
    textBody: "#333",
    border: "#138808",
    accent: "#fff9f0",
  },
  {
    name: "Red Official",
    desc: "Deep red header, cream body",
    bgHeader: "#991b1b",
    bgBody: "#fefce8",
    textHeader: "#fff",
    textBody: "#3b1f1f",
    border: "#991b1b",
    accent: "#fef2f2",
  },
  {
    name: "Purple Modern",
    desc: "Purple gradient header",
    bgHeader: "#6d28d9",
    bgBody: "#faf5ff",
    textHeader: "#fff",
    textBody: "#2d1b69",
    border: "#7c3aed",
    accent: "#ede9fe",
  },
  {
    name: "Dark Executive",
    desc: "Charcoal with green accents",
    bgHeader: "#1f2937",
    bgBody: "#111827",
    textHeader: "#4ade80",
    textBody: "#d1fae5",
    border: "#4ade80",
    accent: "#064e3b",
  },
  {
    name: "Green Forest",
    desc: "Deep forest green, earthy",
    bgHeader: "#14532d",
    bgBody: "#f0fdf4",
    textHeader: "#bbf7d0",
    textBody: "#14532d",
    border: "#166534",
    accent: "#dcfce7",
  },
  {
    name: "Tri-Color",
    desc: "Indian tricolor patriotic",
    bgHeader: "#ff9933",
    bgBody: "#fff",
    textHeader: "#fff",
    textBody: "#000080",
    border: "#138808",
    accent: "#f0fff4",
  },
];

const DEFAULT_FORM: Omit<IDCardData, "id" | "createdAt"> = {
  fullName: "",
  designation: "",
  memberId: "",
  organization: "Anshika Udhyog Group",
  dob: "",
  mobile: "",
  address: "",
  validTill: "",
  memberPhoto: "",
  sealImage: "",
  signatureImage: "",
  selectedDesign: 0,
};

function generateBarcode(id: string) {
  // CSS barcode from string character codes
  return Array.from(id)
    .map((ch) => ch.charCodeAt(0))
    .map((code) => {
      const w = ((code % 5) + 1) * 2;
      const gap = (code % 3) + 1;
      return `${w}px ${gap}px`;
    })
    .slice(0, 16);
}

function IDCardPreview({
  data,
  design,
}: {
  data: Omit<IDCardData, "id" | "createdAt">;
  design: (typeof DESIGNS)[0];
}) {
  const barSegments = generateBarcode(data.memberId || "AUG0001");

  return (
    <div
      style={{
        width: "342px",
        height: "216px",
        backgroundColor: design.bgBody,
        border: `2px solid ${design.border}`,
        borderRadius: "8px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: design.bgHeader,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: `2px solid ${design.border}`,
        }}
      >
        <img
          src="/assets/generated/anshika-logo.dim_200x200.png"
          alt="Logo"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: design.textHeader,
              fontSize: "9px",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            {data.organization}
          </div>
          <div
            style={{ color: design.textHeader, fontSize: "7px", opacity: 0.8 }}
          >
            IDENTITY CARD
          </div>
        </div>
        {/* Tricolor strip for specific designs */}
        {(design.name === "Saffron Pride" || design.name === "Tri-Color") && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 6,
              height: 28,
            }}
          >
            <div style={{ flex: 1, backgroundColor: "#ff9933" }} />
            <div style={{ flex: 1, backgroundColor: "#fff" }} />
            <div style={{ flex: 1, backgroundColor: "#138808" }} />
          </div>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          height: "calc(100% - 46px - 24px)",
          padding: "8px 10px",
          gap: "8px",
        }}
      >
        {/* Photo */}
        <div style={{ flexShrink: 0 }}>
          {data.memberPhoto ? (
            <img
              src={data.memberPhoto}
              alt="Member"
              style={{
                width: 64,
                height: 72,
                objectFit: "cover",
                border: `2px solid ${design.border}`,
                borderRadius: "4px",
              }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 72,
                backgroundColor: design.accent,
                border: `2px dashed ${design.border}`,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                color: design.border,
                textAlign: "center",
              }}
            >
              PHOTO
            </div>
          )}
        </div>

        {/* Info */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "11px",
              color: design.textBody,
              lineHeight: 1.2,
            }}
          >
            {data.fullName || "FULL NAME"}
          </div>
          <div
            style={{
              fontSize: "9px",
              color: design.border,
              fontWeight: "bold",
            }}
          >
            {data.designation || "Designation"}
          </div>
          <div
            style={{ fontSize: "8px", color: design.textBody, opacity: 0.8 }}
          >
            ID: {data.memberId || "AUG-0001"}
          </div>
          {data.dob && (
            <div style={{ fontSize: "8px", color: design.textBody }}>
              DOB: {data.dob}
            </div>
          )}
          {data.mobile && (
            <div style={{ fontSize: "8px", color: design.textBody }}>
              Mob: {data.mobile}
            </div>
          )}
          {data.address && (
            <div
              style={{
                fontSize: "7px",
                color: design.textBody,
                opacity: 0.75,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
              }}
            >
              {data.address}
            </div>
          )}
          {data.validTill && (
            <div
              style={{
                fontSize: "7px",
                color: design.border,
                fontWeight: "bold",
              }}
            >
              Valid: {data.validTill}
            </div>
          )}
        </div>

        {/* Seal / Signature */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          {data.signatureImage && (
            <img
              src={data.signatureImage}
              alt="Sig"
              style={{ height: 20, width: 50, objectFit: "contain" }}
            />
          )}
          {data.sealImage ? (
            <img
              src={data.sealImage}
              alt="Seal"
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                width: 36,
                height: 36,
                border: `1.5px solid ${design.border}`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "6px",
                color: design.border,
                textAlign: "center",
                opacity: 0.5,
              }}
            >
              SEAL
            </div>
          )}
        </div>
      </div>

      {/* Barcode Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          backgroundColor: design.bgHeader,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1px",
          padding: "0 8px",
        }}
      >
        {/* Barcode bars */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "1px", flex: 1 }}
        >
          {barSegments.map((seg, barIdx) => {
            const [w] = seg.split(" ");
            const barKey = `b${w}x${barIdx}`;
            return (
              <div
                key={barKey}
                style={{
                  width: Number.parseInt(w),
                  height: 14,
                  backgroundColor: design.textHeader,
                  opacity: barIdx % 2 === 0 ? 1 : 0.5,
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
        <span
          style={{
            fontSize: "7px",
            color: design.textHeader,
            marginLeft: 4,
            whiteSpace: "nowrap",
          }}
        >
          {data.memberId || "AUG-0001"}
        </span>
      </div>
    </div>
  );
}

export default function AdminIDCards() {
  const { contentMap, saveContent } = useAppContext();
  const [form, setForm] =
    useState<Omit<IDCardData, "id" | "createdAt">>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const sealRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  const savedCards = (contentMap.id_cards || []) as IDCardData[];
  const currentDesign = DESIGNS[form.selectedDesign];

  function handleFileUpload(
    field: "memberPhoto" | "sealImage" | "signatureImage",
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((p) => ({ ...p, [field]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  function generateMemberId() {
    const prefix = "AUG";
    const num = String(Date.now()).slice(-6);
    setForm((p) => ({ ...p, memberId: `${prefix}-${num}` }));
  }

  async function handleSave() {
    if (!form.fullName || !form.memberId) {
      toast.error("Full Name and Member ID are required");
      return;
    }
    setSaving(true);
    const card: IDCardData = {
      ...form,
      id: `card-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    try {
      await saveContent("id_cards", [...savedCards, card]);
      toast.success("ID Card saved!");
      setForm(DEFAULT_FORM);
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  async function deleteCard(id: string) {
    const updated = savedCards.filter((c) => c.id !== id);
    await saveContent("id_cards", updated);
    toast.success("Card deleted.");
  }

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #id-card-print, #id-card-print * { visibility: visible !important; }
          #id-card-print {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 9999;
          }
          @page { size: A6 landscape; margin: 10mm; }
        }
      `}</style>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-gray-900">
              ID Card Generator
            </h1>
            <p className="text-sm text-gray-500">
              Create professional ID cards with 10 designs
            </p>
          </div>
          <Badge className="bg-green-700 text-white">
            {savedCards.length} Cards Saved
          </Badge>
        </div>

        {/* Design Selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Design Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {DESIGNS.map((d, idx) => (
                <button
                  type="button"
                  key={d.name}
                  onClick={() =>
                    setForm((p) => ({ ...p, selectedDesign: idx }))
                  }
                  className={`rounded-lg border-2 p-1.5 transition-all text-left ${
                    form.selectedDesign === idx
                      ? "border-green-600 ring-2 ring-green-300"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  data-ocid={`idcard.design.${idx + 1}.toggle`}
                >
                  <div
                    className="w-full h-10 rounded mb-1"
                    style={{
                      background: `linear-gradient(135deg, ${d.bgHeader}, ${d.bgBody})`,
                    }}
                  />
                  <p className="text-xs font-medium text-gray-700 truncate">
                    {d.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{d.desc}</p>
                  {form.selectedDesign === idx && (
                    <span className="text-xs text-green-700 font-bold">
                      ✓ Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="lbl_1"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fullName: e.target.value }))
                    }
                    placeholder="Smt. Anshika Devi"
                    data-ocid="idcard.fullname.input"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_2"
                  >
                    Designation
                  </label>
                  <input
                    id="lbl_2"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.designation}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, designation: e.target.value }))
                    }
                    placeholder="Center Coordinator"
                    data-ocid="idcard.designation.input"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    Member ID *
                  </p>
                  <div className="flex gap-1 mt-0.5">
                    <input
                      className="flex-1 border rounded-lg px-2.5 py-1.5 text-sm"
                      value={form.memberId}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, memberId: e.target.value }))
                      }
                      placeholder="AUG-001"
                      data-ocid="idcard.memberid.input"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={generateMemberId}
                      className="px-2"
                    >
                      Auto
                    </Button>
                  </div>
                </div>
                <div>
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_3"
                  >
                    Organization
                  </label>
                  <input
                    id="lbl_3"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.organization}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, organization: e.target.value }))
                    }
                    data-ocid="idcard.organization.input"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_4"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="lbl_4"
                    type="date"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.dob}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, dob: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_5"
                  >
                    Mobile
                  </label>
                  <input
                    id="lbl_5"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mobile: e.target.value }))
                    }
                    placeholder="+91 98765 43210"
                    data-ocid="idcard.mobile.input"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_6"
                  >
                    Address
                  </label>
                  <input
                    id="lbl_6"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="Village, District, State"
                    data-ocid="idcard.address.input"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-medium text-gray-700"
                    htmlFor="lbl_7"
                  >
                    Valid Till
                  </label>
                  <input
                    id="lbl_7"
                    type="date"
                    className="w-full mt-0.5 border rounded-lg px-2.5 py-1.5 text-sm"
                    value={form.validTill}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, validTill: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Photo uploads */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    Member Photo
                  </p>
                  <div className="mt-1">
                    {form.memberPhoto ? (
                      <div className="relative inline-block">
                        <img
                          src={form.memberPhoto}
                          alt="Member portrait"
                          className="w-14 h-16 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, memberPhoto: "" }))
                          }
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => photoRef.current?.click()}
                        className="w-14 h-16 border-2 border-dashed border-green-400 rounded flex items-center justify-center text-green-600 hover:bg-green-50"
                        data-ocid="idcard.photo.upload_button"
                      >
                        <Upload size={14} />
                      </button>
                    )}
                    <input
                      ref={photoRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("memberPhoto", e)}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    Official Seal
                  </p>
                  <div className="mt-1">
                    {form.sealImage ? (
                      <div className="relative inline-block">
                        <img
                          src={form.sealImage}
                          alt="Seal"
                          className="w-14 h-14 object-contain rounded border"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, sealImage: "" }))
                          }
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => sealRef.current?.click()}
                        className="w-14 h-14 border-2 border-dashed border-green-400 rounded flex items-center justify-center text-green-600 hover:bg-green-50"
                        data-ocid="idcard.seal.upload_button"
                      >
                        <Upload size={14} />
                      </button>
                    )}
                    <input
                      ref={sealRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("sealImage", e)}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">Signature</p>
                  <div className="mt-1">
                    {form.signatureImage ? (
                      <div className="relative inline-block">
                        <img
                          src={form.signatureImage}
                          alt="Sig"
                          className="w-16 h-10 object-contain rounded border"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, signatureImage: "" }))
                          }
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => sigRef.current?.click()}
                        className="w-16 h-10 border-2 border-dashed border-green-400 rounded flex items-center justify-center text-green-600 hover:bg-green-50"
                        data-ocid="idcard.signature.upload_button"
                      >
                        <Upload size={14} />
                      </button>
                    )}
                    <input
                      ref={sigRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("signatureImage", e)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-green-700 hover:bg-green-800"
                  data-ocid="idcard.save_button"
                >
                  <Save size={14} className="mr-1.5" />
                  {saving ? "Saving..." : "Save Card"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  data-ocid="idcard.print.button"
                >
                  <Printer size={14} className="mr-1.5" /> Print
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div id="id-card-print" className="flex justify-center">
                  <IDCardPreview data={form} design={currentDesign} />
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Design: {currentDesign.name} — Standard ID card size
                  (85.6×54mm)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Saved Cards */}
        {savedCards.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Saved ID Cards ({savedCards.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedCards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                    data-ocid={`idcard.item.${idx + 1}`}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {card.fullName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {card.designation} · ID: {card.memberId} · Design:{" "}
                        {DESIGNS[card.selectedDesign]?.name}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {new Date(card.createdAt).toLocaleDateString("en-IN")}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setForm({
                          fullName: card.fullName,
                          designation: card.designation,
                          memberId: card.memberId,
                          organization: card.organization,
                          dob: card.dob,
                          mobile: card.mobile,
                          address: card.address,
                          validTill: card.validTill,
                          memberPhoto: card.memberPhoto,
                          sealImage: card.sealImage,
                          signatureImage: card.signatureImage,
                          selectedDesign: card.selectedDesign,
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      data-ocid={`idcard.edit_button.${idx + 1}`}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => deleteCard(card.id)}
                      data-ocid={`idcard.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {savedCards.length === 0 && (
          <div
            className="text-center py-8 text-gray-400"
            data-ocid="idcard.empty_state"
          >
            No ID cards saved yet. Fill the form above and click Save Card.
          </div>
        )}
      </div>
    </>
  );
}

import type React from "react";
