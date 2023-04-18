import { Routes, Route } from "react-router-dom";
import { Layout } from "routes/Layout";
import { Mainpage } from "routes/Mainpage";
import { Chat } from "routes/Chat";
import { useUser } from 'firebase-func';
import './app.scss';



export const App = () => {
  const { user } = useUser();
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mainpage />} />
          <Route path=":chatID" element={<Chat />} />
{/*           {user? <Route path=":chatID" element={<Chat />} /> :
          <Route path=":chatID" element={<Mainpage />} />} */}
        </Route>
        
      </Routes>
  );
};
