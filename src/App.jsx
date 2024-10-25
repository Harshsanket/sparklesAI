import React from "react";
import Layout from "./Layout";
import Chat_ui_main from "./components/Chat-ui-main";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UseModelContext } from "./context/ContextProvider";
const App = () => {
  return (
    <>
    <UseModelContext>
      <Header/>
      <Chat_ui_main />
      {/* <Footer /> */}
      </UseModelContext>
    </>
  );
};

export default App;
