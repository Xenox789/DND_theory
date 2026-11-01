export type Language = "hu" | "en";

export type LocalizedText = {
  hu: string;
  en: string;
};

export type KeyTerm = {
  term: string;
  hu?: string;
};

export type FormulaTerm = {
  symbol: string;
  hu: string;
  en: string;
};

export type LessonSection = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  why?: LocalizedText;
  intuition?: LocalizedText;
  formula?: LocalizedText;
  formulaTerms?: FormulaTerm[];
  workedExample?: LocalizedText;
  connections?: LocalizedText;
  realWorld?: LocalizedText;
  examTrap?: LocalizedText;
  keyTerms?: KeyTerm[];
};

export type Lesson = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  source: string;
  sections: LessonSection[];
};

export type Choice = {
  id: string;
  text: LocalizedText;
};

export type Question = {
  id: string;
  topics: string[];
  prompt: LocalizedText;
  choices: Choice[];
  correctIds: string[];
  explanation: LocalizedText;
};
