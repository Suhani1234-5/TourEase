import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import {
  Lock,
  Shield,
  FileText,
  CreditCard,
  Tag,
  File,
  Plus,
  Trash2,
  X,
  RefreshCw,
  Calendar,
  Building2,
  StickyNote,
} from "lucide-react";

const DOC_TYPES = [
  {
    value: "passport",
    label: "Passport",
    icon: CreditCard,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  },
  {
    value: "visa",
    label: "Visa",
    icon: FileText,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
  },
  {
    value: "insurance",
    label: "Insurance",
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  {
    value: "ticket",
    label: "Ticket",
    icon: Tag,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
  {
    value: "other",
    label: "Other",
    icon: File,
    color: "bg-slate-50 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300",
  },
];

function getDocType(typeValue) {
  return DOC_TYPES.find((t) => t.value === typeValue) || DOC_TYPES[4];
}

function isExpired(expiryDate) {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
}

function isExpiringSoon(expiryDate) {
  if (!expiryDate) return false;
  const daysLeft = (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
  return daysLeft > 0 && daysLeft <= 90;
}

export default function TravelLocker() {
  const { showToast } = useToast();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formType, setFormType] = useState("passport");
  const [formDocNumber, setFormDocNumber] = useState("");
  const [formExpiry, setFormExpiry] = useState("");
  const [formIssuer, setFormIssuer] = useState("");
  const [formNotes, setFormNotes] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await api.getLockerDocuments();
      if (res.success) {
        setDocuments(res.documents || []);
      }
    } catch (err) {
      showToast(err.message || "Failed to load documents.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormType("passport");
    setFormDocNumber("");
    setFormExpiry("");
    setFormIssuer("");
    setFormNotes("");
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!formDocNumber.trim()) {
      showToast("Please enter the document number.", "error");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await api.addLockerDocument({
        type: formType,
        documentNumber: formDocNumber,
        expiryDate: formExpiry || undefined,
        issuingAuthority: formIssuer || undefined,
        notes: formNotes || undefined,
      });
      if (res.success) {
        showToast("Document saved to your locker!", "success");
        setDocuments((prev) => [res.document, ...prev]);
        resetForm();
        setShowModal(false);
      }
    } catch (err) {
      showToast(err.message || "Failed to save document.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm("Remove this document from your Travel Locker?")) return;
    try {
      const res = await api.deleteLockerDocument(id);
      if (res.success) {
        showToast("Document removed.", "success");
        setDocuments((prev) => prev.filter((d) => d._id !== id));
      }
    } catch (err) {
      showToast(err.message || "Failed to remove document.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-teal-600 to-cyan-500 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Travel Locker
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Securely store passport, visa, insurance, and other travel document details.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="self-start sm:self-auto flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Document
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-teal-500 animate-spin" />
            <p className="mt-4 text-slate-500">Loading your documents...</p>
          </div>

        /* Empty state */
        ) : documents.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-16 text-center shadow-xs">
            <div className="w-20 h-20 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Lock className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Your locker is empty</h3>
            <p className="text-slate-400 dark:text-slate-500 mt-2 max-w-md mx-auto">
              Add your passport, visa details, insurance policy IDs, and more for quick access while traveling.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Your First Document
            </button>
          </div>

        /* Documents grid */
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {documents.map((doc) => {
              const docType = getDocType(doc.type);
              const IconComponent = docType.icon;
              const expired = isExpired(doc.expiryDate);
              const expiring = isExpiringSoon(doc.expiryDate);

              return (
                <div
                  key={doc._id}
                  className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  {/* Delete button — visible on hover */}
                  <button
                    onClick={() => handleDeleteDocument(doc._id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 cursor-pointer"
                    title="Remove document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Type icon + badge row */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${docType.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${docType.badge}`}>
                      {docType.label}
                    </span>
                    {expired && (
                      <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                        Expired
                      </span>
                    )}
                    {!expired && expiring && (
                      <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                        Expiring soon
                      </span>
                    )}
                  </div>

                  {/* Document number */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Document No.</span>
                    <p className="mt-1 font-mono font-bold text-slate-800 dark:text-slate-200 text-base tracking-wide">
                      {doc.documentNumber}
                    </p>
                  </div>

                  {/* Expiry date */}
                  {doc.expiryDate && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Expires:{" "}
                        <span
                          className={`font-semibold ${
                            expired
                              ? "text-red-500"
                              : expiring
                              ? "text-amber-500"
                              : "text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {new Date(doc.expiryDate).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Issuing authority */}
                  {doc.issuingAuthority && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{doc.issuingAuthority}</span>
                    </div>
                  )}

                  {/* Notes */}
                  {doc.notes && (
                    <div className="flex items-start gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <StickyNote className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{doc.notes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ADD DOCUMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Lock className="w-6 h-6 text-teal-500" />
                Add Document
              </h3>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Document Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-sm transition font-medium"
                >
                  {DOC_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Document Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A1234567"
                  value={formDocNumber}
                  onChange={(e) => setFormDocNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-sm font-mono transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formExpiry}
                    onChange={(e) => setFormExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Issuing Country / Provider</label>
                  <input
                    type="text"
                    placeholder="e.g. India, LIC"
                    value={formIssuer}
                    onChange={(e) => setFormIssuer(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any additional details..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-sm transition resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-5 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold text-sm transition shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
