import React, { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import { useToast } from "../context/ToastContext";
import { 
  Users, 
  PlusCircle, 
  Trash2, 
  DollarSign, 
  Calendar, 
  FileSpreadsheet, 
  Printer, 
  CheckCircle, 
  Tag, 
  ArrowLeftRight, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  X,
  RefreshCw,
  FolderPlus,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

const CATEGORIES = [
  { name: "Food", color: "bg-emerald-500", text: "text-emerald-500", iconColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" },
  { name: "Transit", color: "bg-indigo-500", text: "text-indigo-500", iconColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400" },
  { name: "Lodging", color: "bg-amber-500", text: "text-amber-500", iconColor: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" },
  { name: "Activities", color: "bg-pink-500", text: "text-pink-500", iconColor: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400" },
  { name: "Other", color: "bg-slate-500", text: "text-slate-500", iconColor: "bg-slate-50 text-slate-600 dark:bg-slate-950/40 dark:text-slate-400" }
];

// ─── Settlement Confirmation Modal ───────────────────────────────────────────
function SettlementConfirmModal({ settlement, onConfirm, onCancel, isSubmitting }) {
  if (!settlement) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md bg-gray-900 border border-slate-700/60 rounded-2xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Confirm Settlement</h3>
              <p className="text-xs text-slate-400 mt-0.5">Mark this transaction as completed</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-center flex-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">From</p>
              <p className="text-sm font-extrabold text-slate-100 truncate">{settlement.from}</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-center flex-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">To</p>
              <p className="text-sm font-extrabold text-slate-100 truncate">{settlement.to}</p>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-3 text-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">Amount</p>
            <p className="text-2xl font-black text-emerald-400">${settlement.amount.toFixed(2)}</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          This will record a counter-expense to balance the debts between these two members.
        </p>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Settling...</>
            ) : (
              <><CheckCircle className="w-4 h-4" /> Confirm Settlement</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Generic Confirm Modal (delete actions) ───────────────────────────────────
function GenericConfirmModal({ isOpen, title, message, confirmLabel = "Delete", onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm bg-gray-900 border border-slate-700/60 rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-800/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold text-sm transition cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SplitExpense() {
  const { showToast } = useToast();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview, expenses, settle

  // Creation forms state
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState(["", ""]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Expense form state
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const [expensePayer, setExpensePayer] = useState("");
  const [expenseSplits, setExpenseSplits] = useState([]);
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmittingExpense, setIsSubmittingExpense] = useState(false);

  // Settlement modal state
  const [settlementModal, setSettlementModal] = useState(null); // { from, to, amount }
  const [isSettling, setIsSettling] = useState(false);
  const [settledItems, setSettledItems] = useState(new Set()); // key: "from->to->amount"

  // Generic confirm modal state
  const [confirmModal, setConfirmModal] = useState(null); // { title, message, confirmLabel, onConfirm }

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await api.getExpenseGroups();
      if (res.success) {
        setGroups(res.groups || []);
      }
    } catch (err) {
      showToast(err.message || "Failed to load expense groups.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGroupSelect = async (groupId) => {
    try {
      setLoading(true);
      const res = await api.getExpenseGroup(groupId);
      if (res.success) {
        setSelectedGroup(res.group);
        // Pre-fill payer and default splits
        if (res.group.members.length > 0) {
          setExpensePayer(res.group.members[0]);
          setExpenseSplits(res.group.members);
        }
        setActiveTab("overview");
      }
    } catch (err) {
      showToast(err.message || "Failed to load group details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      showToast("Please enter a group name.", "error");
      return;
    }

    const filteredMembers = newGroupMembers
      .map(m => m.trim())
      .filter(m => m.length > 0);

    if (filteredMembers.length < 2) {
      showToast("Please add at least 2 members.", "error");
      return;
    }

    try {
      const res = await api.createExpenseGroup({
        name: newGroupName,
        members: filteredMembers
      });

      if (res.success) {
        showToast("Expense group created successfully!", "success");
        setGroups(prev => [res.group, ...prev]);
        setNewGroupName("");
        setNewGroupMembers(["", ""]);
        setShowCreateModal(false);
        handleGroupSelect(res.group._id);
      }
    } catch (err) {
      showToast(err.message || "Error creating group.", "error");
    }
  };

  const handleDeleteGroup = (groupId, e) => {
    e.stopPropagation();
    setConfirmModal({
      title: "Delete Expense Group",
      message: "Are you sure you want to delete this expense group? All historical records will be permanently lost.",
      confirmLabel: "Delete Group",
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const res = await api.deleteExpenseGroup(groupId);
          if (res.success) {
            showToast("Group deleted.", "success");
            setGroups(prev => prev.filter(g => g._id !== groupId));
            if (selectedGroup && selectedGroup._id === groupId) {
              setSelectedGroup(null);
            }
          }
        } catch (err) {
          showToast(err.message || "Failed to delete group.", "error");
        }
      }
    });
  };

  const handleAddMemberInput = () => {
    setNewGroupMembers(prev => [...prev, ""]);
  };

  const handleRemoveMemberInput = (index) => {
    if (newGroupMembers.length <= 2) return;
    setNewGroupMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleMemberNameChange = (index, value) => {
    setNewGroupMembers(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseDesc.trim()) return showToast("Enter an expense description.", "error");
    if (!expenseAmount || Number(expenseAmount) <= 0) return showToast("Enter a valid amount.", "error");
    if (!expensePayer) return showToast("Select who paid.", "error");
    if (expenseSplits.length === 0) return showToast("Select at least one participant.", "error");

    try {
      setIsSubmittingExpense(true);
      const res = await api.addExpense(selectedGroup._id, {
        description: expenseDesc,
        amount: Number(expenseAmount),
        paidBy: expensePayer,
        category: expenseCategory,
        splitBetween: expenseSplits,
        date: expenseDate
      });

      if (res.success) {
        showToast("Expense added!", "success");
        setSelectedGroup(res.group);
        // Reset expense input fields but keep date/payer defaults
        setExpenseDesc("");
        setExpenseAmount("");
        // Keep active splits as all members
        setExpenseSplits(res.group.members);
      }
    } catch (err) {
      showToast(err.message || "Failed to add expense.", "error");
    } finally {
      setIsSubmittingExpense(false);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    setConfirmModal({
      title: "Delete Expense",
      message: "This expense will be permanently removed from the group records.",
      confirmLabel: "Delete Expense",
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const res = await api.deleteExpense(selectedGroup._id, expenseId);
          if (res.success) {
            showToast("Expense removed.", "success");
            setSelectedGroup(res.group);
          }
        } catch (err) {
          showToast(err.message || "Failed to delete expense.", "error");
        }
      }
    });
  };

  // Settlement modal handlers
  const handleSettleClick = (step) => {
    const key = `${step.from}->${step.to}->${step.amount.toFixed(2)}`;
    if (settledItems.has(key)) return;
    setSettlementModal(step);
  };

  const handleSettleConfirm = async () => {
    if (!settlementModal) return;
    setIsSettling(true);
    const step = settlementModal;
    try {
      const res = await api.addExpense(selectedGroup._id, {
        description: `Settle: ${step.from} ➔ ${step.to}`,
        amount: step.amount,
        paidBy: step.from,
        category: "Other",
        splitBetween: [step.to],
        date: new Date().toISOString().split("T")[0]
      });
      if (res.success) {
        const key = `${step.from}->${step.to}->${step.amount.toFixed(2)}`;
        setSettledItems(prev => new Set([...prev, key]));
        setSelectedGroup(res.group);
        setSettlementModal(null);
        showToast(`✅ Settlement confirmed! ${step.from} paid ${step.to} $${step.amount.toFixed(2)}`, "success");
      }
    } catch (err) {
      showToast(err.message || "Failed to settle.", "error");
    } finally {
      setIsSettling(false);
    }
  };

  const toggleSplitParticipant = (member) => {
    setExpenseSplits(prev =>
      prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
    );
  };

  // Calculations for Expense breakdown and Debts
  const calculateBalances = () => {
    if (!selectedGroup) return { totalSpent: 0, memberBalances: {}, categoryTotals: {} };

    const memberBalances = {};
    const categoryTotals = {};
    let totalSpent = 0;

    selectedGroup.members.forEach(m => {
      memberBalances[m] = 0;
    });

    CATEGORIES.forEach(c => {
      categoryTotals[c.name] = 0;
    });

    selectedGroup.expenses.forEach(exp => {
      const amt = exp.amount;
      const payer = exp.paidBy;
      const participants = exp.splitBetween;
      const category = exp.category || "Other";

      totalSpent += amt;
      categoryTotals[category] = (categoryTotals[category] || 0) + amt;

      // Add full paid amount to payer credit balance
      memberBalances[payer] = (memberBalances[payer] || 0) + amt;

      // Deduct equal share from each participant
      const share = amt / participants.length;
      participants.forEach(p => {
        memberBalances[p] = (memberBalances[p] || 0) - share;
      });
    });

    return { totalSpent, memberBalances, categoryTotals };
  };

  const { totalSpent, memberBalances, categoryTotals } = calculateBalances();

  // Greedy debt settlement algorithm
  const generateSettlementPlan = () => {
    if (!selectedGroup) return [];

    const debts = [];
    const balances = { ...memberBalances };

    // Separate members into creditors (> 0) and debtors (< 0)
    const creditors = [];
    const debtors = [];

    Object.keys(balances).forEach(member => {
      const bal = balances[member];
      if (bal > 0.01) {
        creditors.push({ name: member, balance: bal });
      } else if (bal < -0.01) {
        debtors.push({ name: member, balance: Math.abs(bal) });
      }
    });

    // Sort descending by outstanding amount
    creditors.sort((a, b) => b.balance - a.balance);
    debtors.sort((a, b) => b.balance - a.balance);

    let i = 0; // debtor index
    let j = 0; // creditor index

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const amountToSettle = Math.min(debtor.balance, creditor.balance);

      debts.push({
        from: debtor.name,
        to: creditor.name,
        amount: amountToSettle
      });

      debtor.balance -= amountToSettle;
      creditor.balance -= amountToSettle;

      if (debtor.balance < 0.01) i++;
      if (creditor.balance < 0.01) j++;
    }

    return debts;
  };

  const settlementPlan = generateSettlementPlan();

  // Export group expenses as CSV
  const handleExportCSV = () => {
    if (!selectedGroup || selectedGroup.expenses.length === 0) {
      showToast("No expenses to export.", "error");
      return;
    }

    const headers = ["Date", "Description", "Amount", "Paid By", "Category", "Shared By"];
    const rows = selectedGroup.expenses.map(exp => [
      new Date(exp.date).toLocaleDateString(),
      exp.description.replace(/"/g, '""'),
      exp.amount,
      exp.paidBy,
      exp.category,
      exp.splitBetween.join(";")
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(val => `"${val}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedGroup.name.replace(/\s+/g, "_")}_expenses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger web print view
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Dynamic print-only style overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          nav, footer, button, .no-print {
            display: none !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: transparent !important;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 no-print">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-teal-600 to-cyan-500 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Split & Expense Tracker
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage shared travel expenses, split bills equally, and settle balances instantly.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="self-start md:self-auto flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FolderPlus className="w-5 h-5" />
            Create Trip Group
          </button>
        </div>

        {loading && groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-teal-500 animate-spin" />
            <p className="mt-4 text-slate-500">Loading your travel groups...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Groups List */}
            <div className="lg:col-span-4 space-y-6 no-print">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                  Your Trip Groups
                </h2>
                {groups.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-slate-400 dark:text-slate-500 text-sm">No expense groups found.</p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-3 text-sm text-teal-600 dark:text-cyan-400 font-semibold hover:underline"
                    >
                      Create one now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {groups.map(group => {
                      const isActive = selectedGroup && selectedGroup._id === group._id;
                      return (
                        <div
                          key={group._id}
                          onClick={() => handleGroupSelect(group._id)}
                          className={`group/item flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                            isActive
                              ? "bg-teal-50/70 border-teal-200 dark:bg-teal-950/20 dark:border-teal-900/60 shadow-xs"
                              : "bg-slate-50 hover:bg-slate-100/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-transparent"
                          }`}
                        >
                          <div className="truncate pr-2">
                            <h3 className={`font-semibold truncate ${isActive ? "text-teal-700 dark:text-cyan-300" : "text-slate-700 dark:text-slate-300"}`}>
                              {group.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {group.members.length} members
                              </span>
                              <span className="text-xs text-slate-300 dark:text-slate-700">•</span>
                              <span className="text-xs text-slate-400">
                                {group.expenses?.length || 0} expenses
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleDeleteGroup(group._id, e)}
                            className="opacity-0 group-hover/item:opacity-100 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg text-slate-400 hover:text-red-500 transition-all duration-200"
                            title="Delete Group"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Active Group Details */}
            <div className="lg:col-span-8 print-full-width">
              {!selectedGroup ? (
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xs no-print">
                  <div className="w-16 h-16 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ArrowLeftRight className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Select a Trip Group</h3>
                  <p className="text-slate-400 dark:text-slate-500 mt-2 max-w-md mx-auto">
                    Select a travel group from the sidebar to start tracking expenses, splitting bills, and settling up, or create a brand new group.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 print-full-width">
                  
                  {/* Group Meta Header */}
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-cyan-400">Current Trip</span>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedGroup.name}</h2>
                      <p className="text-sm text-slate-400 mt-1">
                        Members: <span className="text-slate-600 dark:text-slate-300 font-medium">{selectedGroup.members.join(", ")}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 self-start sm:self-auto no-print">
                      <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-medium text-sm px-4 py-2.5 rounded-lg transition duration-200 cursor-pointer"
                        title="Export as CSV sheet"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        CSV Export
                      </button>
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-medium text-sm px-4 py-2.5 rounded-lg transition duration-200 cursor-pointer"
                        title="Print or save as PDF"
                      >
                        <Printer className="w-4 h-4" />
                        Print / PDF
                      </button>
                    </div>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 no-print">
                    {["overview", "expenses", "settle"].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-semibold capitalize border-b-2 transition-all cursor-pointer ${
                          activeTab === tab
                            ? "border-teal-500 text-teal-600 dark:text-cyan-400"
                            : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                      >
                        {tab === "settle" ? "Settle Up" : tab}
                      </button>
                    ))}
                  </div>

                  {/* TAB 1: OVERVIEW */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      
                      {/* Metric Cards */}
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
                          <span className="text-slate-400 text-xs font-semibold uppercase">Total Spending</span>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-10 h-10 bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-cyan-400 rounded-lg flex items-center justify-center shrink-0">
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                              ${totalSpent.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
                          <span className="text-slate-400 text-xs font-semibold uppercase">Shared Expenses</span>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                              <Tag className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                              {selectedGroup.expenses?.length || 0} items
                            </span>
                          </div>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs sm:col-span-2 md:col-span-1">
                          <span className="text-slate-400 text-xs font-semibold uppercase">Settlement Balances</span>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center shrink-0">
                              <ArrowLeftRight className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                              {settlementPlan.length} pending
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Member Balances List */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
                          <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-teal-500" />
                            Individual Standings
                          </h3>
                          <div className="space-y-3">
                            {Object.keys(memberBalances).map(name => {
                              const bal = memberBalances[name];
                              const isPositive = bal > 0.01;
                              const isNegative = bal < -0.01;
                              
                              return (
                                <div key={name} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                  <span className="font-semibold text-slate-700 dark:text-slate-300">{name}</span>
                                  <div className="flex items-center gap-1.5 font-bold">
                                    {isPositive && (
                                      <>
                                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                        <span className="text-emerald-600 dark:text-emerald-400">+${bal.toFixed(2)}</span>
                                      </>
                                    )}
                                    {isNegative && (
                                      <>
                                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                                        <span className="text-red-600 dark:text-red-400">-${Math.abs(bal).toFixed(2)}</span>
                                      </>
                                    )}
                                    {!isPositive && !isNegative && (
                                      <span className="text-slate-400">Settled ($0.00)</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Category Totals Visualizer */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
                          <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-indigo-500" />
                            Spending Breakdown
                          </h3>
                          {totalSpent === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10">
                              <p className="text-slate-400 text-sm">Add some expenses to see the chart.</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {CATEGORIES.map(cat => {
                                const total = categoryTotals[cat.name] || 0;
                                const percentage = totalSpent > 0 ? (total / totalSpent) * 100 : 0;
                                return (
                                  <div key={cat.name} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                      <span>{cat.name}</span>
                                      <span>${total.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: EXPENSES */}
                  {activeTab === "expenses" && (
                    <div className="grid md:grid-cols-12 gap-8">
                      
                      {/* Left: Log Expense Form */}
                      <div className="md:col-span-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs no-print">
                        <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                          <PlusCircle className="w-5 h-5 text-teal-500" />
                          Log Shared Bill
                        </h3>
                        <form onSubmit={handleAddExpense} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Dinner, Fuel, Hotel stay"
                              value={expenseDesc}
                              onChange={(e) => setExpenseDesc(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Amount ($)</label>
                              <input
                                type="number"
                                required
                                step="any"
                                min="0.01"
                                placeholder="0.00"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                              <select
                                value={expenseCategory}
                                onChange={(e) => setExpenseCategory(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition font-medium"
                              >
                                {CATEGORIES.map(c => (
                                  <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Paid By</label>
                              <select
                                value={expensePayer}
                                onChange={(e) => setExpensePayer(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition font-medium"
                              >
                                {selectedGroup.members.map(m => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
                              <input
                                type="date"
                                required
                                value={expenseDate}
                                onChange={(e) => setExpenseDate(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Split Between (Multi-select)</label>
                            <div className="max-y-[200px] overflow-y-auto border border-slate-100 dark:border-slate-800/80 rounded-xl p-3 bg-slate-50/40 dark:bg-slate-900 space-y-2">
                              {selectedGroup.members.map(member => {
                                const isChecked = expenseSplits.includes(member);
                                return (
                                  <div
                                    key={member}
                                    onClick={() => toggleSplitParticipant(member)}
                                    className="flex items-center gap-2.5 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {}} // toggling handled by parent div click
                                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                                    />
                                    <span className="text-sm font-semibold">{member}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingExpense}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl transition shadow-xs cursor-pointer"
                          >
                            <Plus className="w-5 h-5" />
                            {isSubmittingExpense ? "Adding..." : "Add Expense"}
                          </button>
                        </form>
                      </div>

                      {/* Right: Expenses List Feed */}
                      <div className="md:col-span-7 space-y-4 print-full-width">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs print-full-width">
                          <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-indigo-500" />
                            Expenses Registry
                          </h3>
                          {selectedGroup.expenses.length === 0 ? (
                            <div className="text-center py-20">
                              <p className="text-slate-400">No expenses recorded yet.</p>
                            </div>
                          ) : (
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 print-full-width">
                              {selectedGroup.expenses.map(exp => {
                                const matchedCat = CATEGORIES.find(c => c.name === exp.category) || CATEGORIES[4];
                                return (
                                  <div
                                    key={exp._id}
                                    className="group/exp flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition duration-300 print-full-width"
                                  >
                                    <div className="flex gap-3 pr-2">
                                      <div className={`${matchedCat.iconColor} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                                        <DollarSign className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{exp.description}</h4>
                                        <p className="text-xs text-slate-400 mt-1 flex flex-wrap gap-1.5 items-center">
                                          <span>Paid by <span className="font-semibold text-slate-500 dark:text-slate-300">{exp.paidBy}</span></span>
                                          <span className="text-slate-300 dark:text-slate-700">•</span>
                                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500">{exp.category}</span>
                                          <span className="text-slate-300 dark:text-slate-700">•</span>
                                          <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {new Date(exp.date).toLocaleDateString()}</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-2">
                                          Split ({exp.splitBetween.length} shared): <span className="text-slate-500 dark:text-slate-400 font-semibold">{exp.splitBetween.join(", ")}</span>
                                        </p>
                                      </div>
                                    </div>

                                    <div className="text-right shrink-0 flex items-center gap-2">
                                      <div className="font-black text-slate-800 dark:text-slate-200 text-lg">
                                        ${exp.amount.toFixed(2)}
                                      </div>
                                      <button
                                        onClick={() => handleDeleteExpense(exp._id)}
                                        className="opacity-0 group-hover/exp:opacity-100 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg text-slate-400 hover:text-red-500 transition-all duration-200 no-print"
                                        title="Delete Expense"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SETTLE UP */}
                  {activeTab === "settle" && (
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
                      <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        Optimal Debts Settlements
                      </h3>
                      {settlementPlan.length === 0 ? (
                        <div className="text-center py-20">
                          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                          <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">Everyone is fully settled!</h4>
                          <p className="text-slate-400 mt-2">All recorded expenses are balanced out.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm text-slate-400 mb-6">
                            This optimized transaction route minimizes the total cash transfers needed to settle all debts in the group.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            {settlementPlan.map((step, idx) => {
                              const key = `${step.from}->${step.to}->${step.amount.toFixed(2)}`;
                              const isSettled = settledItems.has(key);
                              return (
                                <div
                                  key={idx}
                                  className={`flex items-center justify-between p-4 rounded-xl border transition duration-300 ${
                                    isSettled
                                      ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200/60 dark:border-emerald-900/30 opacity-70"
                                      : "bg-slate-50 dark:bg-slate-800/40 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-950/40"
                                  }`}
                                >
                                  <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{step.from}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                      <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{step.to}</span>
                                    </div>
                                    {isSettled && (
                                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">✓ Settled</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className={`font-black text-lg ${
                                      isSettled ? "text-emerald-500/70 dark:text-emerald-500/60" : "text-emerald-600 dark:text-emerald-400"
                                    }`}>
                                      ${step.amount.toFixed(2)}
                                    </span>
                                    <button
                                      onClick={() => handleSettleClick(step)}
                                      disabled={isSettled}
                                      className={`font-semibold text-xs px-3.5 py-2 rounded-lg transition duration-200 ${
                                        isSettled
                                          ? "bg-emerald-100/60 dark:bg-emerald-950/20 text-emerald-600/60 dark:text-emerald-500/50 cursor-not-allowed"
                                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/70 dark:text-emerald-400 cursor-pointer hover:shadow-sm"
                                      }`}
                                    >
                                      {isSettled ? "Settled ✓" : "Mark Settled"}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* SETTLEMENT CONFIRMATION MODAL */}
      <SettlementConfirmModal
        settlement={settlementModal}
        onConfirm={handleSettleConfirm}
        onCancel={() => setSettlementModal(null)}
        isSubmitting={isSettling}
      />

      {/* GENERIC CONFIRM MODAL (delete group / delete expense) */}
      <GenericConfirmModal
        isOpen={!!confirmModal}
        title={confirmModal?.title || ""}
        message={confirmModal?.message || ""}
        confirmLabel={confirmModal?.confirmLabel || "Delete"}
        onConfirm={confirmModal?.onConfirm || (() => {})}
        onCancel={() => setConfirmModal(null)}
      />

      {/* CREATE GROUP MODAL (Glassmorphic) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in no-print">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FolderPlus className="w-6 h-6 text-teal-500" />
                Create Trip Group
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewGroupName("");
                  setNewGroupMembers(["", ""]);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Group Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa Holiday, Europe Backpacking"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Group Members</label>
                  <button
                    type="button"
                    onClick={handleAddMemberInput}
                    className="text-xs text-teal-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Member
                  </button>
                </div>

                <div className="max-y-[200px] overflow-y-auto space-y-2.5 pr-1">
                  {newGroupMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        placeholder={`Member #${index + 1} name`}
                        value={member}
                        onChange={(e) => handleMemberNameChange(index, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-hidden focus:border-teal-500 text-sm transition"
                      />
                      <button
                        type="button"
                        disabled={newGroupMembers.length <= 2}
                        onClick={() => handleRemoveMemberInput(index)}
                        className="p-2 border border-transparent text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 rounded-lg cursor-pointer"
                        title="Remove member name"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewGroupName("");
                    setNewGroupMembers(["", ""]);
                  }}
                  className="px-5 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold text-sm transition shadow-md cursor-pointer"
                >
                  Create Group
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
