"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SurveyColumn } from "@/components/survey-column";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSurveyDates } from "@/hooks/useSurveyDates";
import { HelpCircle } from "lucide-react";

const AnimatedBackground = () => (
  <div className="fixed inset-0 bg-gradient-to-r from-green-400/30 to-blue-500/30 animate-gradient-x -z-10" />
);

const HelpDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="p-2 absolute top-4 left-4">
        <HelpCircle className="h-6 w-6" />
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle>
        <h3 className="font-semibold text-lg flex items-center">
          <span className="mr-1">🎾</span>
          <span className="flex flex-row items-center">
            <span className="mr-2">스스스</span>
            <span className="text-gray-500 text-xs font-light">스퍼노바</span>
          </span>
        </h3>
      </DialogTitle>
      <p className="mb-2">
        스스스, Swing Smash Squash는<br />
        <span className="font-semibold">매주 화요일 오후 8시</span> 스쿼시를 합니다 🍀
      </p>
      <p className="text-xs mb-2">
        참여하고 싶은 날짜에 이름을 적어요!<br />
        대신 20자 까지만~ 🥰
      </p>
      <p className="text-xs">
        귀찮아서 로그인 구현 안했으니<br />
        자기꺼만 수정하기~ ✅
      </p>
    </DialogContent>
  </Dialog>
);

export default function Home() {
  const { dates, isLoading } = useSurveyDates();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <AnimatedBackground />
      <HelpDialog />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-6 whitespace-nowrap h-[40px]">
        스스스 🎾
      </h1>
      <div className="w-full overflow-x-auto snap-x snap-mandatory">
        <div className="inline-flex space-x-4" style={{ minWidth: "100%" }}>
          {dates.map((date, index) => (
            <Card key={index} className="w-full max-w-xs flex-shrink-0 h-[calc(100vh-108px)] bg-white/40 snap-center">
              <CardContent className="p-4 h-full">
                <SurveyColumn date={date} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}