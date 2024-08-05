import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const TaskInput = ({
  showDateTime,
  setShowDateTime,
  time,
  setTime,
  date,
  setDate,
  todo,
  setTodo,
  handleAdd,
}) => {
  return (
    <>
      <CSSTransition
        in={showDateTime}
        timeout={300}
        classNames="input-transition"
        unmountOnExit
      >
        <div className="flex flex-row justify-end w-[97%]">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 mx-2 mt-2 font-bold text-black transition-all duration-300 ease-in-out bg-white w-44 rounded-2xl"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 mx-2 mt-2 font-bold text-black transition-all duration-300 ease-in-out bg-white w-44 rounded-2xl"
          />
        </div>
      </CSSTransition>

      <div className="relative flex flex-col items-center">
        <div className="relative w-3/4">
          <span className="absolute flex items-center space-x-2 left-4 top-12">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </span>
          <input
            className="w-full p-2 mt-6 font-bold text-black transition-all duration-300 ease-in-out bg-white px-28 h-14 rounded-2xl"
            maxLength={90}
            type="text"
            placeholder="What is your new task?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <span>
            <button
              className="transition-all duration-300 ease-in-out time date"
              onClick={() => setShowDateTime(!showDateTime)}
            >
              <img
                className="absolute w-10 h-8 transition-all duration-300 ease-in-out bg-white bottom-14 right-4"
                src="https://logowik.com/content/uploads/images/calendar5662.jpg"
                alt="date"
              />
            </button>
          </span>

          <div className="flex flex-col items-end">
            <button
              onClick={handleAdd}
              className="w-20 h-7 mt-4 text-[12px] text-white bg-purple-600 rounded-lg tracking-wider border-4 border-transparent active:border-white transition-all duration-300 ease-in-out"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

TaskInput.propTypes = {
  showDateTime: PropTypes.bool.isRequired,
  setShowDateTime: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  setTime: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  todo: PropTypes.string.isRequired,
  setTodo: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default TaskInput;
