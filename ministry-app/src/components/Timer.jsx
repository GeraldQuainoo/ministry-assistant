function Timer({ state, dispatch }) {
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function handleDone() {
    dispatch({ type: "done" });
  }

  return (
    <div className="timerContainer">
      <div className="timer">{formatTime(state.time)}</div>
      {state.showDone && (
        <button className="btn--done" onClick={handleDone}>
          Done
        </button>
      )}
    </div>
  );
}

export default Timer;
