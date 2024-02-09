import React from "react";
import "./index.scss";

interface DiceBetProps {
  bet: number;
  setBet: () => void;
  isDisabled: boolean;
}

const DiceBet: React.FC<DiceBetProps> = ({ bet, setBet, isDisabled }) => {
  return (
    <div
      className={`dice-bet ${isDisabled ? "disabled" : ""}`}
      onClick={setBet}
    >
      <div className="dice-bet-icon material-icons md-18">$</div>
      <div className="bet-value">{bet}</div>
    </div>
  );
};

export default DiceBet;
