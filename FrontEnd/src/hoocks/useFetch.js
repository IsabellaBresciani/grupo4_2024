import { useState, useEffect } from "react";

export default function useFetch(req) {

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ controller, setController ] = useState(null);

    useEffect(()=> {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        // fetch(url, { signal: abortController.signal })
        //     .then((res)=> res.json())
        //     .then((data)=> setData(data))
        //     .catch((e) => {
        //         if (e.name !== 'AbortError') setError(e);
        //     })
        //     .finally(()=> setLoading(false));
        
        return ()=> abortController.abort();
    }, []);

    const handleCancelRequest = ()=> {
        if (controller)  {
            controller.abort();
            setError('Request cancelled');
        }
    };

    return { data, loading, error, handleCancelRequest };
}