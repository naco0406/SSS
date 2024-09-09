"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"
import { UserPlus, X, Loader2 } from "lucide-react";
import { useSurvey } from "@/hooks/useSurvey";
import { useState, useEffect } from "react";
import { BadgeSeparator } from "./BadgeSeparator";

interface SurveyColumnProps {
    date: Date;
}

export function SurveyColumn({ date }: SurveyColumnProps) {
    const {
        participants,
        participantLimit,
        newParticipant,
        setNewParticipant,
        isLoading,
        handleAddParticipant,
        handleRemoveParticipant
    } = useSurvey(date);

    const [isOneMonthFuture, setIsOneMonthFuture] = useState(false);
    const [openDate, setOpenDate] = useState<Date | null>(null);

    useEffect(() => {
        const checkDate = () => {
            const now = new Date();
            const oneMonthLater = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            const isInFuture = date > oneMonthLater;
            setIsOneMonthFuture(isInFuture);

            if (isInFuture) {
                const openingDate = new Date(date);
                openingDate.setMonth(openingDate.getMonth() - 1);
                openingDate.setHours(0, 0, 0, 0);
                setOpenDate(openingDate);
            } else {
                setOpenDate(null);
            }
        };

        checkDate();
        const timer = setInterval(checkDate, 1000); // Check every second

        return () => clearInterval(timer);
    }, [date]);

    const confirmedParticipants = participants.slice(0, participantLimit);
    const waitingParticipants = participants.slice(participantLimit);
    const isThereWaitingParticipants = waitingParticipants.length > 0;

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{date.toLocaleDateString()}</h2>
                <span className="text-sm text-gray-500">{participants.length}명</span>
            </div>
            {isOneMonthFuture ? (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-center text-gray-500">
                        {openDate?.toLocaleString()} 에 열립니다.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex-grow overflow-y-auto mb-4 no-scrollbar">
                        {confirmedParticipants.map((participant, index) => (
                            <Card key={index} className="mb-2">
                                <CardContent className="flex justify-between items-center p-2">
                                    <Badge className="mr-2 flex-shrink-0">{index + 1}</Badge>
                                    <span className="flex-grow text-left truncate">{participant}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveParticipant(index)}
                                        disabled={isLoading}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        {isThereWaitingParticipants && (
                            <>
                                <BadgeSeparator className="my-4" limit={participantLimit} />
                                <div className="mt-2">
                                    {waitingParticipants.map((participant, index) => (
                                        <Card key={index} className="mb-2">
                                            <CardContent className="flex justify-between items-center p-2">
                                                <Badge className="mr-2 flex-shrink-0" variant="outline">대기 {index + 1}</Badge>
                                                <span className="flex-grow text-left truncate">{participant}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveParticipant(index + participantLimit)}
                                                    disabled={isLoading}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            type="text"
                            placeholder="참가자 추가"
                            value={newParticipant}
                            onChange={(e) => setNewParticipant(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddParticipant()}
                            disabled={isLoading}
                            maxLength={20}
                        />
                        <Button
                            onClick={handleAddParticipant}
                            disabled={isLoading}
                            className="w-24"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    추가
                                </>
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}