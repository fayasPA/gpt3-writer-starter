import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Let's get you a cover letter</h1>
          </div>
          <div className="header-subtitle">
            <h2>insert your details here and pls step back..coz it's gonna be a BLAST..</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="experience: 6 months in django, postgres, github" className="prompt-box" 
          value={userInput} 
          onChange={onUserChangedText} 
          />
            <div className="prompt-buttons">
              <a className="generate-button" onClick={callGenerateEndpoint}>
                <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Hastalavista</p>}
                </div>
              </a>
            </div>
            {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>

      <div className="credits-container">
        <a
          href="https://www.linkedin.com/in/fayas-p-a-328748142/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="linked-in">
            <p>@fayas_muthaleef</p>
          </div>
        </a>
      </div>

    </div>
  );
};

export default Home;
