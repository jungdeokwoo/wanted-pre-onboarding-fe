import React from "react";
import { Navigate } from "react-router-dom";

const TodoList = () => {
  return (
    <>
      {localStorage.getItem("token") ?? <Navigate to={"/"} replace />}
      <div>todo리스트</div>
    </>
  );
};

export default TodoList;
