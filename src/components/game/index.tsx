"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FullQuizType, QuestionType, QuizOptionsType } from "@/app/questions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Guitar, Music, Music3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteType, Notes, buttonNameMap } from "@/data";
import { generateQuestions, emptyFullQuiz } from "@/app/questions";
import { ordinate } from "@/lib/timing";
import { TimeContextProvider } from "@/reducer/TimeContext";
import TimeBar from "./TimePoint";

interface GameBoardProps {
  hello?: boolean;
}

export type GameModeType = "Pre" | "Mid" | "Post";

const GameBoard: React.FC<GameBoardProps> = () => {
  const [gameMode, setGameMode] = useState<GameModeType>("Pre");
  const [gameQuestions, setGameQuestions] =
    useState<FullQuizType>(emptyFullQuiz);
  const [activeQuestion, setActiveQuestion] = useState<QuestionType>();
  const [questionOptions, setQuestionOptions] = useState<QuizOptionsType>({
    major: true,
    minor: true,
    guitar: true,
  });

  const questionString = (q: QuestionType): string => {
    if (q.type === "Scale") {
      return `What is the ${q.degree} of the ${q.scale} ${q.mode} scale?`;
    } else {
      return `What note is the ${ordinate(q.fret)} fret of the ${
        q.string
      } string?`;
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
      } else {
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

  const PreGameBoard: React.FC = () => {
    return (
      <>
        <CardHeader className="text-center">
          <CardTitle>Play the Game</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="grid grid-cols-3 w-48 gap-1">
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md pt-1",
                { "bg-blue-500 text-white": questionOptions.major }
              )}
              onClick={() => {
                setQuestionOptions({
                  ...questionOptions,
                  major: !questionOptions.major,
                });
              }}
            >
              <Music />
              <p>Major</p>
            </button>
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md pt-1",
                { "bg-blue-500 text-white": questionOptions.minor }
              )}
              onClick={() => {
                setQuestionOptions({
                  ...questionOptions,
                  minor: !questionOptions.minor,
                });
              }}
            >
              <Music3 />
              <p>Minor</p>
            </button>
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md pt-1",
                { "bg-blue-500 text-white": questionOptions.guitar }
              )}
              onClick={() => {
                setQuestionOptions({
                  ...questionOptions,
                  guitar: !questionOptions.guitar,
                });
              }}
            >
              <Guitar />
              <p>Guitar</p>
            </button>
          </div>
          <Button
            variant={"ghost"}
            onClick={() => {
              const gq = generateQuestions(30, questionOptions);
              setGameQuestions(gq);
              setActiveQuestion(gq.questions[0]);
              setGameMode("Mid");
            }}
          >
            START
          </Button>
        </CardContent>
      </>
    );
  };

  const MidGameBoard: React.FC = () => {
    return (
      <>
        <CardHeader>
          <CardTitle>
            {activeQuestion && questionString(activeQuestion)}
          </CardTitle>
          <CardDescription className="flex justify-between">
            Question {gameQuestions.questionsAnswered + 1}/
            {gameQuestions.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnswerButtons />
        </CardContent>
      </>
    );
  };

  interface TimingPointProps {
    mode: GameModeType;
  }

  const TimingPoint: React.FC<TimingPointProps> = (props: TimingPointProps) => {
    return (
      <TimeContextProvider>
        <TimeBar mode={props.mode} />
      </TimeContextProvider>
    );
  };

  return (
    <>
      <TimingPoint mode={gameMode} />
      <Card className="w-full max-w-2xl">
        {gameMode === "Pre" && <PreGameBoard />}
        {gameMode === "Mid" && <MidGameBoard />}
      </Card>
    </>
  );
};

export default GameBoard;
