import Cleave from 'cleave.js/react';
import {Props} from "@/app/(protected)/components/input/CurrencyInput.types";
import {useEffect, useState} from "react";

const currencySymbols: Record<string, string> = {
  COP: '$ ',
  USD: 'US$ ',
  EUR: '€ ',
};

export default function CurrencyInput({value, onChange, onBlur, name, currency,}: Props) {
  const [symbol, setSymbol] = useState(currencySymbols[name]);

  useEffect(() => {
    setSymbol(currencySymbols[currency]);
  }, [currency]);

  return (
    <Cleave
      key={symbol}
      name={name}
      value={value}
      options={{
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: symbol,
        rawValueTrimPrefix: true,
      }}
      onChange={(e) => onChange(e.target.rawValue)}
      onBlur={onBlur}
      className="aparence-none w-full bg-[#0f1535] border border-white/30 rounded-2xl p-2.5 text-xs outline-none focus:border-blue-500"
      placeholder="0.00"
    />
  )
}