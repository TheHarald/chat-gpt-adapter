import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

type TChatResponseMessageProps = {
  message: string;
  deleteHandler: (id: string) => void;
  id: string;
};

function ChatResponseMessage(props: TChatResponseMessageProps) {
  const { message, deleteHandler, id } = props;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-end">
        <Button onClick={() => deleteHandler(id)} color="danger">
          Удалить
        </Button>
      </CardHeader>
      <CardBody>
        <Markdown rehypePlugins={[rehypeHighlight]}>{message}</Markdown>
      </CardBody>
    </Card>
  );
}

export default ChatResponseMessage;
