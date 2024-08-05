import PropTypes from "prop-types";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

const TaskFilter = ({
  filter,
  selectedFilter,
  setSelectedFilter,
  handleAddOption,
  handleDropdown,
  isOpen,
  setNewOption,
  newOption,
}) => {
  const filterColors = {
    All: "bg-gray-300",
    Personal: "bg-pink-500",
    Work: "bg-blue-500",
    Chores: "bg-yellow-500",
  };

  const getFilterColor = (filterName) => {
    return filterColors[filterName] || "bg-green-500";
  };

  return (
    <div className="relative flex flex-col items-start">
      <button
        className="relative flex my-8 text-xl font-extrabold transition-all duration-300 ease-in-out hover:-translate-1 hover:scale-110"
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
              className={`w-4 h-4 mx-4 my-2 ${getFilterColor(item)} rounded-full inline-block`}
            ></span>
            <button
              className={`font-bold transition-all duration-300 ease-in-out hover:-translate-1 hover:scale-110 ${
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
            className="w-40 h-8 p-2 ml-20 mr-2 transition-all duration-300 ease-in-out border border-gray-300 rounded"
            placeholder="New filter..."
          />
          <button
            onClick={handleAddOption}
            className="w-24 h-8 my-2 ml-20 text-[12px] text-white bg-black rounded-lg tracking-wider border-4 border-transparent active:border-white transition-all duration-300 ease-in-out"
          >
            Add Filter
          </button>
        </div>
      </div>
    </div>
  );
};

TaskFilter.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setNewOption: PropTypes.func.isRequired,
  newOption: PropTypes.string.isRequired,
};

export default TaskFilter;
