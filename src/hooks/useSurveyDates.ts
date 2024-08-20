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

    const addNewDate = async (newDate: Date) => {
        try {
            await FirestoreService.addNewDate(newDate);
            setDates(prevDates => [...prevDates, newDate].sort((a, b) => a.getTime() - b.getTime()));
        } catch (error) {
            console.error('Error adding new date:', error);
        }
    };

    return { dates, isLoading, addNewDate };
};