import Score from "./Score"

function Learner({name, bio, scores}) {
  const Scores = scores.map(score => <Score score={score} />)

  return (
    <div className="learner">
      <h2 className="learner-name">{name}</h2>
      <p className="learner-bio">{bio}</p>
      <details>
        <summary><b>Scores</b></summary>
        <div className="learner-scores">
          {Scores}
        </div>
      </details>
    </div>
  )
}

export default Learner