import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function App() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown menu
  const [todos, setTodos] = useState(["Personal", "Work", "Homework"]); // State to store the list of tasks
  const [newOption, setNewOption] = useState(""); // State to manage the new task input field
  const colors = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-green-500",
    "bg-slate-500",
  ];

  // Handler function to add a new task to the list
  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setTodos((prevOptions) => [...prevOptions, newOption]);
      setNewOption(""); // Clear input field
    }
  };

  // Handler function to toggle the visibility of the dropdown menu
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 h-max">
        <div className="w-4/5 p-6 text-black bg-white rounded-lg shadow-xl min-h-[800px] card">
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
              <div className="ml-3">
                <h1 className="text-xl font-semibold cursor-pointer hover:bg-gray-100">
                  Your Username
                </h1>
                <h2 className="text-gray-500 cursor-pointer text-md hover:bg-gray-100">
                  Account Details
                </h2>
              </div>
            </div>
            <div className="h-1 mx-2 my-6 bg-pink-400 rounded-full w-44"></div>
            <div className="relative my-32"></div>
          </div>

          {/* Tasks Section */}
          <div className="relative flex flex-col items-start">
            {/* Button to toggle the dropdown */}
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

            {/* Dropdown menu for tasks */}
            <div
              className={`relative flex flex-col items-start transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 max-h-screen"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              {/* Render tasks */}
              {todos.map((todo, i) => (
                <div key={i} className="relative flex px-2 py-4 left-24">
                  <span
                    className={`w-4 h-4 mx-4 my-2 ${colors[i % colors.length]} rounded-full inline-block`}
                  ></span>
                  <button className="font-bold transition duration-300 ease-in-out delay-150 hover:-translate-1 hover:scale-110">
                    {todo}
                  </button>
                </div>
              ))}

              {/* Input field and button to add a new task */}
              <div className="flex flex-col mt-4 mb-8">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  className="w-40 h-8 p-2 ml-20 mr-2 border border-gray-300 rounded"
                  placeholder="New filter..."
                />
                <button
                  onClick={handleAddOption}
                  className="w-24 h-8 px-4 py-2 my-2 ml-20 text-[12px] text-white bg-blue-500 rounded"
                >
                  Add Filter
                </button>
              </div>
            </div>

            {/* Buttons for Scheduled Tasks and Settings */}
            <div className="mt-4 mb-8">
              <button className="relative flex mt-20 text-xl font-extrabold transition duration-300 ease-in-out delay-150 left-10 hover:-translate-1 hover:scale-110">
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
          {/* Placeholder for potential side panels */}
        </div>
      </div>
    </>
  );
}

export default App;
