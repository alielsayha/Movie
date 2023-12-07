import React, { useState } from "react";
import "./switchTabs.scss";

const SwitchTabs = ({ data , onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tap, index) => {
    setLeft(index * 100);
    setSelectedTab(index);
    onTabChange(tap,index)
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tap, index) => {
          return (
            <span
              key={index}
              className={`tabItem ${selectedTab === index ? "active" : ""}`}
              onClick={() => {
                activeTab(tap, index);
              }}
            >
              {tap}
            </span>
          );
        })}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
