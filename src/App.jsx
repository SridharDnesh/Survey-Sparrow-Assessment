import { useState } from "react";
import BarChart from "@components/BarChart";
import { generateRandomList } from "@utils/helpers";
import { RATINGS, RATINGS_COUNT_TICKS } from "@utils/constants";
import "./App.css";

function App() {
  const [dataPoints, setDataPoints] = useState(
    generateRandomList(RATINGS.length)
  );

  const handleRegenerate = () => {
    setDataPoints(generateRandomList(RATINGS.length));
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
