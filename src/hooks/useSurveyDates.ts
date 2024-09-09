import { useState, useEffect } from 'react';
import { FirestoreService } from '@/lib/FirestoreService';

export const useSurveyDates = () => {
    const [dates, setDates] = useState<Date[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const futureDates = await FirestoreService.getFutureDates();
                setDates(futureDates);
            } catch (error) {
                console.error('Error fetching future dates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDates();
    }, []);

    return { dates, isLoading };
};