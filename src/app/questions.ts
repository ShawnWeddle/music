import { shuffle, random } from "lodash";
import { Notes, type NoteType, type MajorScaleNameType, majorScales, majorScaleNamesIndex, type MinorScaleNameType, minorScales, minorScaleNamesIndex, degreeNames, DegreeNameType, type StringNameType, stringNames, fretFinder } from "@/data";

export type FullQuizType = {
  questions: (ScaleQuestionType | StringQuestionType)[],
  questionsAnswered: number,
  questionsCorrect: number,
  options: QuestionOptionsType;
  optionsMap: QuestionMapType;
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

export type QuestionOptionsType = {
  major: boolean,
  minor: boolean,
  guitar: boolean,
}

export type QuestionMapType = {
  major: number,
  minor: number,
  guitar: number,
}

export type QuestionType = StringQuestionType | ScaleQuestionType;

export const emptyFullQuiz: FullQuizType = {
  questions: [],
  questionsAnswered: 0,
  questionsCorrect: 0,
  options: { major: true, minor: true, guitar: true},
  optionsMap: { major: 10, minor: 10, guitar: 10},
}

export const generateQuestions = (amountQ: number, options: QuestionOptionsType): FullQuizType => {
  if(amountQ < 0 && amountQ > 100){
    return emptyFullQuiz;
  }

  const { major, minor, guitar } = options;

  if(!major && !minor && !guitar){
    return emptyFullQuiz;
  }

  const majorQuestion = (): ScaleQuestionType => {
    const activeNote: NoteType = shuffle(Notes)[0];
    const activeScaleName: MajorScaleNameType = majorScaleNamesIndex[activeNote];
    const randomNumber = random(1,6);
    const activeDegree: DegreeNameType = degreeNames[randomNumber];
  
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
    const activeDegree: DegreeNameType = degreeNames[randomNumber];
  
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

  const optionsMap: QuestionMapType = {
    major: 0,
    minor: 0,
    guitar: 0,
  }

  if(major && minor && guitar){
    for(let i = 0; i < amountQ; i += 3){
      questions[i] = majorQuestion();
      optionsMap.major++;
      questions[i + 1] = minorQuestion();
      optionsMap.minor++;
      questions[i + 2] = stringQuestion();
      optionsMap.guitar++;
    }
  } else if (major && minor && !guitar) {
    for(let i = 0; i < amountQ; i += 2){
      questions[i] = majorQuestion();
      optionsMap.major++;
      questions[i + 1] = minorQuestion();
      optionsMap.minor++;
    }
  } else if (major && !minor && guitar) {
    for(let i = 0; i < amountQ; i += 2){
      questions[i] = majorQuestion();
      optionsMap.major++;
      questions[i + 1] = stringQuestion();
      optionsMap.guitar++;
    }
  } else if (!major && minor && guitar) {
    for(let i = 0; i < amountQ; i += 2){
      questions[i] = minorQuestion();
      optionsMap.minor++;
      questions[i + 1] = stringQuestion();
      optionsMap.guitar++;
    }
  } else if (major && !minor && !guitar) {
    for(let i = 0; i < amountQ; i++){
      questions[i] = majorQuestion();
      optionsMap.major++;
    }
  } else if (!major && minor && !guitar) {
    for(let i = 0; i < amountQ; i++){
      questions[i] = minorQuestion();
      optionsMap.minor++;
    }
  } else if (!major && !minor && guitar) {
    for(let i = 0; i < amountQ; i++){
      questions[i] = stringQuestion();
      optionsMap.guitar++;
    }
  }

  return {
    questions,
    questionsAnswered: 0,
    questionsCorrect: 0,
    options: {major, minor, guitar},
    optionsMap,
  };
}