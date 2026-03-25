import React from "react";
import styles from '../../styles.module.css'


const actions = [
  "Execute Job",
  "Bring In Service",
  "Reboot Device",
  "Set Out Of Service",
];

const ActionPanel = () => {
  return (
    <div className="action-card">
      {actions.map((action, index) => (
        <div className="action-row" key={index}>
          <span className="action-text">{action}</span>
          <button className="run-btn">Run</button>
        </div>
      ))}
    </div>
  );
};

export default ActionPanel;
