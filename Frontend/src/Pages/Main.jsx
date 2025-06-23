import React from 'react'
import { useLocation } from 'react-router-dom'

const Main = () => {

  const location = useLocation();
  const responseText = location.state?.responseText || 'no response found';

  return (
    <div>
      <h2>Generated output : </h2>
      <br />
      <pre> {responseText} </pre>  
    </div>
  )
}

export default Main
