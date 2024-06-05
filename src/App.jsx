import { useState } from "react";
import BarChart from "./components/BarChart";
import { generateRandomList } from "./utils/heplers";
import { RATINGS, RATINGS_COUNT_TICKS } from "./utils/constants";
import "./App.css";

const ratings = [1, 2, 3, 4, 5];

function App() {
  const [dataPoints, setDataPoints] = useState([10, 22, 12, 43, 9]);

  const handleRegenerate = () => {
    setDataPoints(generateRandomList(ratings.length));
  };

  return (
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
      <button onClick={handleRegenerate}>Regenerate</button>
    </main>
  );
}

export default App;
