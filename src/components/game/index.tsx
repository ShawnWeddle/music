"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FullQuizType,
  QuestionType,
  QuestionOptionsType,
} from "@/app/questions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Guitar, Music, Music3, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteType, Notes, buttonNameMap } from "@/data";
import { generateQuestions, emptyFullQuiz } from "@/app/questions";
import { ordinate, secondsTo, millisecondsTo, finalTime } from "@/lib/timing";
import Timer from "./Timer";

interface GameBoardProps {
  hello?: boolean;
}

export type GameModeType = "Pre" | "Mid" | "Post";

const GameBoard: React.FC<GameBoardProps> = () => {
  const [gameMode, setGameMode] = useState<GameModeType>("Pre");
  const [gameQuestions, setGameQuestions] =
    useState<FullQuizType>(emptyFullQuiz);
  const [activeQuestion, setActiveQuestion] = useState<QuestionType>();
  const [questionOptions, setQuestionOptions] = useState<QuestionOptionsType>({
    major: true,
    minor: true,
    guitar: true,
  });
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [penalties, setPenalties] = useState({
    major: 0,
    minor: 0,
    guitar: 0,
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
        if (activeQuestion.type === "Scale") {
          if (activeQuestion.mode === "Major") {
            setPenalties({ ...penalties, major: penalties.major + 1 });
          } else {
            setPenalties({ ...penalties, minor: penalties.minor + 1 });
          }
        } else {
          setPenalties({ ...penalties, guitar: penalties.guitar + 1 });
        }
      }
      editFull.questionsAnswered++;

      setGameQuestions(editFull);
      setActiveQuestion(gameQuestions.questions[activeIndex + 1]);
    }
    if (activeIndex === 29) {
      setEndTime(Date.now());
      setGameMode("Post");
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
    const { major, minor, guitar } = questionOptions;
    return (
      <>
        <CardHeader>
          <CardTitle>
            <button className="pr-2">
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
            </button>
          </CardTitle>
          <CardTitle className="text-center">Practice Mode</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="grid grid-cols-3">
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md py-0 px-1 m-2 transition-colors",
                { "bg-blue-500 text-white py-1 px-2 m-1": major }
              )}
              onClick={() => {
                setQuestionOptions({
                  ...questionOptions,
                  major: !major,
                });
              }}
            >
              <div className="pt-1">
                <Music />
              </div>
              <p>Major</p>
            </button>
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md py-0 px-1 m-2 transition-colors",
                { "bg-blue-500 text-white py-1 px-2 m-1": minor }
              )}
              onClick={() => {
                setQuestionOptions({
                  ...questionOptions,
                  minor: !minor,
                });
              }}
            >
              <div className="pt-1">
                <Music3 />
              </div>
              <p>Minor</p>
            </button>
            <button
              className={cn(
                "flex-col flex items-center border-2 rounded-md py-0 px-1 m-2 transition-colors",
                { "bg-blue-500 text-white py-1 px-2 m-1": guitar }
              )}
              onClick={() => {
                setQuestionOptions({
                  ...questionOptions,
                  guitar: !guitar,
                });
              }}
            >
              <div className="pt-1">
                <Guitar />
              </div>
              <p>Guitar</p>
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant={"outline"}
            className="text-2xl"
            disabled={!major && !minor && !guitar}
            onClick={() => {
              const gq = generateQuestions(30, questionOptions);
              setGameQuestions(gq);
              setActiveQuestion(gq.questions[0]);
              setStartTime(Date.now());
              setGameMode("Mid");
            }}
          >
            Start
          </Button>
        </CardFooter>
      </>
    );
  };

  const MidGameBoard: React.FC = () => {
    return (
      <>
        <CardHeader>
          <CardTitle>
            <button
              className="pr-2"
              onClick={() => {
                setStartTime(0);
                setGameMode("Pre");
              }}
            >
              <ArrowLeft />
            </button>
          </CardTitle>
          <Timer origin={startTime} />
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

  const PostGameBoard: React.FC = () => {
    const totalPenalties = penalties.major + penalties.minor + penalties.guitar;
    const ft = finalTime(startTime, endTime, totalPenalties);
    return (
      <>
        <CardHeader>
          <CardTitle>
            <button className="pr-2">
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
            </button>
          </CardTitle>
          <CardTitle className="text-center">
            Good job! Your time is {millisecondsTo(ft.totalTime)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 items-center">
          <table>
            <tbody>
              <tr className="font-semibold">
                <td>Overall</td>
                <td className="text-right">{30 - totalPenalties}/30</td>
              </tr>
              {questionOptions.major && (
                <tr>
                  <td>Major</td>
                  <td className="text-right">
                    {gameQuestions.optionsMap.major - penalties.major}/
                    {gameQuestions.optionsMap.major}
                  </td>
                </tr>
              )}
              {questionOptions.minor && (
                <tr>
                  <td>Minor</td>
                  <td className="text-right">
                    {gameQuestions.optionsMap.minor - penalties.minor}/
                    {gameQuestions.optionsMap.minor}
                  </td>
                </tr>
              )}
              {questionOptions.guitar && (
                <tr>
                  <td>Guitar</td>
                  <td className="text-right">
                    {gameQuestions.optionsMap.guitar - penalties.guitar}/
                    {gameQuestions.optionsMap.guitar}
                  </td>
                </tr>
              )}
              <tr className="block h-4"></tr>
              <tr>
                <td></td>
                <td>{millisecondsTo(ft.subTime)}</td>
              </tr>
              <tr className="text-red-500 border-b border-black">
                <td>{totalPenalties} incorrect + </td>
                <td>{millisecondsTo(ft.penaltyTime)}</td>
              </tr>
              <tr className="font-bold">
                <td>Final: </td>
                <td>{millisecondsTo(ft.totalTime)}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={() => {
              const gq = generateQuestions(30, questionOptions);
              setGameQuestions(gq);
              setActiveQuestion(gq.questions[0]);
              setStartTime(Date.now());
              setEndTime(0);
              setPenalties({
                major: 0,
                minor: 0,
                guitar: 0,
              });
              setGameMode("Mid");
            }}
          >
            Play Again
          </button>
          <button
            onClick={() => {
              setStartTime(Date.now());
              setEndTime(0);
              setPenalties({
                major: 0,
                minor: 0,
                guitar: 0,
              });
              setGameMode("Pre");
            }}
          >
            Change Settings
          </button>
          <button>
            <Link href={"/"}>Back to Menu</Link>
          </button>
        </CardContent>
      </>
    );
  };

  return (
    <>
      <Card className="w-full max-w-2xl">
        {gameMode === "Pre" && <PreGameBoard />}
        {gameMode === "Mid" && <MidGameBoard />}
        {gameMode === "Post" && <PostGameBoard />}
      </Card>
    </>
  );
};

export default GameBoard;
