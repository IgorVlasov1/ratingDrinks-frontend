import React from "react";
import PropTypes from "prop-types";
import styles from "./tooltip.module.css";
const Tooltip = ({ text, children }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltip_text}>{text}</span>
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Tooltip;
