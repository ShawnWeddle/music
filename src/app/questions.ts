import { shuffle, random } from "lodash";
import { Notes, type NoteType, type MajorScaleNameType, majorScales, majorScaleNamesIndex, type MinorScaleNameType, minorScales, minorScaleNamesIndex, degreeNames, DegreeNameType, type StringNameType, stringNames, fretFinder } from "@/data";

export type FullQuizType = {
  questions: (ScaleQuestionType | StringQuestionType)[],
  questionsAnswered: number,
  questionsCorrect: number,
}

type ScaleQuestionType = {
  type: "Scale",
  mode: "Major" | "Minor",
  scale: MajorScaleNameType | MinorScaleNameType,
  degree: DegreeNameType,
  correctAnswer: NoteType,
  answer: NoteType | null,
  wasAnsweredCorrectly: boolean | null,
  hasBeenAnswered: boolean,
}

type StringQuestionType = {
  type: "String",
  string: StringNameType,
  fret: number,
  correctAnswer: NoteType,
  answer: NoteType | null,
  wasAnsweredCorrectly: boolean | null,
  hasBeenAnswered: boolean,
}

export type QuestionType = StringQuestionType | ScaleQuestionType;

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
      type: "Scale",
      mode: "Major",
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
      type: "Scale",
      mode: "Minor",
      scale: activeScaleName, 
      degree: activeDegree,
      correctAnswer: minorScales[activeNote][randomNumber],
      answer: null,
      wasAnsweredCorrectly: null,
      hasBeenAnswered: false,
    }

    return newQuestion;
  }

  const stringQuestion = (): StringQuestionType => {
    const activeString: StringNameType = shuffle(stringNames)[0];
    const activeFret = random(1,24);

    const newQuestion: StringQuestionType = {
      type: "String",
      string: activeString,
      fret: activeFret,
      correctAnswer: fretFinder(activeString, activeFret),
      answer: null,
      wasAnsweredCorrectly: null,
      hasBeenAnswered: false,
    }

    return newQuestion;
  }

  const questions: (ScaleQuestionType | StringQuestionType)[] = [];
  for(let i = 0; i < amountQ; i += 3){
    questions[i] = majorQuestion();
    questions[i + 1] = minorQuestion();
    questions[i + 2] = stringQuestion();
  }

  return {
    questions,
    questionsAnswered: 0,
    questionsCorrect: 0,
  };
}