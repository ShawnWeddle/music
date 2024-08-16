"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FullQuizType, QuestionType } from "@/app/questions";
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
import { generateQuestions, emptyFullQuiz } from "@/actions/game.actions";
import { ordinate, secondsTo } from "@/lib/timing";
import { useTimeContext } from "@/reducer/TimeContext";

interface GameBoardProps {
  hello?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = () => {
  const [gameMode, setGameMode] = useState<"Pre" | "Mid" | "Post">("Pre");
  const [gameQuestions, setGameQuestions] =
    useState<FullQuizType>(emptyFullQuiz);
  const [activeQuestion, setActiveQuestion] = useState<QuestionType>();
  const [questionTypes, setQuestionTypes] = useState({
    major: true,
    minor: true,
    guitar: true,
  });
  const { timeState, timeDispatch } = useTimeContext();

  useEffect(() => {
    const gq = generateQuestions(30);
    setGameQuestions(gq);
    setActiveQuestion(gq.questions[0]);
  }, []);

  const intervalCatch = () => {
    setInterval(() => {
      timeDispatch("NEW_SECOND");
    }, 1000);
  };

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
        timeDispatch("WRONG_ANSWER");
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
        <CardHeader>
          <CardTitle>Play the Game</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 w-48 gap-1">
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md pt-1",
                { "bg-blue-500 text-white": questionTypes.major }
              )}
              onClick={() => {
                setQuestionTypes({
                  ...questionTypes,
                  major: !questionTypes.major,
                });
              }}
            >
              <Music />
              <p>Major</p>
            </button>
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md pt-1",
                { "bg-blue-500 text-white": questionTypes.minor }
              )}
              onClick={() => {
                setQuestionTypes({
                  ...questionTypes,
                  minor: !questionTypes.minor,
                });
              }}
            >
              <Music3 />
              <p>Minor</p>
            </button>
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md pt-1",
                { "bg-blue-500 text-white": questionTypes.guitar }
              )}
              onClick={() => {
                setQuestionTypes({
                  ...questionTypes,
                  guitar: !questionTypes.guitar,
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
              setGameMode("Mid");
              timeDispatch("START_CLOCK");
              intervalCatch();
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
          <CardDescription className="text-right">
            {secondsTo(timeState.seconds)}
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
      {gameMode === "Pre" && <PreGameBoard />}
      {gameMode === "Mid" && <MidGameBoard />}
    </Card>
  );
};

export default GameBoard;
