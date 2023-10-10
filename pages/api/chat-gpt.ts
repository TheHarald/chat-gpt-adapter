import { TChatResponseChoice, TRootResponseData } from "@/types";
import { uuidv4 } from "@/utils/uuid";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const CHAT_GPT_MODEL = "gpt-3.5-turbo";

type TRequestBody = {
  prompt: string;
};

interface TChatGptRequest extends NextApiRequest {
  body: TRequestBody;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: TChatGptRequest,
  res: NextApiResponse<TRootResponseData<TChatResponseChoice[]>>
) {
  const { method } = req;

  if (method === "GET") {
    return res
      .status(200)
      .json({ message: "Обработчик GET запроса", success: true });
  }

  if (method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(200)
        .json({ message: "Запрос должен быть длиннее", success: false });
    }

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: CHAT_GPT_MODEL,
      });

      const choicesWithId = chatCompletion.choices.map((choice) => {
        return {
          ...choice,
          id: uuidv4(),
        };
      });

      return res.status(200).json({
        message: "Propmt send",
        data: choicesWithId,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Произошла непредвиденная ошибка при запросе",
        success: false,
      });
    }
  }

  return res.status(405).json({ message: "Метод не разрешён", success: false });
}
