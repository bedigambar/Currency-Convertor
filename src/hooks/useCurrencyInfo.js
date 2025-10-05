import { useState, useEffect } from "react";

export default function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetch(`https://v6.exchangerate-api.com/v6/99f7a166a55e30f1f95f2063/latest/${currency}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch currency data');
                }
                return res.json();
            })
            .then((res) => {
                if (res.conversion_rates) {
                    setData(res.conversion_rates);
                } else {
                    throw new Error('Invalid response format');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Error in Fetching data: ${error}`);
                setError(error.message);
                setLoading(false);
            });
    }, [currency]);
    
    return { data, error, loading };
}