import { useState, useEffect } from "react";

export interface ApiDataType {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const useFetch = (url: string) => {
    const [data, setData] = useState<ApiDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const fetchedData: ApiDataType[] = await res.json();
                setData(fetchedData);
            } catch (error) {
                setError("Something went wrong while fetching the data!");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
