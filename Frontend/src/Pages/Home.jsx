import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import '../Styles/Home.css'
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';               // temporary usestate we won't be needing this further

const Home = () => {

  const { register, handleSubmit } = useForm();
  const [responseText, setResponseText] = useState('');           // temporary usestate we won't be needing this further
  const navigate = useNavigate();                                 // temporary usestate we won't be needing this further
  const [loading, setLoading] = useState(false);                  // temporary usestate we won't be needing this further

  const onSubmit = async (data) => {
    setLoading(true);
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

      navigate('/main', { state: { responseText: result.reply } })

    }
    catch (error) {
      setLoading(false)
      console.error('API call failed', error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="main">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Prompt Here" {...register("userprompt")} />
          {/* <Link to='/main'> */}
          {/* <button type="submit"> Submit</button> */}
          <button type="submit" disabled={loading}> Submit</button>
          {/* </Link> */}
        </form>
      </div>

      {/* The below code temporary and for testing purpose */}

      {loading?<div className="spinner-container">
        <ClipLoader color="#36d7b7" size={40} />
      </div>:<h2 className='spinner-container'> Ensure that your Backend is live</h2>}

      {responseText &&(
        <div className="response-output">
          <h3>Generated Output:</h3>
          <pre>{responseText}</pre>
        </div>
      )}

      {/*  */}
    </div>
  )
}

export default Home
