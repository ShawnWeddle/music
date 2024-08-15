"use client";
import { useState, useEffect } from "react";
import { FullQuizType, QuestionType } from "@/app/questions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NoteType, Notes, buttonNameMap } from "@/data";
import { generateQuestions, emptyFullQuiz } from "@/actions/game.actions";

interface GameBoardProps {
  hello?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = () => {
  const [gameMode, setGameMode] = useState<"Pre" | "Mid" | "Post">("Pre");
  const [gameQuestions, setGameQuestions] =
    useState<FullQuizType>(emptyFullQuiz);
  const [activeQuestion, setActiveQuestion] = useState<QuestionType>();
  const [time, setTime] = useState({
    start: 0,
    end: 0,
    seconds: 0,
  });

  useEffect(() => {
    const gq = generateQuestions(30);
    setGameQuestions(gq);
    setActiveQuestion(gq.questions[0]);
  }, []);

  const intervalCatch = (origin: number) => {
    setInterval(() => {
      const newTime = Date.now();
      setTime({
        start: origin,
        end: 0,
        seconds: Math.round((newTime - origin) / 1000),
      });
    }, 1000);
  };

  const questionString = (q: QuestionType): string => {
    if (q.type === "Scale") {
      return `What is the ${q.degree} of the ${q.scale} ${q.mode} scale?`;
    } else {
      return `What note is the ${q.fret} fret of the ${q.string} string?`;
    }
  };

  const handleAnswer = (note: NoteType) => {
    const activeIndex = gameQuestions.questionsAnswered;
    if (activeQuestion) {
      const editQuestion = { ...activeQuestion };
      editQuestion.answer = note;
      editQuestion.wasAnsweredCorrectly = editQuestion.correctAnswer === note;
      editQuestion.hasBeenAnswered = true;

      const editFull = { ...gameQuestions };
      const editQuestions = [...editFull.questions];
      editQuestions.splice(activeIndex, 1, editQuestion);

      editFull.questions = editQuestions;
      if (editQuestion.correctAnswer === note) {
        editFull.questionsCorrect++;
      }
      editFull.questionsAnswered++;

      setGameQuestions(editFull);
      setActiveQuestion(gameQuestions.questions[activeIndex + 1]);
    }
  };

  const AnswerButtons: React.FC = () => {
    const buttonList = Notes.map((note, index) => {
      return (
        <Button
          key={index}
          variant="secondary"
          onClick={() => {
            handleAnswer(note);
          }}
        >
          {buttonNameMap[note]}
        </Button>
      );
    });
    return <div className="grid grid-cols-4 gap-1">{buttonList}</div>;
  };

  const MidGameBoard: React.FC = () => {
    return (
      <>
        <CardHeader>
          <CardTitle>
            {activeQuestion && questionString(activeQuestion)}
          </CardTitle>
          <CardDescription className="flex justify-between">
            <div>
              Question {gameQuestions.questionsAnswered + 1}/
              {gameQuestions.questions.length}
            </div>
            <div>{time.seconds}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnswerButtons />
        </CardContent>
      </>
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      {gameMode === "Pre" && (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setGameMode("Mid");
              const newStart = Date.now();
              setTime({ start: newStart, end: 0, seconds: 0 });
              intervalCatch(newStart);
            }}
          >
            PLAY
          </Button>
        </div>
      )}
      {gameMode === "Mid" && <MidGameBoard />}
    </Card>
  );
};

export default GameBoard;
