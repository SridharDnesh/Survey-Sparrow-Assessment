import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

function Bar({ label, heightPercentage, yMaxTick }) {
  const [actualHeight, setActualHeight] = useState(0);

  useEffect(() => {
    setActualHeight(yMaxTick * 100 * (heightPercentage / 100));
  }, [heightPercentage, yMaxTick]);

  const barStyle = {
    height: actualHeight || 0,
    top: yMaxTick * 100 - (actualHeight || 0),
    ...(heightPercentage === 0 && {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }),
  };

  return (
    <div className={styles.root} style={barStyle}>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default Bar;

Bar.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  heightPercentage: PropTypes.number,
  yMaxTick: PropTypes.number,
};
