import React from 'react'
import moment from 'moment'
import AnswerRender from './AnswerRender.jsx'

const QuestionRender = ({question}) => {

  const answers = []
  for (let id in question.answers) {
    answers.push(question.answers[id])
  }

  let date = moment(question.question_date);

  return (
    <div className="box">
      <div>
        {date.format('MMMM Do, YYYY')}
      </div>
      <div>
        {question.asker_name}:
      </div>
      <div>
        {question.question_body}
      </div>
      <div>
        {answers.map((answer) => <AnswerRender answer={answer} />)}
      </div>
    </div>
  )
}

export default QuestionRender