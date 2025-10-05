import { useState, useEffect } from 'react'
import { InputBox, LoadingSkeleton, ErrorMessage } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)

  const { data: currencyInfo, error, loading: isLoading } = useCurrencyInfo(from);

  const fromOptions = Object.keys(currencyInfo)
  const toOptions = Object.keys(currencyInfo)

  useEffect(() => {
    if (currencyInfo[to]) {
      setExchangeRate(currencyInfo[to])
    }
  }, [currencyInfo, to])

  const swap = () => {
    const tempFrom = from
    const tempTo = to
    const tempAmount = amount
    const tempConverted = convertedAmount
    
    setFrom(tempTo)
    setTo(tempFrom)
    setAmount(tempConverted)
    setConvertedAmount(tempAmount)
  }

  const convert = () => {
    const result = amount * currencyInfo[to]
    setConvertedAmount(result)
    setExchangeRate(currencyInfo[to])
  }

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95"></div>
      
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute text-6xl font-bold text-white top-20 left-[10%] animate-pulse-slow">$</div>
        <div className="absolute text-5xl font-bold text-white top-40 right-[15%] animate-pulse-slow" style={{ animationDelay: '1s' }}>€</div>
        <div className="absolute text-7xl font-bold text-white bottom-32 left-[20%] animate-pulse-slow" style={{ animationDelay: '2s' }}>¥</div>
        <div className="absolute text-6xl font-bold text-white bottom-20 right-[25%] animate-pulse-slow" style={{ animationDelay: '1.5s' }}>£</div>
        <div className="absolute text-5xl font-bold text-white top-[50%] left-[5%] animate-pulse-slow" style={{ animationDelay: '0.5s' }}>₹</div>
      </div>
      
      <div className="w-full max-w-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg font-['Poppins']">
            Currency Converter
          </h1>
          <p className="text-white/90 text-lg font-light">
            Fast, accurate, and easy to use currency exchange
          </p>
        </div>

        <div className="w-full max-w-md mx-auto glass-effect-strong rounded-3xl p-8 shadow-2xl border border-white/30 animate-slide-up">
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} />
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
            className="space-y-6"
          >
            <div className="w-full">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={fromOptions}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              )}
            </div>

            <div className="relative flex justify-center items-center">
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <button
                type="button"
                className="relative z-10 group bg-white hover:bg-primary-50 text-primary-600 p-4 rounded-2xl border-4 border-white/50 shadow-lg button-hover focus:outline-none focus:ring-4 focus:ring-primary-300"
                onClick={swap}
                title="Swap currencies"
              >
                <svg 
                  className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            <div className="w-full">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={toOptions}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              )}
            </div>

            {!isLoading && exchangeRate > 0 && amount > 0 && (
              <div className="glass-effect rounded-xl p-4 text-center animate-scale-in">
                <p className="text-white/80 text-sm mb-1">Exchange Rate</p>
                <p className="text-white font-bold text-lg">
                  1 {from.toUpperCase()} = {exchangeRate.toFixed(4)} {to.toUpperCase()}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className={`w-full bg-gradient-primary text-white font-bold text-lg px-6 py-4 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-300 flex items-center justify-center gap-3 group ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'button-hover'
              }`}
              disabled={isLoading || error}
            >
              {isLoading ? (
                <>
                  <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8 text-white/70 text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p>Real-time exchange rates updated daily</p>
        </div>
      </div>
    </div>
  );
}

export default App
