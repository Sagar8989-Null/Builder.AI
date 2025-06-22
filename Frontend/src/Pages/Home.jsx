import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useForm } from 'react-hook-form';
import '../Styles/Home.css'

const Home = () => {

  const { register, handleSubmit } = useForm();
  const [responseText, setResponseText] = useState('');           // temporary usestate we won't be needing this further

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('API call successful', result);

      setResponseText(result.reply);

    }
    catch (error) {
      console.error('API call failed', error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="main">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Prompt Here" {...register("userprompt")} />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* The below code temporary and for testing purpose */}
      {responseText && (
          <div className="response-output">
            <h3>Generated Output:</h3>
            <pre>{responseText}</pre>
          </div>
        )}
    </div>
  )
}

export default Home
