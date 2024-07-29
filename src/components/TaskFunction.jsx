import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TasksFunction.css"; // Import the CSS file for animations

const TasksFunction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(["All", "Personal", "Work", "Chores"]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState({
    All: [],
    Personal: [],
    Work: [],
    Chores: [],
  });
  const [newOption, setNewOption] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const colors = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-green-500",
    "bg-slate-500",
  ];

  const handleAddOption = () => {
    if (newOption.trim() !== "" && !filter.includes(newOption)) {
      setFilter((prevOptions) => [...prevOptions, newOption]);
      setTodos((prevTodos) => ({ ...prevTodos, [newOption]: [] }));
      setNewOption("");
    }
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSchedule = () => {
    setIsOpen(false);
  };

  const handleAdd = () => {
    if (todo.trim() !== "" && selectedFilter) {
      setTodos((prevTodos) => {
        const updatedTodos = {
          ...prevTodos,
          [selectedFilter]: [
            ...prevTodos[selectedFilter],
            { text: todo, completed: false },
          ],
          All: [...prevTodos.All, { text: todo, completed: false }],
        };
        return updatedTodos;
      });
      setTodo("");
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedText(
      selectedFilter === "All"
        ? todos.All[index].text
        : todos[selectedFilter][index].text
    );
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      setTodos((prevTodos) => {
        const updatedTodos = {
          ...prevTodos,
          [selectedFilter]: prevTodos[selectedFilter].map((task, i) =>
            i === editingIndex ? { ...task, text: editedText } : task
          ),
          All: prevTodos.All.map((task, i) =>
            i === editingIndex ? { ...task, text: editedText } : task
          ),
        };
        return updatedTodos;
      });
      setEditingIndex(null);
      setEditedText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedText("");
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = {
        ...prevTodos,
        [selectedFilter]: prevTodos[selectedFilter].filter(
          (_, i) => i !== index
        ),
        All: prevTodos.All.filter((_, i) => i !== index),
      };
      return updatedTodos;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-4/5 p-6 text-black bg-white rounded-lg shadow-xl min-h-[800px] flex">
        {/* Main Content */}
        <div className="flex-1">
          {/* User Profile Section */}
          <div className="w-1/4">
            <div className="flex items-center mb-4">
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100"
                  src="https://cdn3.iconfinder.com/data/icons/glyphicon/64/profil-circle-512.png"
                  alt="User"
                />
              </div>
              <img
                className="w-20 h-12 cursor-pointer hover:bg-gray-100"
                src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                alt="User"
              />
              <div className="flex flex-col ml-3 ">
                <h1 className="flex text-xl font-semibold transition duration-300 ease-in-out delay-150 cursor-pointer hover:bg-gray-100 left-10 hover:-translate-1 hover:scale-110">
                  Your Username
                </h1>
                <h2 className="text-gray-500 transition duration-300 ease-in-out delay-150 cursor-pointer w-44 text-md hover:bg-gray-100 left-10 hover:-translate-1 hover:scale-110">
                  Account Details
                </h2>
              </div>
            </div>
            <div className="h-1 mx-2 my-12 ml-16 bg-pink-400 rounded-full w-44"></div>
            <div className="relative my-32"></div>
          </div>

          {/* Tasks Section */}
          <div className="relative flex flex-col items-start">
            <button
              className="relative flex my-8 text-xl font-extrabold transition duration-300 ease-in-out delay-150 left-10 hover:-translate-1 hover:scale-110"
              onClick={handleDropdown}
            >
              <img
                className="w-10 h-8 mr-4"
                src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                alt=""
              />
              Your Tasks
              {!isOpen ? (
                <AiOutlineCaretDown className="h-8 ml-2" />
              ) : (
                <AiOutlineCaretUp className="h-8 ml-2" />
              )}
            </button>

            <div
              className={`relative flex flex-col items-start transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 max-h-screen"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              {filter.map((item, i) => (
                <div key={i} className="relative flex px-2 py-4 left-24">
                  <span
                    className={`w-4 h-4 mx-4 my-2 ${colors[i % colors.length]} rounded-full inline-block`}
                  ></span>
                  <button
                    className={`font-bold transition duration-300 ease-in-out delay-150 hover:-translate-1 hover:scale-110 ${
                      selectedFilter === item ? "text-blue-600" : "text-black"
                    }`}
                    onClick={() => setSelectedFilter(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}

              <div className="flex flex-col mt-4 mb-8">
                <input
                  maxLength={20}
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="w-40 h-8 p-2 ml-20 mr-2 border border-gray-300 rounded"
                  placeholder="New filter..."
                />
                <button
                  onClick={handleAddOption}
                  className="w-24 h-8 my-2 ml-20 text-[12px] text-white bg-black rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300"
                >
                  Add Filter
                </button>
              </div>
            </div>

            <div className="mt-4 mb-8">
              <button
                onClick={handleSchedule}
                className="relative flex mt-20 text-xl font-extrabold transition duration-300 ease-in-out delay-150 left-10 hover:-translate-1 hover:scale-110"
              >
                <img
                  className="w-10 h-8 mr-4"
                  src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                  alt=""
                />
                Scheduled Tasks
              </button>
            </div>
            <div className="mt-4 mb-8">
              <button className="relative flex my-20 text-xl font-extrabold transition duration-300 ease-in-out delay-150 left-10 hover:-translate-1 hover:scale-110">
                <img
                  className="w-10 h-8 mr-4"
                  src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                  alt=""
                />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Side Content */}
        <div className="w-3/4 p-6 bg-purple-200">
          <h1 className="mt-10 ml-20 text-2xl font-extrabold text-black">
            Today&apos;s Tasks
          </h1>
          <div className="relative flex flex-col items-center">
            <div className="relative w-3/4">
              <span className="absolute flex items-center space-x-2 left-4 top-12">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </span>

              <input
                className="w-full p-2 mt-6 font-bold text-black bg-white px-28 h-14 rounded-2xl"
                type="text"
                maxLength={90}
                placeholder="What is your new task?"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <span>
                <button>
                  <img
                    className="absolute w-6 h-6 bg-white bottom-[58px] right-16"
                    src="https://static-00.iconduck.com/assets.00/clock-icon-1024x1024-6y43zsm6.png"
                    alt="time"
                  />
                </button>
                <button>
                  <img
                    className="absolute w-10 h-8 bg-white bottom-14 right-4"
                    src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                    alt="date"
                  />
                </button>
              </span>
              <div className="flex flex-col items-end">
                <button
                  onClick={handleAdd}
                  className="w-20 h-7 mt-4 text-[12px] text-white bg-purple-600 rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>

          <TransitionGroup className="flex flex-col items-center">
            {selectedFilter === "All"
              ? todos.All.map((task, index) => (
                  <CSSTransition key={index} timeout={500} classNames="task">
                    <div className="flex justify-between w-[90%] h-auto p-2 m-auto mt-10 font-bold text-black bg-white rounded-2xl taskList">
                      <div className="flex my-2 text-black todo">
                        <span
                          className={`flex-shrink-0 w-3 h-3 mx-4 my-auto ${colors[index % colors.length]} rounded-full`}
                        ></span>
                        {editingIndex === index ? (
                          <input
                            type="text"
                            maxLength={90}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="text-black bg-transparent border-none w-[700px]"
                            autoFocus
                          />
                        ) : (
                          task.text
                        )}
                      </div>
                      <div className="flex my-auto">
                        {editingIndex === index ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="mt-1 mr-3 w-7 h-7"
                            >
                              <img src="../src/assets/save.svg" alt="save" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="mt-1 mr-3 w-7 h-7"
                            >
                              <img
                                src="../src/assets/cancel.svg"
                                alt="cancel"
                              />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEditClick(index)}
                            className="w-10 h-10 ml-2"
                          >
                            <img src="../src/assets/edit.svg" alt="edit" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(index)}
                          className="mt-1 mr-4 w-7 h-7"
                        >
                          <img src="../src/assets/delete.svg" alt="delete" />
                        </button>
                      </div>
                    </div>
                  </CSSTransition>
                ))
              : todos[selectedFilter].map((task, index) => (
                  <CSSTransition key={index} timeout={500} classNames="task">
                    <div className="flex justify-between w-[90%] h-auto p-2 m-auto mt-10 font-bold text-black bg-white rounded-2xl taskList">
                      <div className="flex my-2 text-black todo">
                        <span
                          className={`flex-shrink-0 w-3 h-3 mx-4 my-auto ${colors[index % colors.length]} rounded-full`}
                        ></span>
                        {editingIndex === index ? (
                          <input
                            type="text"
                            maxLength={90}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="text-black bg-transparent border-none w-[700px]"
                            autoFocus
                          />
                        ) : (
                          task.text
                        )}
                      </div>
                      <div className="flex my-auto">
                        {editingIndex === index ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="mt-1 mr-3 w-7 h-7"
                            >
                              <img src="../src/assets/save.svg" alt="save" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="mt-1 mr-3 w-7 h-7"
                            >
                              <img
                                src="../src/assets/cancel.svg"
                                alt="cancel"
                              />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEditClick(index)}
                            className="w-10 h-10 ml-2"
                          >
                            <img src="../src/assets/edit.svg" alt="edit" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(index)}
                          className="mt-1 mr-4 w-7 h-7"
                        >
                          <img src="../src/assets/delete.svg" alt="delete" />
                        </button>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default TasksFunction;
