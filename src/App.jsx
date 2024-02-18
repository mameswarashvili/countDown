import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isCounting, setIsCounting] = useState(false);
  const intervalRef = useRef(null);

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const startCount = () => {
    clearInterval(intervalRef.current);

    setIsCounting(true);
    setCount(parseInt(inputValue));

    intervalRef.current = setInterval(() => {
      setCount((prevCount) => (prevCount ? prevCount - 1 : 0));
    }, 1000);
  };

  const resetCount = () => {
    clearInterval(intervalRef.current);
    setIsCounting(false);
    setInputValue("");
    setCount();
  };

  function notifyMe() {
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification

      if (permission === "granted" && count === 0) {
        const notification = new Notification("Time is up!");
      }
    });
  }
  console.log(count);

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.

  // console.log(count);
  return (
    <div className="main-div">
      <div className="inner-div">
        <button onClick={notifyMe()}>Enable notifications 🔔</button>
        {count === 0 && <div>Time is up!</div>}
        {!isCounting ? (
          <form>
            <input type="number" value={inputValue} onChange={onChange} />
          </form>
        ) : null}
        {isCounting || count === null ? <h1>{count}</h1> : null}
        {isCounting ? (
          <button onClick={resetCount} className="button">
            Reset
          </button>
        ) : (
          <button
            onClick={startCount}
            disabled={!inputValue}
            className="button"
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
