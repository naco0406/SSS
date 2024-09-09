import { addParticipant, removeParticipant, getParticipants, db, getParticipantLimit } from "./firestore";
import { addDoc, collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";

const toKSTDate = (date: Date): Date => {
    return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};

const fromKSTDate = (date: Date): Date => {
    return new Date(date.getTime() - 9 * 60 * 60 * 1000);
};

export const FirestoreService = {
    addParticipant: async (date: string, name: string): Promise<void> => {
        try {
            await addParticipant(date, name);
        } catch (error) {
            console.error('Error adding participant:', error);
            throw error;
        }
    },

    removeParticipant: async (date: string, name: string): Promise<void> => {
        try {
            await removeParticipant(date, name);
        } catch (error) {
            console.error('Error removing participant:', error);
            throw error;
        }
    },

    getParticipants: async (date: string): Promise<string[]> => {
        try {
            return await getParticipants(date);
        } catch (error) {
            console.error('Error fetching participants:', error);
            throw error;
        }
    },

    getParticipantLimit: async (date: string): Promise<number> => {
        try {
            return await getParticipantLimit(date);
        } catch (error) {
            console.error('Error fetching participants:', error);
            throw error;
        }
    },

    getFutureDates: async (): Promise<Date[]> => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayKST = toKSTDate(today);
        const todayTimestamp = Timestamp.fromDate(fromKSTDate(todayKST));

        const q = query(
            collection(db, "squashSurvey"),
            where("date", ">=", todayTimestamp),
            orderBy("date", "asc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const date = toKSTDate(doc.data().date.toDate());
            return date;
        });
    },
};