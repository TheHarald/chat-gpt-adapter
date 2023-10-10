import OpenAI from "openai";

export type TRootResponseData<T = void> = {
  message?: string;
  success: boolean;
  data?: T;
};

export type TChatResponseChoice =
  OpenAI.Chat.Completions.ChatCompletion.Choice & { id: string };
