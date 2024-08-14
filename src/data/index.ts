export const Notes = ["A", "AB", "B", "C", "CD", "D", "DE", "E", "F", "FG", "G", "GA"] as const;
export type NoteType = typeof Notes[number];
type ScaleType = [NoteType, NoteType, NoteType, NoteType, NoteType, NoteType, NoteType];

const majorScaleNames = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"] as const;
export type MajorScaleNameType = typeof majorScaleNames[number];

export const majorScales: {[Key in NoteType] : ScaleType} = {
  A:  ["A",  "B",  "CD", "D",  "E",  "FG", "GA", ],
  AB: ["AB", "C",  "D",  "DE", "F",  "G",  "A",  ],
  B:  ["B",  "CD", "DE", "E",  "FG", "GA", "AB", ],
  C:  ["C",  "D",  "E",  "F",  "G",  "A",  "B",  ],
  CD: ["CD", "DE", "E",  "FG", "GA", "AB", "B",  ],
  D:  ["D",  "E",  "FG", "G",  "A",  "B",  "CD", ],
  DE: ["DE", "F",  "G",  "GA", "AB", "C",  "D",  ],
  E:  ["E",  "FG", "GA", "A",  "B",  "CD", "DE", ],
  F:  ["F",  "G",  "A",  "AB", "C",  "D",  "E",  ],
  FG: ["FG", "GA", "AB", "B",  "CD", "DE", "F",  ],
  G:  ["G",  "A",  "B",  "C",  "D",  "E",  "FG", ],
  GA: ["GA", "AB", "C",  "CD", "DE", "F",  "G",  ],
}

export const majorScaleNamesIndex: {[Key in NoteType] : MajorScaleNameType} = {
  A:  "A",
  AB: "Bb",
  B:  "B",
  C:  "C",
  CD: "C#",
  D:  "D",
  DE: "Eb",
  E:  "E",
  F:  "F",
  FG: "F#",
  G:  "G",
  GA: "Ab",
}

export const minorScaleNames = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#",] as const;
export type MinorScaleNameType = typeof minorScaleNames[number];

export const minorScales: {[Key in NoteType] : ScaleType} = {
  A:  ["A",  "B",  "C",  "D",  "E",  "F",  "G",  ],
  AB: ["AB", "C",  "CD", "DE", "F",  "FG", "GA", ],
  B:  ["B",  "CD", "D",  "E",  "FG", "G",  "A",  ],
  C:  ["C",  "D",  "DE", "F",  "G",  "GA", "AB", ],
  CD: ["CD", "DE", "E",  "FG", "GA", "A",  "B",  ],
  D:  ["D",  "E",  "E",  "G",  "A",  "AB", "C",  ],
  DE: ["DE", "F",  "FG", "GA", "AB", "B",  "CD", ],
  E:  ["E",  "FG", "G",  "A",  "B",  "C",  "D",  ],
  F:  ["F",  "G",  "GA", "AB", "C",  "CD", "DE", ],
  FG: ["FG", "GA", "A",  "B",  "CD", "D",  "E",  ],
  G:  ["G",  "A",  "AB", "C",  "D",  "DE", "F",  ],
  GA: ["GA", "AB", "B",  "CD", "DE", "E",  "FG", ],
}

export const minorScaleNamesIndex: {[Key in NoteType] : MinorScaleNameType} = {
  A:  "A",
  AB: "Bb",
  B:  "B",
  C:  "C",
  CD: "C#",
  D:  "D",
  DE: "Eb",
  E:  "E",
  F:  "F",
  FG: "F#",
  G:  "G",
  GA: "G#",
}

export const degreeNames = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"] as const;
export type DegreeNameType = typeof degreeNames[number];

export const stringNames = ["E", "A", "D", "G", "B"] as const;
export type StringNameType = typeof stringNames[number];

export const fretFinder = (string: StringNameType, fret: number): NoteType => {
  const startIndex = Notes.indexOf(string);
    const finalIndex = (startIndex + fret) % 12;
    return Notes[finalIndex];
}
