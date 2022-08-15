import React from "react";
import { Navigate } from "react-router-dom";

const TodoList = () => {
  return (
    <>
      {localStorage.getItem("token") ? (
        <div>todo리스트</div>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
};

export default TodoList;
