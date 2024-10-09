/* eslint-disable react/react-in-jsx-scope */

import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import PropTypes from "prop-types";
import fountain from "../assets/fountain-pen.png";
import pen from "../assets/pen.png"
import icon_delete from "../assets/delete_icon.png";

const TodoItems = ({
  text,
  index,
  id,
  isComplete,
  deleteTodo,
  toggle,
  isEditing,
  editText,
  setEditText,
  saveEdit,
  startEditing,
  createdAt,
  darkMode,
  status,
}) => {
  const ToggleEvent = (id) => {
    toggle(id);
  };
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <tr
      className={`border-b ${darkMode ? "border-gray-600" : "border-gray-300"}`}
    >
      {/* Cột số thứ tự */}
      <td className="p-2 text-center">{index}</td>

      {/* Cột Task */}
      <td className="p-2 text-center">
        <div className="flex items-center">
          <img
            src={isComplete ? tick : not_tick}
            alt="status"
            className="w-7 cursor-pointer"
            onClick={() => ToggleEvent(id)}
          />
          <td className="p-2 text-left">
            {isEditing ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    saveEdit(id);
                  }
                }}
                className={`ml-4 border rounded p-1 w-full resize-none ${
                  darkMode ? "bg-gray-600 text-white" : "text-black"
                }`}
                style={{ maxWidth: "200px", height: "auto", wordWrap: "break-word", whiteSpace: "normal" }}
                rows="3"  // Number of visible rows
              />
            ) : (
              <div
                className={`text-[17px] decoration-slate-500 ${
                  isComplete ? (darkMode ? "text-red-500" : "line-through") : ""
                } ${darkMode ? "text-white " : "text-black"} break-words`}
                style={{ maxWidth: "200px", wordWrap: "break-word", whiteSpace: "normal" }}
              >
                {text}
              </div>
            )}
          </td>
        </div>
      </td>

      {/* Cột thời gian */}
      <td className="p-2 text-center">{formattedDate}</td>

      {/* Cột trạng thái */}
      <td
        className={`p-2 text-center ${
          status === "Complete"
            ? "text-green-500"
            : status === "In Progress"
            ? "text-yellow-500"
            : "text-gray-500"
        } ${darkMode ? "text-white" : "text-black"}`}
      >
        {status}
      </td>

      {/* Cột hành động */}
      <td className="p-2 text-center">
        <div className="flex justify-center items-center gap-2">
          {isEditing ? (
            <button onClick={() => saveEdit(id)} className={`${darkMode ? "text-white" : "text-black"}`}>
              Save
            </button>
          ) : (
            <img
              onClick={() => startEditing(id, text)}
              src={darkMode ? pen : fountain}
              alt="Edit"
              className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          )}
          <img
            onClick={() => deleteTodo(id)}
            src={darkMode? icon_delete : delete_icon}
            alt="delete"
            className="w-3.5 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>
      </td>
    </tr>
  );
};
TodoItems.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editText: PropTypes.string.isRequired,
  setEditText: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
  startEditing: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  darkMode: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

export default TodoItems;
