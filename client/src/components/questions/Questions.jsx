import React from 'react';
import QuestionRender from './QuestionRender.jsx'
import data from '../../sample-data/questions.js'

const Questions = () => {
  return (
    <div>
      <h1>
        Questions
      </h1>
      <div>
        {data.results.map((question) => <QuestionRender question={question}/>)}
      </div>
    </div>
  )
}

export default Questions;
