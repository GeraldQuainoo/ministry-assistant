import { useReducer, useEffect } from "react";
import Header from "./Header";
import Timer from "./Timer";
import TodaysActivity from "./TodayActivity";
import FormModal from "./GoalModal";

const savedStartTime = localStorage.getItem("timer");

let savedMonthlyGoalHours = localStorage.getItem("monthlyGoalHours");

let savedHoursCompleted = localStorage.getItem("hoursCompleted");
const initialTimerState = {
  time: !savedStartTime ? 0 : JSON.parse(savedStartTime),
  isRunning: false,
  showDone: false,
  monthlyGoalHours: !savedMonthlyGoalHours
    ? 0
    : JSON.parse(savedMonthlyGoalHours),
  hoursCompleted: !savedHoursCompleted ? 0 : JSON.parse(savedHoursCompleted),
  showGoalModal: false,
  userName: JSON.parse(localStorage.getItem("userName")) || "",
  showNameModal: false,
  // timestamp when timer started
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isRunning: true,
        showDone: false,
      };
    case "stop":
      return {
        ...state,
        isRunning: false,
        showDone: true,
      };
    case "reset":
      localStorage.removeItem("timer"); // Clear localStorage on reset
      return { ...state, time: 0, isRunning: false, showDone: false };
    case "done":
      localStorage.removeItem("timer");
      return {
        ...state,
        time: 0,
        isRunning: false,
        showDone: false,
        hoursCompleted: Number(
          (state.hoursCompleted + state.time / 3600).toFixed(2),
        ),
      };
    case "tick":
      return {
        ...state,
        time: ++state.time,
      };
    case "load_state":
      return { ...state, ...action.payload };
    case "showGoalModal":
      return { ...state, showGoalModal: true };
    case "closeGoalModal":
      return { ...state, showGoalModal: false };
    case "setMonthlyHours":
      return { ...state, monthlyGoalHours: +action.payload };
    case "hoursCompleted":
      return { ...state, hoursCompleted: +action.payload };
    case "showNameModal":
      return { ...state, showNameModal: true };
    case "closeNameModal":
      return { ...state, showNameModal: false };
    case "setUserName":
      return { ...state, userName: action.payload };
    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialTimerState);
  const {
    isRunning,
    time,
    monthlyGoalHours,
    hoursCompleted,
    showGoalModal,
    showNameModal,
    userName,
  } = state;

  const progressPercentage = hoursCompleted
    ? Math.floor((hoursCompleted / monthlyGoalHours) * 100, 100)
    : 0;

  // Load saved state on mount
  useEffect(() => {
    const savedTime = localStorage.getItem("timer");
    if (savedTime) {
      const time = JSON.parse(savedTime);
      const updatedState = {
        time: time,
        isRunning: true,
        showDone: false,
      };
      dispatch({ type: "load_state", payload: updatedState });
    }
  }, []);

  useEffect(() => {
    if (isRunning && time) {
      localStorage.setItem("timer", time.toString());
    } else if (!isRunning) {
      return;
      // localStorage.removeItem("timer");
    }
  }, [isRunning, time]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  function handleStartStop() {
    if (state.isRunning) {
      dispatch({
        type: "stop",
      });
    } else {
      dispatch({ type: "start" });
    }
  }

  useEffect(
    function () {
      localStorage.setItem(
        "monthlyGoalHours",
        JSON.stringify(monthlyGoalHours),
      );
      localStorage.setItem("hoursCompleted", JSON.stringify(hoursCompleted));
    },
    savedMonthlyGoalHours = localStorage.getItem("monthlyGoalHours");

savedHoursCompleted = localStorage.getItem("hoursCompleted");
    [monthlyGoalHours, hoursCompleted],
  );
  useEffect(
    function () {
      localStorage.setItem("userName", JSON.stringify(userName));
    },
    [userName],
  );

  return (
    <div>
      <Header>
        <div className="header">
          <div className="headerTop">
            <span>
              <h1 className="headingPrimary">
                <p>Welcome back,</p>
                <p
                  onClick={() =>
                    dispatch({
                      type: "showNameModal",
                    })
                  }
                >
                  {userName ? userName : "Add your Name"}
                </p>
              </h1>
              <p className="textSmall">Wednesday, May 13</p>
            </span>
            <span className="start" onClick={handleStartStop}>
              {isRunning ? "Stop" : time > 0 ? "Continue" : "Start"}
            </span>
          </div>
          <div
            className="goal-container"
            style={{ cursor: "pointer" }}
            onClick={() =>
              dispatch({
                type: "showGoalModal",
              })
            }
          >
            <div className="circular-progress">
              <svg viewBox="0 0 120 120" className="progress-circle">
                <circle cx="60" cy="60" r="54" className="progress-circle-bg" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="progress-circle-fill"
                  style={{
                    strokeDasharray: `${(progressPercentage / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`,
                  }}
                />
              </svg>
              <div className="progress-text">
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <div>
              <h3 className="headingTertiary">
                Monthly Goal: {savedMonthlyGoalHours || monthlyGoalHours}hrs
              </h3>
              <p className="textSmall">{savedHoursCompleted || hoursCompleted} hours completed</p>
            </div>
          </div>
        </div>
      </Header>

      <div className="body">
        {showGoalModal && (
          <FormModal dispatch={dispatch}>
            <div
              className="modal-overlay"
              onClick={() => dispatch({ type: "closeGoalModal" })}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Set Monthly Goal</h2>
                <div className="form-group">
                  <label htmlFor="goalHours">Monthly Goal (hours):</label>
                  <input
                    type="number"
                    id="goalHours"
                    value={monthlyGoalHours}
                    onChange={(e) =>
                      dispatch({
                        type: "setMonthlyHours",
                        payload: Number(e.target.value),
                      })
                    }
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="completedHours">Hours Completed:</label>
                  <input
                    type="number"
                    id="completedHours"
                    value={hoursCompleted}
                    onChange={(e) =>
                      dispatch({
                        type: "hoursCompleted",
                        payload: Number(e.target.value),
                      })
                    }
                    min="0"
                  />
                </div>
                <div className="modal-actions">
                  <button
                    className="btn btn--primary"
                    onClick={() => dispatch({ type: "closeGoalModal" })}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn--secondary"
                    onClick={() => dispatch({ type: "closeGoalModal" })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </FormModal>
        )}
        {showNameModal && (
          <FormModal dispatch={dispatch}>
            <div
              className="modal-overlay"
              onClick={() => dispatch({ type: "closeGoalModal" })}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Set Username</h2>
                <div className="form-group">
                  <label htmlFor="goalHours">Name:</label>
                  <input
                    type="text"
                    id="goalHours"
                    value={userName}
                    onChange={(e) =>
                      dispatch({
                        type: "setUserName",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-actions">
                  <button
                    className="btn btn--primary"
                    onClick={() => dispatch({ type: "closeNameModal" })}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn--secondary"
                    onClick={() => dispatch({ type: "closeNameModal" })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </FormModal>
        )}
        <Timer state={state} dispatch={dispatch} actions={{ reset: "reset" }} />
        {/* <ActionBox /> */}
        <TodaysActivity />
      </div>
    </div>
  );
}

export default Home;
