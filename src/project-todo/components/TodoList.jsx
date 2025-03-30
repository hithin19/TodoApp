import React, { useState } from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const TodoList = ({ id, data, checked, onHandleCheck, onHandledelete, onHandleEdit }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(data)

  const handleSave = () => {
    if (editContent.trim()) {
      onHandleEdit(id, editContent)
      setIsEdit(false);
    }
  }
  return (

    <li className="todo-item">
      {
        isEdit ? (
          <>
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className='edit-input'
            />
            <button className="save-btn" onClick={handleSave}>
              save
            </button>
          </>
        ) : (
          <>
            <span className={checked ? "checkList" : "notCheckList"}>{data}</span>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => setIsEdit(true)}>
                <FaEdit />
              </button>
              <button className="check-btn" onClick={() => onHandleCheck(id)}>
                <IoMdCheckmark />
              </button>
              <button className="delete-btn" onClick={() => onHandledelete(id)}>
                <MdDelete />
              </button>
            </div>
          </>
        )
      }
    </li>

  )
}
