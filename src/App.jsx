import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(["Personal", "Freelance", "Homework"]);
  const [newOption, setNewOption] = useState("");
  const [margin, setMargin] = useState("my-12"); // Initial margin

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setNewOption(""); // Clear input field
    }
  };

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
    setMargin((prev) => (prev === "my-12" ? "my-72" : "my-12")); // Toggle margin
  };

  const colors = ["bg-pink-500", "bg-blue-500", "bg-orange-500"];

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-4/5 p-6 text-black bg-white rounded-lg shadow-xl card h-4/5">
          <div className="card-body">
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
              <div className="relative my-20">
                <div className="flex items-center">
                  <img
                    className="w-12 h-10"
                    src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                    alt="IMAGE"
                  />
                  <button
                    onClick={handleDropdown}
                    className="px-4 ml-4 text-2xl font-extrabold transition duration-300 ease-in-out delay-150 hover:-translate-1 hover:scale-110"
                  >
                    Your Tasks
                  </button>
                </div>
                <div
                  className={`absolute p-4 text-xl transition-all duration-300 transform ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } left-20 top-12 rounded-lg`}
                >
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full p-2 mb-2 text-left rounded hover:bg-gray-100"
                    >
                      <span
                        className={`w-4 h-4 mx-2 ${colors[index % colors.length]} rounded-full inline-block`}
                      ></span>
                      {option}
                    </button>
                  ))}
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="New option"
                    />
                    <button
                      onClick={handleAddOption}
                      className="px-2 py-2 my-2 text-sm text-white bg-blue-500 rounded"
                    >
                      Add Option
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-12 h-10"
                    src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                    alt="IMAGE"
                  />
                  <button
                    onClick={handleDropdown}
                    className={`relative px-4 ${margin} ml-4 text-2xl font-extrabold transition duration-300 ease-in-out delay-150 hover:-translate-1 hover:scale-110`}
                  >
                    Scheduled Tasks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
