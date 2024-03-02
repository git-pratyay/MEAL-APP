import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from './imageHelper';

const AiwithImage = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyCehUjmXlMdUUmYh8M397XRYBHPJbdOr3k');

  const [image, setImage] = useState('');
  const [imageInlineData, setImageInlineData] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // New state to control style visibility
  const [fileSelected, setFileSelected] = useState(false); // State to track file selection

  /**
   * Generative AI Call to fetch image insights
   */
  async function aiImageRun() {
    if (fileSelected) {
      setLoading(true);
      setResponse('');
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const result = await model.generateContent([
        'Gemini, your task is to identify whether the image that is provided is of a food item or not. If you can not find any food item then reply \'No food item detected !! Try another image\'. If its a food item then do not reply anything like food item detected, rather identify whats in that food item.', imageInlineData
      ]);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
      setLoading(false);
      setShowResponse(true); // Show response after successful fetch
    } else {
      setResponse('No file detected. Please select an image.');
      setFileSelected(false); // Reset fileSelected state
      setShowResponse(true); // Show the "no file detected" message
    }
  }

  const handleClick = () => {
    aiImageRun();
  }

  const handleImageChange = (e) => {
    setFileSelected(true); // Indicate that a file has been selected
    const file = e.target.files[0];

    // getting base64 from file to render in DOM
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch(e => console.log(e));

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          <input type='file' onChange={(e) => handleImageChange(e)} />
          <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
        </div>
        <img src={image} style={{ marginTop: '30px', backgroundColor: '#e2e2e2', maxWidth: '40%', borderRadius: '15%', boxShadow: '0px 0px 11px -1px #333333', maxHeight: '40%', objectFit: 'contain' }} />
      </div>

      {loading === true && aiResponse === '' ? (
        <p style={{ margin: '30px 0' }}>Loading ...</p>
      ) : showResponse && ( // Only show response if fetched and showResponse state is true
        <div style={{ margin: '30px 10', margin: '2%', padding: '2%', backgroundColor: '#f6f3f3', borderRadius: '15px', boxShadow: '0px 0px 20px 0px #adadad' }}>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AiwithImage;
