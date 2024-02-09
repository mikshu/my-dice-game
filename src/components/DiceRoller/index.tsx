/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";

interface DiceRollerProps {
  onRollerStop: (num: number) => void;
}

const DiceRoller: React.ForwardRefRenderFunction<
  ReactDiceRef,
  DiceRollerProps
> = ({ onRollerStop }, ref) => {
  return (
    <div>
      <ReactDice
        ref={ref}
        numDice={1}
        rollTime={2}
        rollDone={onRollerStop}
        disableIndividual={true}
      />
    </div>
  );
};

export default forwardRef(DiceRoller);
