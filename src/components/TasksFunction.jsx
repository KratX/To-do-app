import { useState } from "react";
import "../Styles/TasksFunction.css"; // Import the CSS file for animations
import UserProfile from "./UserProfile";
import TaskFilter from "./TaskFilter";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const TasksFunction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);
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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Define colors for each filter
  const filterColors = {
    All: "bg-gray-300",
    Personal: "bg-pink-500",
    Work: "bg-blue-500",
    Chores: "bg-yellow-500",
  };

  // Function to get color for a filter
  const getFilterColor = (filterName) => {
    return filterColors[filterName] || "bg-green-500"; // Default to green if filter is not in the predefined list
  };

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

  const handleAdd = () => {
    if (todo.trim() !== "" && selectedFilter) {
      const newTask = {
        text: todo,
        date,
        time,
        color: getFilterColor(selectedFilter),
        completed: false,
      };
      setTodos((prevTodos) => ({
        ...prevTodos,
        [selectedFilter]: [...prevTodos[selectedFilter], newTask],
        All: [...prevTodos.All, newTask],
      }));
      setTodo("");
      setDate("");
      setTime("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedText(
      selectedFilter === "All"
        ? todos.All[index].text
        : todos[selectedFilter][index].text
    );
    setDate(
      selectedFilter === "All"
        ? todos.All[index].date || ""
        : todos[selectedFilter][index].date || ""
    );
    setTime(
      selectedFilter === "All"
        ? todos.All[index].time || ""
        : todos[selectedFilter][index].time || ""
    );
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      setTodos((prevTodos) => {
        const updatedTodos = {
          ...prevTodos,
          [selectedFilter]: prevTodos[selectedFilter].map((task, i) =>
            i === editingIndex
              ? { ...task, text: editedText, date, time }
              : task
          ),
          All: prevTodos.All.map((task, i) =>
            i === editingIndex
              ? { ...task, text: editedText, date, time }
              : task
          ),
        };
        return updatedTodos;
      });
      setEditingIndex(null);
      setEditedText("");
      setDate("");
      setTime("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedText("");
    setDate("");
    setTime("");
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
          <UserProfile />
          <TaskFilter
            filter={filter}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            handleAddOption={handleAddOption}
            handleDropdown={handleDropdown}
            isOpen={isOpen}
            setNewOption={setNewOption}
            newOption={newOption}
          />
          <div className="mt-4 mb-8">
            <button className="relative flex my-20 text-xl font-extrabold transition-all duration-300 ease-in-out hover:-translate-1 hover:scale-110">
              <img
                className="w-10 h-8 mr-4"
                src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                alt=""
              />
              Settings
            </button>
          </div>
        </div>

        {/* Side Content */}
        <div className="w-3/4 p-6 bg-purple-200">
          <h1 className="mt-10 ml-20 text-2xl font-extrabold text-black">
            Today&apos;s Tasks
          </h1>
          <TaskInput
            showDateTime={showDateTime}
            setShowDateTime={setShowDateTime}
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
            todo={todo}
            setTodo={setTodo}
            handleAdd={handleAdd}
          />
          <TaskList
            todos={todos}
            selectedFilter={selectedFilter}
            handleEdit={handleEdit}
            editingIndex={editingIndex}
            editedText={editedText}
            setEditedText={setEditedText}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleDelete={handleDelete}
            getFilterColor={getFilterColor}
          />
        </div>
      </div>
    </div>
  );
};

TasksFunction.propTypes = {
  // No props to validate at this level
};

export default TasksFunction;
