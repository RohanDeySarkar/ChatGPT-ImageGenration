import { useState } from 'react'
import './App.css'

import {Configuration, OpenAIApi} from "openai";

function App() {
  const [textInput, setTextInput] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.nightcafe.studio/jobs/EpwkmGxNLBBCxrmEZrwt/EpwkmGxNLBBCxrmEZrwt--150--1KCOL.jpg?tr=w-1600,c-at_max");
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const createImage = async() => {
    if (textInput != "") {
      const response = await openai.createImage({
        prompt: textInput,
        n: 1,
        size: "1024x1024",
      });
  
      setImageUrl(response.data.data[0].url)
    }
  }

  return (
    <div className="app">
      <div className='app__title'>
        <p>Open AI Image Generator</p>
      </div>

      <div className='app__body'>
        <input 
          onChange={(e) => setTextInput(e.target.value)}
          placeholder='image description ...'
        />
        
        <button onClick={createImage}>
          <p>Create Image</p>
        </button>
      </div>

      <div className='app__image'>
        {imageUrl === "" ? (
          <></>
        ) : (
          <img
            src={imageUrl}
          />
        )}
      </div>
    </div>
  )
}

export default App
