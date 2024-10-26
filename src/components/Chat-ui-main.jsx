import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { gorqChat } from "../gorqApi";
import { Button } from "./ui/button";
import {
  Sparkles,
  SendHorizontal,
  Volume2,
  VolumeOff,
  Copy,
  CircleUserRound,
} from "lucide-react";
import { Input } from "./ui/input";
import { modelContextProvider } from "../context/ContextProvider";
const Chat_ui_main = () => {
  const [userInput, setUserInput] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [reader, setReader] = useState(false);
  const { modelInfo, setVoices, selectedVoice, admin, assistant } =
    modelContextProvider();
  const [isPulsing, setIsPulsing] = useState(false);
  useEffect(() => {
    const retriveUserMessage = localStorage.getItem("userMessages");
    if (retriveUserMessage) {
      setUserMessage(JSON.parse(retriveUserMessage));
    }
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    if (userInput.length > 0 && userInput.trim() !== "") {
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
        admin,
        assistant,
        userMessage,
        model: modelInfo,
      });
      const newMessage = [
        {
          role: "system",
          content: admin ? admin : "",
        },
        {
          role: "user",
          content: userInput,
        },
        {
          role: "assistant",
          content: response,
        },
      ];
      const updatedMessage = [...userMessage, newMessage];
      setUserMessage(updatedMessage);
      localStorage.setItem("userMessages", JSON.stringify(updatedMessage));
      setUserInput("");
    } catch (error) {
      console.log(error);
    }
  };
  const readText = (text) => {
    setReader(true);
    setVoices(window.speechSynthesis.getVoices());
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice || window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
  };

  const stopReader = () => {
    window.speechSynthesis.cancel();
    setReader(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsPulsing(true);

        setTimeout(() => {
          setIsPulsing(false);
        }, 500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <>
      <div className="sticky bottom-0 h-screen flex flex-col">
        <div className="flex-grow p-6 mt-12">
          {userMessage && userMessage.length > 0 ? (
            userMessage.map((message, index) => (
              <div key={index}>
                <p className="mt-2 mb-2 p-2 border rounded border-blue-700 flex">
                  <div className="flex-shrink-0 p-2">
                    <CircleUserRound className="mr-2" />
                  </div>
                  <div className="flex-grow p-2 ">{message[1].content}</div>
                </p>
                <p className="mt-2 mb-4 p-2 border rounded border-blue-400 flex">
                  <div className="flex-shrink-0">
                    <Sparkles className="mr-2" />
                  </div>
                  <div className="flex-grow p-2 ">
                  <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                // Define how to render code blocks
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return inline ? (
                        <code {...props}>{children}</code>
                    ) : (
                        <SyntaxHighlighter
                            style={dracula} // Choose your preferred style
                            language={match ? match[1] : ''}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    );
                },
            }}
            className={"mb-2"}
        >
            {message[2].content}
        </ReactMarkdown>
                    <button
                      onClick={() => copyToClipboard(message.agentMessage)}
                      className={`mr-3 ${isPulsing ? "pulse" : ""}`}
                    >
                      <Copy className="w-4" />
                    </button>
                    {reader ? (
                      <button onClick={stopReader}>
                        <VolumeOff className="w-4" />
                      </button>
                    ) : (
                      <button onClick={() => readText(message.agentMessage)}>
                        <Volume2 className="w-4" />
                      </button>
                    )}
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
              <SendHorizontal className="bg-transparent" />
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
