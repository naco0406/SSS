import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, query, orderBy, getDocs, Timestamp, runTransaction } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };

export const addParticipant = async (date: string, name: string) => {
    try {
        const participantRef = doc(db, 'squashSurvey', date);
        await runTransaction(db, async (transaction) => {
            const participantDoc = await transaction.get(participantRef);
            if (!participantDoc.exists()) {
                transaction.set(participantRef, { participants: [name] });
            } else {
                const participants = participantDoc.data().participants || [];
                transaction.update(participantRef, { participants: [...participants, name] });
            }
        });
    } catch (error) {
        console.error('Error adding participant: ', error);
        throw error;
    }
};

export const removeParticipant = async (date: string, name: string) => {
    try {
        const participantRef = doc(db, 'squashSurvey', date);
        await runTransaction(db, async (transaction) => {
            const participantDoc = await transaction.get(participantRef);
            if (participantDoc.exists()) {
                const participants = participantDoc.data().participants || [];
                const updatedParticipants = participants.filter((p: string) => p !== name);
                transaction.update(participantRef, { participants: updatedParticipants });
            }
        });
    } catch (error) {
        console.error('Error removing participant: ', error);
        throw error;
    }
};

export const getParticipants = async (date: string): Promise<string[]> => {
    try {
        const participantRef = doc(db, 'squashSurvey', date);
        const participantDoc = await getDoc(participantRef);
        if (participantDoc.exists()) {
            return participantDoc.data().participants || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching participants: ', error);
        throw error;
    }
};

export const getParticipantLimit = async (date: string): Promise<number> => {
    try {
        const participantRef = doc(db, 'squashSurvey', date);
        const participantDoc = await getDoc(participantRef);
        if (participantDoc.exists()) {
            return participantDoc.data().limit || 7;
        } else {
            return 7;
        }
    } catch (error) {
        console.error('Error fetching participant limit: ', error);
        throw error;
    }
};