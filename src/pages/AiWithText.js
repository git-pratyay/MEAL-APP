import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyCehUjmXlMdUUmYh8M397XRYBHPJbdOr3k');

  const [search, setSearch] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // State to control style visibility

  /**
   * Generative AI Call to fetch text insights
   */
  async function aiRun() {
    if (search.trim()) { // Check if search input has content
      setLoading(true);
      setResponse('');
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Gemini, if ${search} is a food item then, dont reply '${search} is a food item', rather
      1. generate a meal name related to the food item 
      2. provide steps to make the meal at home
      3. provide the cost of the meal in INR
      
      No additional information or context is needed—only the three things(i.e. meal name, meal making process, meal price in INR) in bullet-point format.
      
      and if ${search} is not a food item then reply \'No food item detected in given text! Try another text with a proper food name.
      

      every output should only and strictly be in bullet point format.
      \'`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
      setLoading(false);
      setShowResponse(true); // Show response after successful fetch
    } else {
      setResponse('No text detected. Please enter a search query.');
      setShowResponse(true); // Show the "no text detected" message
    }
  }

  // ... (the rest of your code remains the same)


  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleClick = () => {
    aiRun();
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', maxWidth: '100%', alignItems: 'center',      justifyContent: 'center'}}>
      <div style={{ display: 'flex' }}>
        <input placeholder='Search Food with Category using Generative AI' onChange={(e) => handleChangeSearch(e)} />
        <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
      </div>

      {loading === true && aiResponse === '' ? (
        <p style={{ margin: '30px 10' }}>Loading ...</p>
      ) : showResponse && ( // Apply style only when showResponse is true
        <div style={{ margin: '30px 10', margin: '2%', padding: '2%', backgroundColor: '#f6f3f3', borderRadius: '15px', boxShadow: '0px 0px 20px 0px #adadad' }}>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AiwithText;
