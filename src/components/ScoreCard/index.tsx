import "./index.scss";

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = (props) => {
  const { score } = props; // Destructure props
  const scores = Math.abs(score);
  const won = props.score >= 0;

  return (
    <div className="score-card-overlay">
      <div className={`score-card ${won ? "won" : "lost"}`}>
        {`You ${won ? "won" : "lost"} ${scores}$`}
      </div>
    </div>
  );
};

export default ScoreCard;
