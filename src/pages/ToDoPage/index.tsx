import { ToDoContextProvider } from "../../contexts/ToDo";
import { Content } from "../../componets/Content"
import { Header } from "../../componets/Header";

export const ToDoPage = () => {
  return (
    <>
      <Header/>
      <ToDoContextProvider>
        <Content/>
      </ToDoContextProvider>
    </>
  );
};
