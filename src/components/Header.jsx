import {
  Sparkles,
  Settings2,
  CircleAlert,
  SendHorizontal,
  CircleX,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getModels } from "../gorqApi";
import { modelContextProvider } from "../context/ContextProvider";
const Header = () => {
  const [models, setModles] = useState([]);
  const [systemRole, setSystemRole] = useState();
  const [systemButtonHelper, setSystemButtonHelper] = useState(false);
  const [assistantButtonHelper, setAssistantButtonHelper] = useState(false);
  const [assistantRole, setAssistantRole] = useState();
  const {
    modelInfo,
    setModelInfo,
    voices,
    selectedVoice,
    setSelectedVoice,
    setAdmin,
    setAssistant,
  } = modelContextProvider();
  const handleSelect = (value) => {
    setModelInfo(value);
  };

  const systemSubmit = () => {
    if (systemRole.trim() === "" || systemRole.length <= 1) return;
    setSystemButtonHelper(true);
    setAdmin(systemRole);
  };
  const systemClear = () => {
    setSystemButtonHelper(false);
    setAssistant("");
    setSystemRole("");
  };
  const assistantSubmit = () => {
    if (assistantRole.trim() === "" || assistantRole.length <= 1) return;
    setAssistantButtonHelper(true);
    setAssistant(assistantRole);
  };
  const assistantClear = () => {
    setAssistantButtonHelper(false);
    setAssistant("");
    setAssistantRole("");
  };

  const voiceSelect = (value) => {
    setSelectedVoice(value);
  };

  const fetchModels = async () => {
    const { models } = await getModels();
    setModles(models.data);
  };

  const deleteData = () => {
    localStorage.removeItem("userMessages");
    window.location.reload();
  };
  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full rounded flex justify-between items-center p-2 bg-neutral-800 z-10">
      <div className="flex-1 text-center flex justify-center bg-neutral-800">
        <Sparkles className="mr-2 bg-neutral-800" />
        <span className="bg-neutral-800 cursor-default">sparklesAI</span>
      </div>
      <div className="mt-1 bg-neutral-800">
        <Sheet>
          <SheetTrigger>
            <Settings2 className="bg-neutral-800" />
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] bg-neutral-950 border-neutral-800">
            <SheetHeader>
              <SheetTitle className={"text-white"}>Settings</SheetTitle>
              <div className="mb-2 flex-1 text-center flex bg-neutral-950">
                <CircleAlert className="bg-neutral-950" />
                <span className="bg-neutral-950">
                  Modify settings only if you are sure about the changes.
                </span>
              </div>
              <SheetDescription className={"text-white bg-neutral-950"}>
                <div className="mb-2">
                  <SheetTitle className={"text-white text-sm mb-1"}>
                    Select Model
                  </SheetTitle>
                  <Select onValueChange={handleSelect}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder={`${modelInfo}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {models ? (
                        models.map((element, index) => (
                          <SelectGroup key={index}>
                            <SelectItem value={element.id}>
                              {element.id}
                            </SelectItem>
                          </SelectGroup>
                        ))
                      ) : (
                        <p>Unable to get models</p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-2">
                  <SheetDescription>
                    <SheetTitle className={"text-white text-sm mb-1"}>
                      Select Voice
                    </SheetTitle>
                    <Select onValueChange={voiceSelect}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue
                          placeholder={`${
                            selectedVoice
                              ? selectedVoice.name
                              : "Device Default"
                          }`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {voices ? (
                          voices.map((element, index) => (
                            <SelectGroup key={index}>
                              <SelectItem value={element}>
                                {element.name}
                              </SelectItem>
                            </SelectGroup>
                          ))
                        ) : (
                          <p>Unable to get models</p>
                        )}
                      </SelectContent>
                    </Select>
                    <SheetTitle className={"text-white text-sm my-2"}>
                      Prefill System
                    </SheetTitle>
                    <div className="flex rounded gap-1 my-2">
                      <Input
                        type="text"
                        value={systemRole}
                        onChange={(e) => setSystemRole(e.target.value)}
                        className="p-2 h-10 text-base flex-grow"
                        placeholder="Enter system role"
                      />
                      {systemButtonHelper ? (
                        <Button
                          type="submit"
                          onClick={systemClear}
                          className="h-10 rounded border border-red-500 hover:bg-red-500 focus:bg-red-500 w-auto "
                        >
                          <CircleX className="bg-transparent" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          onClick={systemSubmit}
                          className="h-10 rounded border border-green-500 hover:bg-green-500 focus:bg-green-500 w-auto "
                        >
                          <SendHorizontal className="bg-transparent" />
                        </Button>
                      )}
                    </div>
                    <SheetTitle className={"text-white text-sm my-2"}>
                      Prefill Agent
                    </SheetTitle>
                    <div className="flex rounded gap-1 my-2">
                      <Input
                        type="text"
                        value={assistantRole}
                        onChange={(e) => setAssistantRole(e.target.value)}
                        className="p-2 h-10 text-base flex-grow"
                        placeholder="Enter assistant role"
                      />
                      {assistantButtonHelper ? (
                        <Button
                          type="submit"
                          onClick={assistantClear}
                          className="h-10 rounded border border-red-500 hover:bg-red-500 focus:bg-red-500 w-auto "
                        >
                          <CircleX className="bg-transparent" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          onClick={assistantSubmit}
                          className="h-10 rounded border border-green-500 hover:bg-green-500 focus:bg-green-500 w-auto "
                        >
                          <SendHorizontal className="bg-transparent" />
                        </Button>
                      )}
                    </div>
                    <br />
                    Chats are stored locally on your device and
                    processed per provider terms. Responses may contain errors;
                    verify information before use. Use responsibly and avoid
                    illegal activity. No liability is assumed for content
                    generated by the model.
                    <br />
                    <br />
                  </SheetDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete Data</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-950 sm:max-w-md">
                      <DialogHeader className={"bg-neutral-950"}>
                        <DialogTitle className={"text-red-500"}>
                          {" "}
                          Delete Data
                        </DialogTitle>
                        <DialogDescription>
                          Warning: This action will permanently delete all
                          locally saved data. Once deleted, it cannot be
                          recovered.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button variant="destructive" onClick={deleteData}>
                            Delete Data
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-700 container flex items-center justify-between p-4 mx-auto sm:space-y-0 sm:flex-row">
                    a <b className="text-sm text-gray-600">Harsh Sanket</b>{" "}
                    production —
                    <a
                      className="hover:text-blue-500 dark:hover:text-custom-blue"
                      href="https://www.github.com/harshsanket"
                    >
                      @Harshsanket
                    </a>
                  </p>
                  <p
                    className="container flex items-center justify-center mx-auto sm:space-y-0 sm:flex-row"
                    to="https://console.groq.com/playground"
                  >
                    <img
                      className="w-auto h-6 sm:h-7"
                      src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg"
                      alt="Logo"
                    />
                  </p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
