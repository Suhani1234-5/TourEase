import React, { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import {
  ArrowLeftRight,
  RefreshCw,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar",           flag: "🇺🇸" },
  { code: "EUR", name: "Euro",                flag: "🇪🇺" },
  { code: "GBP", name: "British Pound",       flag: "🇬🇧" },
  { code: "INR", name: "Indian Rupee",        flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen",        flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar",   flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar",     flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc",         flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan",        flag: "🇨🇳" },
  { code: "SGD", name: "Singapore Dollar",    flag: "🇸🇬" },
  { code: "AED", name: "UAE Dirham",          flag: "🇦🇪" },
  { code: "THB", name: "Thai Baht",           flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit",   flag: "🇲🇾" },
  { code: "IDR", name: "Indonesian Rupiah",   flag: "🇮🇩" },
  { code: "KRW", name: "South Korean Won",    flag: "🇰🇷" },
  { code: "HKD", name: "Hong Kong Dollar",    flag: "🇭🇰" },
  { code: "NZD", name: "New Zealand Dollar",  flag: "🇳🇿" },
  { code: "MXN", name: "Mexican Peso",        flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real",      flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand",  flag: "🇿🇦" },
  { code: "TRY", name: "Turkish Lira",        flag: "🇹🇷" },
  { code: "SAR", name: "Saudi Riyal",         flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal",        flag: "🇶🇦" },
  { code: "SEK", name: "Swedish Krona",       flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone",     flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone",        flag: "🇩🇰" },
  { code: "PHP", name: "Philippine Peso",     flag: "🇵🇭" },
  { code: "PKR", name: "Pakistani Rupee",     flag: "🇵🇰" },
  { code: "BDT", name: "Bangladeshi Taka",    flag: "🇧🇩" },
  { code: "EGP", name: "Egyptian Pound",      flag: "🇪🇬" },
];

const POPULAR_TARGETS = ["EUR", "GBP", "JPY", "AED", "SGD", "AUD"];

function getCurrencyInfo(code) {
  return CURRENCIES.find((c) => c.code === code) || { code, name: code, flag: "🌐" };
}

function convert(amount, from, to, rates) {
  if (!rates || !rates[from] || !rates[to]) return null;
  return (parseFloat(amount) / rates[from]) * rates[to];
}

function formatResult(value, code) {
  if (value === null || isNaN(value)) return "—";
  const isZeroDecimal = code === "JPY" || code === "KRW" || code === "IDR";
  const opts = {
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  };
  return new Intl.NumberFormat("en-US", opts).format(value);
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setRates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRates = useCallback(async (showRefreshSpinner = false) => {
    try {
      if (showRefreshSpinner) setRefreshing(true);
      else setLoading(true);
      setError(null);
      const data = await api.getExchangeRates("USD");
      setRates(data.rates);
      setLastUpdated(data.time_last_update_utc || "");
    } catch (err) {
      setError(err.message || "Failed to load exchange rates.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) setAmount(val);
  };

  const result = convert(amount || 0, fromCurrency, toCurrency, rates);
  const fromInfo = getCurrencyInfo(fromCurrency);
  const toInfo = getCurrencyInfo(toCurrency);

  const rate1 = convert(1, fromCurrency, toCurrency, rates);
  const rateInverse = convert(1, toCurrency, fromCurrency, rates);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-teal-600 to-cyan-500 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Currency Converter
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Live exchange rates for travelers — no sign-in needed.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 rounded-2xl px-5 py-4 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Could not load rates</p>
              <p className="mt-0.5 text-red-600 dark:text-red-500">{error}</p>
              <button
                onClick={() => fetchRates(true)}
                className="mt-2 font-semibold underline hover:no-underline cursor-pointer"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Main Converter Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Amount
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="w-full px-5 py-4 text-2xl font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-500 transition text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>

          {/* Currency Selectors */}
          <div className="flex items-end gap-3">
            {/* From */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                From
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
                  {fromInfo.flag}
                </span>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-500 text-sm font-semibold text-slate-800 dark:text-slate-100 transition appearance-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="shrink-0 mb-0.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:border-teal-400 dark:hover:border-teal-700 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 transition-all duration-200 cursor-pointer active:scale-95"
              title="Swap currencies"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>

            {/* To */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                To
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
                  {toInfo.flag}
                </span>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-500 text-sm font-semibold text-slate-800 dark:text-slate-100 transition appearance-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20 border border-teal-100 dark:border-teal-900/50 px-6 py-5">
            {loading ? (
              <div className="flex items-center justify-center gap-3 py-2">
                <RefreshCw className="w-5 h-5 text-teal-500 animate-spin" />
                <span className="text-slate-400 text-sm">Loading rates...</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {amount || "0"} {fromInfo.flag} {fromCurrency} =
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-teal-700 dark:text-cyan-300 tracking-tight">
                    {formatResult(result, toCurrency)}
                    <span className="ml-2 text-xl font-bold text-teal-500 dark:text-cyan-400">
                      {toCurrency}
                    </span>
                  </span>
                </div>

                {/* 1-unit rate reference */}
                {rate1 !== null && (
                  <p className="mt-3 pt-3 border-t border-teal-100 dark:border-teal-900/50 text-xs text-slate-400 dark:text-slate-500 flex flex-wrap gap-x-3">
                    <span>
                      1 {fromCurrency} = <strong className="text-slate-600 dark:text-slate-300">{formatResult(rate1, toCurrency)} {toCurrency}</strong>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span>
                      1 {toCurrency} = <strong className="text-slate-600 dark:text-slate-300">{formatResult(rateInverse, fromCurrency)} {fromCurrency}</strong>
                    </span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Last Updated + Refresh */}
          {lastUpdated && !loading && (
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Rates updated: {new Date(lastUpdated).toUTCString().replace(" GMT", " UTC")}
              </span>
              <button
                onClick={() => fetchRates(true)}
                disabled={refreshing}
                className="flex items-center gap-1 font-semibold text-teal-600 dark:text-cyan-400 hover:underline disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* Popular Conversions Grid */}
        {!loading && !error && rates && (
          <div className="mt-8">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {amount || "1"} {fromCurrency} in popular currencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {POPULAR_TARGETS.filter((c) => c !== fromCurrency).map((code) => {
                const info = getCurrencyInfo(code);
                const converted = convert(amount || 0, fromCurrency, code, rates);
                return (
                  <button
                    key={code}
                    onClick={() => setToCurrency(code)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group ${
                      toCurrency === code
                        ? "bg-teal-50 dark:bg-teal-950/30 border-teal-300 dark:border-teal-700 shadow-xs"
                        : "bg-white/80 dark:bg-gray-900/80 border-slate-200 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{info.flag}</span>
                      <span className={`text-xs font-bold uppercase ${toCurrency === code ? "text-teal-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"}`}>
                        {code}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-base leading-tight">
                      {formatResult(converted, code)}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                      {info.name}
                    </p>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 text-center">
              Click any card to set it as your target currency.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
