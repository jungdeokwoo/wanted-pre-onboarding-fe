import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";
import { configURL } from "../config";
import { TodoLists } from "../pages/Todo/TodoList";
import FetchApi from "../utils/FetchApi";
import { BasicButton } from "./ButtonComponent";
import InputComponent, { InputStringValue } from "../components/InputComponent";

type TodoListItemProps = {
  (props: {
    listInfo: TodoLists;
    modifyItemId: number | null;
    setTodoLists: Dispatch<SetStateAction<TodoLists[]>>;
    setModifyItemId: Dispatch<SetStateAction<number | null>>;
  }): ReactElement;
};

const TodoListItem: TodoListItemProps = ({
  listInfo,
  modifyItemId,
  setTodoLists,
  setModifyItemId,
}) => {
  const { id, todo, isCompleted } = listInfo;
  const [modifyText, setModifyText] = useState<InputStringValue>({
    todo: todo,
  });
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const fetchTodo = FetchApi();

  const deleteHandler = async () => {
    const response = await fetchTodo.delete(`${configURL.todo}/${id}`);
    if (response.ok) {
      const reResponse = await fetchTodo.get(configURL.todo);
      if (response.ok) {
        const result = await reResponse.json();
        setTodoLists(result);
      }
    }
  };

  const changeForm = (itemId: number) => {
    setModifyItemId(itemId);
  };

  const cancleModify = () => {
    setModifyItemId(null);
    setModifyText({ todo: todo });
    setIsFinished(isCompleted);
  };

  const checkedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFinished(event.target.checked);
  };

  const modifyHandler = async () => {
    const response = await fetchTodo.put(`${configURL.todo}/${id}`, {
      todo: modifyText.todo,
      isCompleted: isFinished,
    });
    if (response.ok) {
      setModifyItemId(null);
      const reResponse = await fetchTodo.get(configURL.todo);
      if (response.ok) {
        const result = await reResponse.json();
        setTodoLists(result);
      }
    }
  };

  return (
    <ItemContainer>
      {modifyItemId === id ? (
        <>
          <InputWrapper>
            <InputComponent
              setStateValue={setModifyText}
              inputValue={modifyText.todo}
            >
              todo
            </InputComponent>
          </InputWrapper>
          <CheckboxWrapper>
            <IsFinishedText>완료</IsFinishedText>
            <TodoCheckbox
              type="checkbox"
              onChange={(event) => checkedHandler(event)}
              checked={isFinished}
            />
          </CheckboxWrapper>
          <ButtonWrapper>
            <ModifyFinish disabled={false} onClick={() => modifyHandler()}>
              수정 완료
            </ModifyFinish>
            <ReturnButton disabled={false} onClick={() => cancleModify()}>
              취소
            </ReturnButton>
          </ButtonWrapper>
        </>
      ) : (
        <>
          <ItemTitle isCompleted={isCompleted}>{todo}</ItemTitle>
          <CompleteText>{isCompleted ? "완료" : "미완료"}</CompleteText>
          <ButtonWrapper>
            <ModifyButton disabled={false} onClick={() => changeForm(id)}>
              수정
            </ModifyButton>
            <DeleteButton disabled={false} onClick={() => deleteHandler()}>
              삭제
            </DeleteButton>
          </ButtonWrapper>
        </>
      )}
    </ItemContainer>
  );
};

export default TodoListItem;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`;

const ItemTitle = styled.p<{ isCompleted: boolean }>`
  display: flex;
  flex: 7;
  align-items: center;
  font-size: 1.3rem;
  ${({ isCompleted }) => {
    if (isCompleted) {
      return css`
        text-decoration: line-through;
        background-color: rgba(255, 0, 0, 0.7);
      `;
    }
  }}
`;

const CompleteText = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-left: 5px;
`;

const ModifyButton = styled(BasicButton)`
  margin-left: 5px;
`;

const DeleteButton = styled(ModifyButton)``;

const InputWrapper = styled.div`
  flex: 7;
  width: 100%;
`;

const CheckboxWrapper = styled(InputWrapper)`
  display: flex;
  align-items: center;
  flex: 1;
`;

const IsFinishedText = styled(CompleteText)`
  flex: auto;
`;

const TodoCheckbox = styled.input`
  width: 15px;
  height: 15px;
`;

const ButtonWrapper = styled(InputWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 2;
`;

const ModifyFinish = styled(ModifyButton)`
  font-size: 1.2rem;
`;

const ReturnButton = styled(ModifyButton)``;
