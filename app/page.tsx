"use client";
import ChatResponseMessage from "@/components/chat-response-message";
import useLocalStorage from "@/hooks/use-local-storage";
import { searchRequest } from "@/requests/request-functions";
import { TChatResponseChoice } from "@/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [chatChoices, _, deleteChoiceById, addChoice] =
    useLocalStorage<TChatResponseChoice>("answers", []);

  const searchHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue("");
    setIsLoading(true);
    searchRequest({ prompt: inputValue }).then((data) => {
      console.log(data);
      addChoice(data?.data);
      setIsLoading(false);
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col gap-8 flex-1">
      <form onSubmit={searchHandler} className="flex flex-row gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          type="search"
        />
        <Button type="submit"> Спросить</Button>
      </form>
      <div className="flex flex-col gap-2">
        {chatChoices.map((choice, index) => {
          return (
            <ChatResponseMessage
              key={index}
              id={choice.id}
              message={choice.message.content || "Текста нет"}
              deleteHandler={deleteChoiceById}
            />
          );
        })}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
}
