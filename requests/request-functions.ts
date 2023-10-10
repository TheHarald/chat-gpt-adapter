import { TChatResponseChoice, TRootResponseData } from "@/types";

export async function typedFetch<RequestType, ResponseType>(
  url: string,
  method: string,
  requestBody?: RequestType
): Promise<ResponseType> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const responseData: ResponseType = await response.json();
  return responseData;
}

type TSearchRequestBody = {
  prompt: string;
};

export async function searchRequest(data: TSearchRequestBody) {
  return typedFetch<
    TSearchRequestBody,
    TRootResponseData<TChatResponseChoice[]>
  >("/api/chat-gpt", "POST", data);
}
