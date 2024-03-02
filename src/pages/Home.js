import React, { useState } from 'react';
import AiwithText from './AiWithText';
import AiwithImage from './AiWithImage';

const Home = () => {
  const [aiWith, setLAiWith] = useState('text');

  const handleAiWith = (value) => {
    setLAiWith(value);
  }
  return (
    <div style={{  width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'}}>
      <h1 style={{color:'#333333'}}>Generative AI Meal Finder App!</h1>
      <p style={{color:'#333333'}}>Built with ❤️ using ReactJS + Redux + Google Gemini</p>

      <div style={{display: 'flex',flexDirection: 'row', margin: '30px 0px', gap: '20px', alignItems: 'center', justifyContent: 'center'}}>
        <button
          onClick={() => handleAiWith('text')}
          className={aiWith == 'text' ? 'aiWithActive' : ''}>
          AI with Text
        </button>

        <button
          style={{ marginLeft: '20px' }}
          className={aiWith == 'image' ? 'aiWithActive' : ''}
          onClick={() => handleAiWith('image')}>
          AI with Image
        </button>
      </div>

      {
        aiWith == 'text' ?
          <AiwithText />
          :
          <AiwithImage />
      }
    </div>
  );
};

export default Home;