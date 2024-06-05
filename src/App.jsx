import { useState } from "react";
import BarChart from "@/components/BarChart";
import { generateRandomList, shuffleArray } from "@/utils/helpers";
import { RATINGS, RATINGS_COUNT_TICKS } from "@/utils/constants";
import styles from "./App.module.css";

function App() {
  const [dataPoints, setDataPoints] = useState(
    generateRandomList(RATINGS.length)
  );

  const handleReset = () => {
    setDataPoints(new Array(RATINGS.length).fill(0));
  };

  const handleRegenerate = () => {
    setDataPoints(generateRandomList(RATINGS.length));
  };

  const handleRegenerateByTens = () => {
    setDataPoints(shuffleArray([10, 20, 30, 40, 50]));
  };

  return (
    <>
      <main>
        <BarChart
          data={{
            xLabel: "Rating",
            yLabel: "No. of ratings",
            xRange: RATINGS,
            yRange: RATINGS_COUNT_TICKS,
            dataPoints: dataPoints,
          }}
          xRange={RATINGS}
          yRange={RATINGS_COUNT_TICKS}
          dataPoints={dataPoints}
        />
      </main>
      <div className={styles.buttonContainer}>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRegenerate}>Regenerate</button>
        <button onClick={handleRegenerateByTens}>Regenerate by 10s</button>
      </div>
    </>
  );
}

export default App;
