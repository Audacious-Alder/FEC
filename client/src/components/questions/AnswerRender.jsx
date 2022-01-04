import React from 'react'
import moment from 'moment'

const AnswerRender = ({answer}) => {

  let date = moment(answer.date);

  return (
    <div className="box">
      <div>
        {date.format('MMMM Do, YYYY')}
      </div>
      <div>
        {answer.answerer_name}:
      </div>
      <div>
        {answer.body}
      </div>
    </div>
  )
}

export default AnswerRender