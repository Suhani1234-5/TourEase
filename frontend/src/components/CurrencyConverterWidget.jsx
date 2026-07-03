import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { Coins, RefreshCw, AlertCircle } from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
];

const MOCK_FALLBACK_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.4,
  JPY: 155.2,
  AUD: 1.51,
  CAD: 1.36,
  AED: 3.67,
  SGD: 1.35,
};

export default function CurrencyConverterWidget({ basePriceUsd }) {
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [rates, setRates] = useState(MOCK_FALLBACK_RATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getExchangeRates("USD");
        if (active && data && data.rates) {
          setRates(data.rates);
        }
      } catch (err) {
        console.warn("Failed to fetch live rates, using fallback:", err);
        // Keep fallback rates
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRates();
    return () => {
      active = false;
    };
  }, []);

  const rate = rates[targetCurrency] || MOCK_FALLBACK_RATES[targetCurrency] || 1;
  const convertedPrice = basePriceUsd * rate;

  const formatPrice = (value, code) => {
    const noFractionCurrencies = ["JPY", "KRW", "IDR"];
    const useNoFractions = noFractionCurrencies.includes(code);
    const opts = {
      style: "currency",
      currency: code,
      minimumFractionDigits: useNoFractions ? 0 : 2,
      maximumFractionDigits: useNoFractions ? 0 : 2,
    };
    try {
      return new Intl.NumberFormat("en-US", opts).format(value);
    } catch (e) {
      return `${code} ${value.toFixed(2)}`;
    }
  };

  const selectedInfo = CURRENCIES.find((c) => c.code === targetCurrency) || {
    code: targetCurrency,
    name: targetCurrency,
    flag: "🌐",
  };

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
      <div className="flex items-center gap-2 mb-3">
        <Coins className="w-5 h-5 text-teal-600 dark:text-indigo-400" />
        <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
          Currency Converter
        </span>
      </div>

      <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-3.5 border border-gray-100 dark:border-gray-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Tour Price
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            {loading && <RefreshCw className="w-3 h-3 animate-spin" />}
            {!loading && "Live exchange rate"}
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-3">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(basePriceUsd, "USD")}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Base currency: USD
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="target-currency-select"
              className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
            >
              Select Home Currency
            </label>
            <select
              id="target-currency-select"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg py-1.5 px-2.5 text-sm font-medium focus:ring-1 focus:ring-teal-500 focus:outline-none dark:text-gray-100"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Estimated Cost ({selectedInfo.code})
              </div>
              <div className="text-lg font-bold text-teal-600 dark:text-indigo-400 mt-0.5">
                {formatPrice(convertedPrice, targetCurrency)}
              </div>
            </div>
            <div className="text-right text-xxs text-gray-450 dark:text-gray-500">
              1 USD ≈ {rate.toFixed(4)} {targetCurrency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
