import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FirestoreService } from '@/lib/FirestoreService';

export const useSurvey = (date: Date) => {
    const [participants, setParticipants] = useState<string[]>([]);
    const [newParticipant, setNewParticipant] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식

    const fetchParticipants = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedParticipants = await FirestoreService.getParticipants(dateString);
            setParticipants(fetchedParticipants);
        } catch (error) {
            console.error('Error fetching participants:', error);
            toast.error('참가자 목록을 불러오는 데 실패했습니다.', {
                position: "top-right",
            });
        } finally {
            setIsLoading(false);
        }
    }, [dateString]);

    useEffect(() => {
        fetchParticipants();
    }, [fetchParticipants]);

    const handleAddParticipant = async () => {
        if (newParticipant.trim() !== "") {
            setIsLoading(true);
            try {
                await FirestoreService.addParticipant(dateString, newParticipant.trim());
                setParticipants([...participants, newParticipant.trim()]);
                setNewParticipant("");
                toast.success(`${newParticipant}님이 ${date.toLocaleDateString()} 참가 목록에 추가되었습니다`, {
                    position: "top-right",
                });
            } catch (error) {
                console.error('Error adding participant:', error);
                toast.error('참가자 추가에 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRemoveParticipant = async (index: number) => {
        const participantToRemove = participants[index];
        setIsLoading(true);
        try {
            await FirestoreService.removeParticipant(dateString, participantToRemove);
            const updatedParticipants = participants.filter((_, i) => i !== index);
            setParticipants(updatedParticipants);
            toast.info(`${participantToRemove}님이 ${date.toLocaleDateString()} 참가 목록에서 제거되었습니다`, {
                position: "top-right",
            });
        } catch (error) {
            console.error('Error removing participant:', error);
            toast.error('참가자 제거에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        participants,
        newParticipant,
        setNewParticipant,
        isLoading,
        handleAddParticipant,
        handleRemoveParticipant
    };
};