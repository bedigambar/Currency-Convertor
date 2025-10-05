import { useId } from "react";

export default function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();
    
    return (
        <div className={`glass-card rounded-2xl p-5 text-sm flex flex-col sm:flex-row gap-4 shadow-glass smooth-hover hover:shadow-glass-hover ${className} animate-scale-in`}>
            <div className="flex-1">
                <label  
                    htmlFor={amountInputId}
                    className="text-gray-600 font-semibold mb-3 text-xs uppercase tracking-wide flex items-center gap-2"
                >
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className={`
                        outline-none w-full bg-transparent py-2 px-3 rounded-lg
                        text-2xl font-bold text-gray-800 
                        border-2 border-transparent
                        ${!amountDisable ? 'input-focus hover:border-primary-200' : 'cursor-not-allowed opacity-60'}
                        transition-all duration-200
                        placeholder:text-gray-300 placeholder:font-normal
                    `}
                    type="number"
                    placeholder="0.00"
                    disabled={amountDisable}
                    value={amount || ''}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    min="0"
                    step="0.01"
                />
            </div>
            
            <div className="flex-1 flex flex-col justify-between sm:items-end">
                <label className="text-gray-600 font-semibold mb-3 text-xs uppercase tracking-wide flex items-center gap-2 sm:justify-end">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Currency Type
                </label>
                <select
                    className={`
                        rounded-xl px-4 py-3 font-semibold text-base
                        bg-gradient-to-br from-primary-50 to-primary-100
                        text-primary-800 cursor-pointer
                        border-2 border-primary-200
                        hover:border-primary-400 hover:shadow-md
                        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                        transition-all duration-200
                        ${currencyDisable ? 'opacity-50 cursor-not-allowed' : 'button-hover'}
                        appearance-none bg-no-repeat
                        [background-position:right_0.75rem_center]
                        [background-image:url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e')]
                        [background-size:1.5em_1.5em]
                        pr-10
                    `}
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {selectCurrency && !currencyOptions.includes(selectCurrency) && (
                        <option key={selectCurrency} value={selectCurrency}>
                            {selectCurrency.toUpperCase()}
                        </option>
                    )}
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

