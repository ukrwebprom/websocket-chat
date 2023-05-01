import { useState, useEffect } from "react";
import { Layout } from "routes/Layout";
import { Mainpage } from "routes/Mainpage";
import { ChatModule } from "./ChatModule/ChatModule";
import { useUser } from 'firebase-func';
import './app.scss';



export const App = () => {
  const { user } = useUser();
  const [isChat, setIsChat] = useState(false);

  useEffect(() => {
    if(user === null) setIsChat(false);
  }, [user])

  return (
      <Layout>
        {isChat? <ChatModule /> : <Mainpage start={setIsChat}/>}
      </Layout>
  );
};
