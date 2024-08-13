import { shuffle, random } from "lodash";
import { Notes, type NoteType, type MajorScaleNameType, majorScales, majorScaleNamesIndex, type MinorScaleNameType, minorScales, minorScaleNamesIndex, degreeNames, DegreeNameType, type StringNameType } from "@/data";

export type FullQuizType = {
  questions: (ScaleQuestionType | StringQuestionType)[],
  questionsAnswered: number,
  questionsCorrect: number,
}

export type ScaleQuestionType = {
  scale: MajorScaleNameType | MinorScaleNameType,
  degree: DegreeNameType,
  correctAnswer: any,
  answer: NoteType | null,
  wasAnsweredCorrectly: boolean | null,
  hasBeenAnswered: boolean,
}

export type StringQuestionType = {
  string: StringNameType,
  fret: number,
  correctAnswer: any,
  answer: NoteType | null,
  wasAnsweredCorrectly: boolean | null,
  hasBeenAnswered: boolean,
}

export const scaleQuestions = (amountQ: number): FullQuizType => {
  if(amountQ < 0 && amountQ > 100){
    return {
      questions: [],
      questionsAnswered: 0,
      questionsCorrect: 0,
    };
  }

  const majorQuestion = (): ScaleQuestionType => {
    const activeNote: NoteType = shuffle(Notes)[0];
    const activeScaleName: MajorScaleNameType = majorScaleNamesIndex[activeNote];
    const randomNumber = random(1,6);
    const activeDegree: DegreeNameType = degreeNames[randomNumber - 1];
  
    const newQuestion: ScaleQuestionType = {
      scale: activeScaleName, 
      degree: activeDegree,
      correctAnswer: majorScales[activeNote][randomNumber],
      answer: null,
      wasAnsweredCorrectly: null,
      hasBeenAnswered: false,
    }

    return newQuestion;
  }

  const minorQuestion = (): ScaleQuestionType => {
    const activeNote: NoteType = shuffle(Notes)[0];
    const activeScaleName: MinorScaleNameType = minorScaleNamesIndex[activeNote];
    const randomNumber = random(1,6);
    const activeDegree: DegreeNameType = degreeNames[randomNumber - 1];
  
    const newQuestion: ScaleQuestionType = {
      scale: activeScaleName, 
      degree: activeDegree,
      correctAnswer: minorScales[activeNote][randomNumber],
      answer: null,
      wasAnsweredCorrectly: null,
      hasBeenAnswered: false,
    }

    return newQuestion;
  }

  const questions: ScaleQuestionType[] = [];
  for(let i = 0; i < amountQ; i += 2){
    questions[i] = majorQuestion();
    questions[i + 1] = minorQuestion();
  }

  return {
    questions,
    questionsAnswered: 0,
    questionsCorrect: 0,
  };
}