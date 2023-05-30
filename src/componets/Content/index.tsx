import style from "./index.module.css";
import Plus from "../../assets/plus.svg";
import { NoContent } from "../NoContent";
import { useState, useEffect} from "react";
import { TodoList } from "../TodoList";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../api";
import useToDoContext from "../../hooks/useToDoContext";

export const Content = () => {
  const [description, setDescription] = useState<string>("");

  const { taskListState, setTaskListState } = useToDoContext();

  const tasksDone = taskListState.filter((task) => {
    return task.isDone !== false;
  });

  const disabledButton = !description.length;

  const addTaskOnList = () => {
    const newTask = {
      id: uuidv4(),
      description,
      isDone: false,
    };

    api
      .post("task", newTask)
      .then((response) => {
        setTaskListState((currentValue) => [...currentValue, newTask]);
      })
      .finally(() => {
        setDescription("");
      });
  };

  const removeTaskOnDelete = (id: string) => {
    setTaskListState((currentValue) =>
      currentValue.filter((task) => task.id !== id)
    );

    api.delete("task/" + id).then((response) => {
      setTaskListState((currentValue) =>
        currentValue.filter((task) => task.id !== id)
      );
    });
  };

  const changeStatusCheckBox = (id: string) => {
    const task = taskListState.find((task) => task.id === id);

    if (task) {
      api.patch("task/"+ task.id, {
        isDone: !task.isDone
      })
    }

    const elements = taskListState.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          isDone: !task.isDone,
        };
      }

      return task;
    });

    setTaskListState(elements);
  };

  useEffect(() => {
    api
      .get("task")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setTaskListState(data);
      });
  }, []);

  return (
    <section className={style.section_container}>
      <main>
        <article className={style.input_container}>
          <input
            className={style.input}
            type="text"
            value={description}
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <article>
            <button
              className={style.button}
              disabled={disabledButton}
              onClick={() => addTaskOnList()}
            >
              Criar
              <img src={Plus} alt="Logo de mais"></img>
            </button>
          </article>
        </article>
        <article className={style.content_header}>
          <article className={style.tasks_container}>
            <p className={style.task_created}>Tarefas Criadas</p>
            <span className={style.span_value}>{taskListState.length}</span>
          </article>
          <article className={style.tasks_container}>
            <p className={style.tasks_done}>Concluidas</p>
            <span className={style.span_value}>
              {" "}
              {tasksDone.length} de {taskListState.length}
            </span>
          </article>
        </article>

        {!taskListState.length ? (
          <NoContent />
        ) : (
          <TodoList
            changeStatusCheckBox={changeStatusCheckBox}
            onDelete={removeTaskOnDelete}
          />
        )}
      </main>
    </section>
  );
};
