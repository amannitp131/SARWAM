'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useRef } from 'react'
const Question = ({ title, info }) => {
  const questionref=useRef();
  const [expanded, setExpanded] = useState(false)
  function open(e) {
    if (questionref.current && !questionref.current.contains(e.target)) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', open);
    return () => {
      window.removeEventListener('mousedown', open);
    };
  }, []);
  return (
    <article className='question' ref={questionref}>
      <header>
        <h4 onClick={() => setExpanded(!expanded)} className='question-title'>
          {title}
        </h4>
        <button className='btn' onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {expanded && <p>{info}</p>}
    </article>
  )
}

export default Question
