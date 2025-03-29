import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const TodoList = ({data,checked,onHandleCheck,onHandledelete}) => {
  return (
    <li  className="todo-item">
    <span className={checked?"checkList":"notCheckList"}>{data}</span>
    <button className="check-btn" onClick={()=>onHandleCheck(data)}>
      <IoMdCheckmark />
    </button>
    <button className="delete-btn" onClick={()=>onHandledelete(data)}>
    <MdDelete />
    </button>
  </li>
  )
}

