import { useState } from 'react'
import LearnerData from './data/Learner'
import './App.css'
import Learner from './components/Learner'

function App() {
  const [learner_data, setLearnerData] = useState(LearnerData)
  const Learners = learner_data.map(learner =>
    <>
      <Learner name={learner.name} bio={learner.bio} scores={learner.scores} />
      <hr />
    </>
  )

  return (
    <>
      {Learners}
    </>
  )
}

export default App
