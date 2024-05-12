import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Ahoj } from '../components/Ahoj.jsx'

export const Home = () => {
  let [text, setText] = useState('default text')

  const navigate = useNavigate()

  const handleClick = () => {
    setText('něco se stalo')
  }

  useEffect(() => {
    // fetch from server
    console.log('text byl změněn')
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our page</p>
      <Ahoj text={text} setText={setText} />

      <button onClick={handleClick}>Go to travel plan</button>
      {text}
    </div>
  )
}
