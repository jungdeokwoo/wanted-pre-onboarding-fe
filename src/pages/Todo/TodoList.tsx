import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FetchApi from "../../utils/FetchApi";
import { configURL } from "../../config";
import styled from "styled-components";
import { BasicButton } from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import TodoListItem from "../../components/TodoListItem";
import { InputStringValue } from "../../components/InputComponent";

export interface TodoLists {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const TodoList = () => {
  const [todoLists, setTodoLists] = useState<TodoLists[]>([]);
  const [createTodoText, setCreateTodoText] = useState<InputStringValue>({
    todo: "",
  });
  const [modifyItemId, setModifyItemId] = useState<number | null>(null);
  const location = useLocation();
  const FetchTodo = FetchApi();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async function GetTodoLists() {
        const response = await FetchTodo.get(configURL.todo);
        if (response.ok) {
          const result = await response.json();
          setTodoLists(result);
        } else {
          console.log("인터넷 연결을 확인해주세요");
        }
      })();
    }
  }, [location.pathname]);

  const createHandler = async () => {
    const response = await FetchTodo.post(configURL.todo, createTodoText);
    if (response.ok) {
      const result = await response.json();
      setCreateTodoText({ todo: "" });
      const reResponse = await FetchTodo.get(configURL.todo);
      if (reResponse.ok) {
        const result = await reResponse.json();
        setTodoLists(result);
        setModifyItemId(null);
      } else {
        console.log("인터넷 연결을 확인해주세요");
      }
    } else {
      console.log("인터넷 연결을 확인해주세요");
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <ListContainer>
          <ListHeader>
            <ListTitle>해야할 일</ListTitle>
          </ListHeader>
          <CreateContainer>
            <InputWrapper>
              <InputComponent
                setStateValue={setCreateTodoText}
                inputValue={createTodoText.todo}
              >
                todo
              </InputComponent>
            </InputWrapper>
            <CreateTodo disabled={false} onClick={() => createHandler()}>
              Todo 생성하기
            </CreateTodo>
          </CreateContainer>
          <TodoLists>
            {todoLists.map((list) => (
              <TodoListItem
                key={list.id}
                listInfo={list}
                modifyItemId={modifyItemId}
                setTodoLists={setTodoLists}
                setModifyItemId={setModifyItemId}
              />
            ))}
          </TodoLists>
        </ListContainer>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
};

export default TodoList;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 100px auto;

  background-color: aliceblue;
`;

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`;

const ListTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 7;
  font-size: 2rem;
`;

const CreateContainer = styled(ListHeader)``;

const InputWrapper = styled.div`
  flex: 7;
`;

const CreateTodo = styled(BasicButton)`
  flex: 3;
  margin-left: 20px;
`;

const TodoLists = styled.div`
  display: flex;
  flex-direction: column;
`;
