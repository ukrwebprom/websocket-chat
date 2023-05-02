import { useState, useEffect } from "react";
import { Layout } from "routes/Layout";
import { Mainpage } from "routes/Mainpage";
import { ChatModule } from "./ChatModule/ChatModule";
import { useUser } from 'firebase-func';
import { useWebSocket } from 'server-api';
import './app.scss';



export const App = () => {
  const { user } = useUser();
  const {chatID} = useWebSocket();


  return (
      <Layout>
        {chatID !== ''? <ChatModule /> : <Mainpage />}
      </Layout>
  );
};
