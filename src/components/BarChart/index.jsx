import Bar from "../Bar";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";

function BarChart({ data: { xLabel, yLabel, xRange, yRange, dataPoints } }) {
  if (!Array.isArray(xRange)) {
    throw new Error("xRange should be of type Array.");
  }

  if (!Array.isArray(yRange)) {
    throw new Error("yRange should be of type Array.");
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

  const yMaxTick = yRange.length;
  const maxY = yRange.slice(-1)[0];

  const calculatePercentage = (partialValue, totalValue) => {
    return (partialValue / totalValue) * 100;
  };

  useEffect(() => {
    if (graphRef.current) {
      setGraphHeight(graphRef.current.clientHeight);
    }
  }, [graphRef]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.graph} ref={graphRef}>
        {xRange.map((x, index) => (
          <Bar
            key={x}
            label={x}
            heightPercentage={calculatePercentage(dataPoints[index], maxY)}
            yMaxTick={yMaxTick}
          />
        ))}

        {graphRef.current && (
          <div className={styles.yAxisLabelContainer}>
            <p>{yLabel}</p>
            <div className={styles.yAxis}>
              {graphRef.current &&
                yRange.map((y) => (
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

        {graphRef.current && (
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
