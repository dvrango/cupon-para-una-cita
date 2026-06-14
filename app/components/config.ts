export const RECIPIENT = "Ruth Abril";
export const QUESTION = "algo que serías muy buena vendiendo pero no quieres 😂";
export const ANSWER_KEYWORDS = ["tup", "top"];
export const DATE_DISPLAY = "Sábado 21 de Junio";
export const TIME_DISPLAY = "8:00 PM";

export const isCorrectAnswer = (input: string) =>
  ANSWER_KEYWORDS.some((kw) => input.toLowerCase().includes(kw));
