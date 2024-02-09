import { useState, useRef, useEffect, useCallback } from "react";
import Dice from "../../components/dices";
import DiceBet from "../../components/Bets";
import DiceRoller from "../../components/DiceRoller";
import Counter from "../../components/clock";
import ScoreBoard from "../../components/ScoreCard";
import "./index.scss";

function Dashboard() {
  const rollerRef = useRef<any>(null);

  const [showdice, setShowdice] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [balance, updateBalance] = useState(100);
  const [startGame, setStartGame] = useState(false);
  const [shouldResetGame, setShouldResetGame] = useState(false);
  const [bets, setBets] = useState([0, 0, 0, 0, 0, 0]);
  const [selectedDice, setSelectedDice] = useState(1);

  const setGame = (isReset: boolean) => {
    setShowdice(false);
    setShowScore(false);
    setStartGame(false);
    setBets([0, 0, 0, 0, 0, 0]);
    if (isReset) {
      setWinAmount(0);
      updateBalance(100);
      setShouldResetGame(false);
    }
  };

  const calculateScore = useCallback(
    (selectedDice: number) => {
      let totalBetAmount = 0;
      bets.forEach((bet, i) => {
        totalBetAmount += bet * (selectedDice === i + 1 ? 2 : -1);
      });
      return totalBetAmount;
    },
    [bets]
  );

  const handleRollerStop = useCallback(
    (num: number) => {
      setSelectedDice(num);
      const _score = calculateScore(num);
      setTimeout(() => {
        setShowScore(true);
        setWinAmount(_score);
      }, 2000);
      setTimeout(() => {
        updateBalance((balance) => balance + _score);
        setGame(false);
      }, 7000);
    },
    [calculateScore]
  );

  const onSetBet = useCallback(
    (i: number) => {
      if (!startGame || shouldResetGame) {
        return;
      }
      setBets((bets) =>
        bets.map((bet, betId) => (i === betId ? bet + 1 : bet))
      );
    },
    [startGame, shouldResetGame]
  );

  const rollDice = useCallback(() => {
    if (rollerRef.current) {
      rollerRef.current.rollAll();
    }
  }, []);

  useEffect(() => {
    if (balance < 0) {
      setShouldResetGame(true);
    }
  }, [balance]);

  const onCounterEnd = useCallback(() => {
    rollDice();
    setShowdice(true);
  }, [rollDice]);

  const onStartGame = useCallback(() => {
    if (!showdice && !shouldResetGame) {
      setStartGame(true);
    }
  }, [showdice, shouldResetGame]);

  return (
    <div className="dice-game-container">
      <div className="game-panel">
        <h1>Dice Game</h1>
        <div className="game-panel-score">
          <div className="balanceDetails">
            <div className="balance-label">
              <div className="balance-label-value">Balance : </div>
            </div>
            <div className="balance-win-amount">
              <div className="balance-win-value">
                {balance > 0 ? balance : 0} $
              </div>
            </div>
          </div>
          <div className="last">
            <div className="last-label">
              <div className="last-label-value">Last Score : </div>
            </div>
            <div className="last-score">
              <div className="last-score-value">{winAmount} $</div>
            </div>
          </div>
          <div className="last-win"></div>
        </div>
        <div className="dice-board-block">
          <div className="play-board">
            {shouldResetGame && (
              <div className="reset-header">Insufficient funds reset</div>
            )}
            {showScore && <ScoreBoard score={winAmount} />}
            {startGame && !showdice && (
              <div className="game-caution">Quickly make bet</div>
            )}

            {!showdice && !shouldResetGame && (
              <Counter
                startTimer={!showScore && startGame}
                onTimerEnd={onCounterEnd}
              />
            )}
            <div style={{ display: showdice ? "initial" : "none" }}>
              <DiceRoller ref={rollerRef} onRollerStop={handleRollerStop} />
            </div>
            {showdice && <h6> Selected Dice : {selectedDice}</h6>}
            <button
              style={{
                display:
                  !startGame && !showdice && !shouldResetGame
                    ? "initial"
                    : "none",
              }}
              className="start-game"
              onClick={() => {
                onStartGame();
              }}
            >
              Start Game
            </button>
            <button
              style={{ display: shouldResetGame ? "initial" : "none" }}
              className="reset-game"
              onClick={() => {
                setGame(true);
              }}
            >
              Reset Game
            </button>
          </div>
          <div className="dice-board">
            <div className="dice-row">
              <Dice face={1} />
              <Dice face={2} />
              <Dice face={3} />
              <Dice face={4} />
              <Dice face={5} />
              <Dice face={6} />
            </div>
            <div className="bet-row">
              {bets.map((bet, id) => (
                <DiceBet
                  bet={bet}
                  isDisabled={!startGame || showdice || shouldResetGame}
                  setBet={() => onSetBet(id)}
                  key={id}
                />
              ))}
            </div>
            <div className="bet-text">Place Bet Here</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
