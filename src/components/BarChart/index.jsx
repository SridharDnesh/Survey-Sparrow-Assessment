import { useEffect, useRef, useState } from "react";
import Bar from "../Bar";
import PropTypes from "prop-types";
import { calculatePercentage, isSorted } from "@/utils/helpers";
import styles from "./style.module.css";

function BarChart({ data: { xLabel, yLabel, xRange, yRange, dataPoints } }) {
  if (!Array.isArray(xRange)) {
    throw new Error("xRange should be of type Array.");
  }

  if (!Array.isArray(yRange)) {
    throw new Error("yRange should be of type Array.");
  }

  if (!isSorted(xRange)) {
    throw new Error("xRange should be in a non-decreasing order.");
  }

  if (!isSorted(yRange)) {
    throw new Error("yRange should be in a non-decreasing order.");
  }

  if (!Array.isArray(dataPoints)) {
    throw new Error("dataPoints should be of type Array.");
  }

  if (xRange.length !== dataPoints.length) {
    console.warn(
      "Warning: dataPoints does not have exact size of elements like xRange."
    );
  }

  if (dataPoints.length > xRange.length) {
    throw new Error(
      "Size of dataPoints should not exceed the size of xRange array."
    );
  }

  const graphRef = useRef(null);
  const [graphHeight, setGraphHeight] = useState(0);

  // Getting the max value of y-axis
  const yMax = yRange.slice(-1)[0];

  // Gettings the total length of the y-axis
  const yMaxTick = yRange.length;

  useEffect(() => {
    if (graphRef.current) {
      setGraphHeight(graphRef.current.clientHeight);
    }
  }, [graphRef]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.graph} ref={graphRef}>
        {/* Bar UI looping */}
        {xRange.map((x, index) => (
          <Bar
            key={x}
            label={x}
            heightPercentage={calculatePercentage(dataPoints[index], yMax)}
            yMaxTick={yMaxTick}
          />
        ))}

        {/* Y-Axis Label & ticks */}
        {graphRef.current && (
          <div className={styles.yAxisLabelContainer}>
            {yLabel && <p>{yLabel}</p>}
            <div className={styles.yAxis}>
              {yRange.map((y) => (
                <div
                  key={y}
                  style={{
                    height: graphHeight / yRange.length,
                  }}
                >
                  <p style={{ transform: "translateY(-25%)" }}>{y}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* X-Axis Label */}
        {graphRef.current && xLabel && (
          <div className={styles.xAxisLabelContainer}>
            <p>{xLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.shape({
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    xRange: PropTypes.arrayOf(PropTypes.number),
    yRange: PropTypes.arrayOf(PropTypes.number),
    dataPoints: PropTypes.arrayOf(PropTypes.number),
  }),
};
