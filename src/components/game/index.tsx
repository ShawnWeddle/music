"use client";
import { useState } from "react";
import { FullQuizType, QuestionType, scaleQuestions } from "@/app/questions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameBoardProps {
  hello?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = () => {
  const [gameQuestions, setgameQuestions] = useState<FullQuizType>(
    scaleQuestions(21)
  );
  const [activeQuestion, setActiveQuestion] = useState<QuestionType>(
    gameQuestions.questions[0]
  );
  const questionString = (q: QuestionType): string => {
    if (q.type === "Scale") {
      return `What is the ${q.degree} of the ${q.scale} ${q.mode} scale?`;
    } else {
      return `What note is the ${q.fret} fret of the ${q.string} string?`;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{questionString(activeQuestion)}</CardTitle>
        <CardDescription>
          Question {gameQuestions.questionsAnswered + 1}/100
        </CardDescription>
      </CardHeader>
      <CardContent>
        <button>A</button>
      </CardContent>
    </Card>
  );
};

export default GameBoard;
