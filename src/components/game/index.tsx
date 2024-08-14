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
  let questions;

  const [gameQuestions, setGameQuestions] =
    useState<FullQuizType>(emptyFullQuiz);
  const [activeQuestion, setActiveQuestion] = useState<QuestionType>();

  useEffect(() => {
    const gq = generateQuestions(30);
    setGameQuestions(gq);
    setActiveQuestion(gq.questions[0]);
  }, []);

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

      console.log(editFull);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {activeQuestion && questionString(activeQuestion)}
        </CardTitle>
        <CardDescription>
          Question {gameQuestions.questionsAnswered + 1}/
          {gameQuestions.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnswerButtons />
      </CardContent>
    </Card>
  );
};

export default GameBoard;
