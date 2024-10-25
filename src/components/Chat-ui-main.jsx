import React, { useState, useEffect } from "react";
import { gorqChat } from "../gorqApi";
import { Button } from "./ui/button";
import { Sparkles, SendHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { modelContextProvider } from "../context/ContextProvider";
const Chat_ui_main = () => {
  const [userInput, setUserInput] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const { modelInfo } = modelContextProvider();
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
      const { response } = await gorqChat({
        message: userInput,
        model: modelInfo,
      });
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
      <div className="sticky bottom-0 h-screen flex flex-col">
        <div className="flex-grow p-6 mt-12">
          {userMessage && userMessage.length > 0 ? (
            userMessage.map((message, index) => (
              <div key={index}>
                <p className="mt-2 mb-2 p-2 border rounded border-blue-700">
                  {message.userMessage}
                </p>
                <p className="mt-2 mb-4 p-2 border rounded border-blue-400 flex">
                  <div className="flex-shrink-0">
                    <Sparkles className="mr-2" />
                  </div>
                  <div className="flex-grow">
                    <span>{renderMessage(message.agentMessage)}</span>
                  </div>
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center h-full justify-center">
              <Sparkles />{" "}
              <p className="ml-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600">
                Your journey begins here.
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 w-full p-4 flex justify-center items-center text-center">
          <div className="flex items-center w-full max-w-lg gap-2 text-center">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="p-2 h-12 border-2 border-indigo-500 text-base flex-grow"
              placeholder="Hi, how can I assist you?"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={buttonStatus}
              className="h-12 border-2 border-green-500 hover:bg-green-500 focus:bg-green-500 sm:w-auto w-20"
            >
              <SendHorizontal className="bg-transparent"/>
            </Button>
          </div> 
        </div>
        <div className="flex justify-center items-center text-center text-sm text-gray-600">
          <span className="text-gray-600">
            this assistant can make mistakes.{" "}
            <b className="text-gray-600">please verify all information.</b>
          </span>
        </div>
      </div>
    </>
  );
};

export default Chat_ui_main;
