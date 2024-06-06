import { useEffect, useRef, useState } from "react";
import Bar from "../Bar";
import PropTypes from "prop-types";
import { calculatePercentage, isSorted } from "@/utils/helpers";
import styles from "./style.module.css";
import clsx from "clsx";

const AxisLabel = ({ label, orientation }) => {
  if (!label) return "";

  const isVertical = orientation === "vertical";

  return (
    <p className={clsx(styles.label, { [styles.verticalLabel]: isVertical })}>
      {label}
    </p>
  );
};

AxisLabel.propTypes = {
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

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

  const graphGridStyle = {
    gridTemplateColumns: `repeat(${xRange.length}, minmax(20px, 40px))`,
    gridTemplateRows: `repeat(${yRange.length}, minmax(60px, 100px))`,
  };

  useEffect(() => {
    if (graphRef.current) {
      setGraphHeight(graphRef.current.clientHeight);
    }
  }, [graphRef]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.graph} ref={graphRef} style={graphGridStyle}>
        {/* Bar UI looping */}
        {xRange.map((x, index) => (
          <Bar
            key={x}
            label={x}
            value={dataPoints[index]}
            heightPercentage={calculatePercentage(dataPoints[index], yMax)}
            yMaxTick={yMaxTick}
          />
        ))}

        {/* Y-Axis Label & ticks */}
        {graphRef.current && (
          <div className={styles.yAxisLabelContainer}>
            <AxisLabel label={yLabel} orientation={"vertical"} />
            <div className={styles.yAxis}>
              {yRange.map((y) => (
                <div
                  key={y}
                  style={{
                    height: graphHeight / yRange.length,
                  }}
                >
                  <p title={y}>{y}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* X-Axis Label */}
        {graphRef.current && xLabel && (
          <div className={styles.xAxisLabelContainer}>
            <AxisLabel label={xLabel} />
          </div>
        )}
      </div>
    </div>
  );
}

BarChart.propTypes = {
  data: PropTypes.shape({
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    xRange: PropTypes.arrayOf(PropTypes.number),
    yRange: PropTypes.arrayOf(PropTypes.number),
    dataPoints: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default BarChart;
