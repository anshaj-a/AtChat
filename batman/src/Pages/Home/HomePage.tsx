import React from "react";
import { useSelector } from "react-redux";
import Main from "./Components/Main/Main";
import Sidebar from "./Components/Sidebar/Sidebar";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const selectedConversation = useSelector(
    (state: any) => state.selectedConversation
  );

  const { details } = selectedConversation;

  return (
    <div className="bg-dark-400 text-white overflow-y-hidden max-h-screen flex">
      <Sidebar />
      {details ? (
        <Main />
      ) : (
        <div className="sm:hidden w-full flex items-center justify-center">
          <p>Tap a conversation to start talking</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
