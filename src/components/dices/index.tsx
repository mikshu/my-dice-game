import "./index.scss";
import Diceone from "../../assets/dice-one.svg";
import Dicetwo from "../../assets/dice-two.svg";
import Dicethree from "../../assets/dice-three.svg";
import Dicefour from "../../assets/dice-four.svg";
import Dicefive from "../../assets/dice-five.svg";
import Dicesix from "../../assets/dice-six.svg";

interface DiceProps {
  face: number;
}

const Dice: React.FC<DiceProps> = ({ face }) => {
  let Diceface;
  switch (face) {
    case 1:
      Diceface = Diceone;
      break;
    case 2:
      Diceface = Dicetwo;
      break;
    case 3:
      Diceface = Dicethree;
      break;
    case 4:
      Diceface = Dicefour;
      break;
    case 5:
      Diceface = Dicefive;
      break;
    case 6:
      Diceface = Dicesix;
      break;
    default:
      Diceface = Diceone;
  }

  return (
    <div className="dice-container">
      <img className="dice-image" src={Diceface} alt={`Dice face ${face}`} />
    </div>
  );
};

export default Dice;
