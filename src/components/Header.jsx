import { Sparkles, Settings2, CircleAlert } from "lucide-react";
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

import { getModels } from "../gorqApi";
import { modelContextProvider } from "../context/ContextProvider";
const Header = () => {
  const [models, setModles] = useState([]);
  const { modelInfo, setModelInfo, voices, selectedVoice, setSelectedVoice } = modelContextProvider();
  const handleSelect = (value) => {
    setModelInfo(value);
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
        <span className="bg-neutral-800">sparklesAI</span>
      </div>
      <div className="mt-1 bg-neutral-800">
        <Sheet>
          <SheetTrigger>
            <Settings2 className="bg-neutral-800" />
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] bg-neutral-950">
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
                      <SelectValue placeholder={`${selectedVoice ? selectedVoice.name : 'Default'}`} />
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
                  <br />
                    No user data is saved to the cloud. Chats are stored locally
                    on your device.
                    <br />
                    Chats are processed by the model according to the terms and
                    conditions set by the provider.
                    <br />
                    While the model aims for accuracy, it can make mistakes.
                    Users must verify all information before use.
                    <br />
                    <br />
                  </SheetDescription>
                  <Dialog >
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
