import React, { useState, useEffect } from "react";
import { gorqChat } from "../gorqApi";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { Input } from "./ui/input";
const Chat_ui_main = () => {
  const [userInput, setUserInput] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);

  useEffect(() => {
    const retriveUserMessage = localStorage.getItem("userMessages");
    if (retriveUserMessage) {
      setUserMessage(JSON.parse(retriveUserMessage));
    }
  }, []);

  useEffect(() => {
    if (userInput.length > 0 && userInput !== " ") {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  }, [userInput]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.length <= 1) return;

    try {
      const { response } = await gorqChat(userInput);
      const newMessage = {
        userMessage: userInput,
        agentMessage: response,
      };
      const updatedMessage = [...userMessage, newMessage];
      setUserMessage(updatedMessage);
      localStorage.setItem("userMessages", JSON.stringify(updatedMessage));
      setUserInput("");
    } catch (error) {
      console.log(error);
    }
  };
  const renderMessage = (message) => {
    // Split the message into lines
    const lines = message.split("\n");

    return (
      <ul>
        {lines.map((line, index) => {
          // Handle bold, italics, and strikethrough formatting
          const formattedLine = line
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
            .replace(/_(.*?)_/g, "<em>$1</em>") // Italics
            .replace(/~(.*?)~/g, "<del>$1</del>"); // Strikethrough

          // If the line starts with '*', render as list item
          if (line.startsWith("*")) {
            const listItem = formattedLine.replace(/^\*\s*/, "").trim();
            return (
              <li key={index} dangerouslySetInnerHTML={{ __html: listItem }} />
            );
          } else {
            // For regular lines, render them as paragraphs
            return (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: formattedLine }}
              />
            );
          }
        })}
      </ul>
    );
  };
  return (
    <>
      <div className="min-h-screen w-auto flex flex-col ">
        <div className="flex-grow p-6">
          {userMessage.map((message, index) => (
            <div key={index}>
              <p className="mt-2 mb-2 p-2 border rounded border-blue-700 ">
                {message.userMessage}
              </p>
              <p className="mt-2 mb-4 p-2 border rounded border-blue-400 flex items-center">
                <Sparkles className="mr-2" />{" "}
                {renderMessage(message.agentMessage)}
              </p>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 w-[100vw] sm:w-[95vw] p-4 flex justify-center items-center text-center">
          <div className="grid w-full max-w-lg gap-2 text-center">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="p-2 h-12 border-2 border-indigo-500 text-base"
              placeholder="Type your query here."
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={buttonStatus}
              className="border-2 border-green-500 hover:bg-green-500"
            >
              Send message
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center text-center text-sm text-gray-600">
          <span className="text-gray-600">
            this bot can make mistakes.{" "}
            <b className="text-gray-600">please verify all information.</b>
          </span>
        </div>
      </div>
    </>
  );
};

export default Chat_ui_main;
