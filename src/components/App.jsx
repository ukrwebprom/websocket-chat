import { Mainpage } from "routes/Mainpage";
import { Chat } from "routes/Chat";
import { Header } from "./Header/Header";
import './app.scss';
import { Routes, Route } from "react-router-dom";
import { Layout } from "routes/Layout";


export const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />
          <Route path=":chatID" element={<Chat />} />
        </Route>
        
      </Routes>
  );
};
