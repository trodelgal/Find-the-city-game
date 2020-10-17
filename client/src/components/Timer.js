import React, { useState } from "react";
import Timer from "react-compound-timer";

function TimerComponent({showCity}) {
  const [gameFinished, setGameFinished] = useState(false);

  return (
    <div className="timer">
      <Timer
        initialTime={0}
        direction="forward"
        checkpoints={[
        //   {
        //     time: 20000,
        //     callback: () => showCity()
        //   },
        //   {
        //     time: 15000,
        //     callback: () => showCity()
        //   },
        //   {
        //     time: 10000,
        //     callback: () => showCity()
        //   },
        //   {
        //     time: 5000,
        //     callback: () => showCity()
        //   },
        //   {
        //     time: 0,
        //     callback: () => console.log("finished")
        //   },
        ]}
      >
        {() => (
          <React.Fragment>
            <Timer.Seconds /> seconds
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
}

export default TimerComponent;
