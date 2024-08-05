import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = ({
  todos,
  selectedFilter,
  handleEdit,
  editingIndex,
  editedText,
  setEditedText,
  handleSaveEdit,
  handleCancelEdit,
  handleDelete,
  getFilterColor,
}) => {
  return (
    <TransitionGroup component={null}>
      {todos[selectedFilter].map((task, index) => (
        <CSSTransition key={index} timeout={500} classNames="task-item">
          <div
            key={index}
            className="flex justify-between w-[90%] h-auto p-2 m-auto mt-10 font-bold text-black bg-white rounded-2xl taskList"
            style={{
              borderLeft: `5px solid ${
                task.color || getFilterColor(selectedFilter)
              }`,
            }}
          >
            <div className="flex flex-col text-black todo">
              <div className="flex my-2">
                <span
                  className={`flex-shrink-0 w-3 h-3 mx-4 my-auto ${task.color} rounded-full`}
                ></span>
                {editingIndex === index ? (
                  <input
                    type="text"
                    maxLength={90}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="text-black bg-transparent border-none w-[700px] transition-all duration-300 ease-in-out"
                    autoFocus
                  />
                ) : (
                  task.text
                )}
              </div>
              {task.date && (
                <div className="text-sm text-gray-500">
                  {task.date} {task.time}
                </div>
              )}
            </div>
            <div className="flex my-auto">
              {editingIndex === index ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="mt-1 mr-3 transition-all duration-300 ease-in-out w-7 h-7"
                  >
                    <img src="../src/assets/save.svg" alt="save" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="mt-1 mr-3 transition-all duration-300 ease-in-out w-7 h-7"
                  >
                    <img src="../src/assets/cancel.svg" alt="cancel" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="w-10 h-10 ml-2 transition-all duration-300 ease-in-out"
                >
                  <img src="../src/assets/edit.svg" alt="edit" />
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="mt-1 mr-4 transition-all duration-300 ease-in-out w-7 h-7"
              >
                <img src="../src/assets/delete.svg" alt="delete" />
              </button>
            </div>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

TaskList.propTypes = {
  todos: PropTypes.objectOf(PropTypes.array).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  editingIndex: PropTypes.number,
  editedText: PropTypes.string,
  setEditedText: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  getFilterColor: PropTypes.func.isRequired,
};

export default TaskList;
