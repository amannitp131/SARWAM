'use client'
import React, { useState } from 'react'
import data from './data'
import SingleQuestion from './question'

const Faq = () => {
  const [questions, setQuestions] = useState(data)

  return (
    <main>
      <div className='container'>
        <h3 id="new" >FAQ</h3>
        <section className='info'>
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </section>
      </div>
    </main>
  )
}

export default Faq;