function Score({score}) {
  return (
    <div className="score">
      {score.date}: {score.score}
    </div>
  )
}

export default Score