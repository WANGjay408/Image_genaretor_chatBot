import './App.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import OptionBox from './optionBox';
import ImageBox from './imageBox';
import { Avatar, Spin } from 'antd';
import ImageOption from './ImageOption';

const App = () => {
  const [windowHeight, setWindowHeight] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [extendList, setExtendList] = useState({
    prompt_res_1: '',
    prompt_res_2: '',
    prompt_res_3: '',
    prompt_res_4: '',
    prompt_res_5: '',
  });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [content, setContent] = useState('');

  const handleInputChange = useCallback((event) => {
    setInputText(event.target.value);
  }, [])

  const myPromise = useCallback((url, prompt) => {
    return axios.post(url, { prompt }, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        const data = response.data;
        return data;
      })
      .catch(error => {
        throw error;
      });
  }, [])

  const myPromise_2 = useCallback((url, option) => {
    return axios.post(url, { option }, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        const data = response.data;
        return data;
      })
      .catch(error => {
        throw error;
      });
  }, [])

  // This function extracts an image from the image group when the user selects a value from the image options
  const pickPicture = useCallback(async (value) => {

    // If the value selected is 5, fetch an image from '/api/imageV2' endpoint
    if (value.target.value === '5' || value.target.value === 5) {
      
      // Set the isLoading state to true, define a timer ID, and a count variable
      setIsLoading(true);
      let timeoutId_2; // Define timer ID
      let count_2 = 0;


      // Fetch an image from '/api/imageV2' endpoint
      await myPromise_2('/api/imageV2', '5')

      // Define an asynchronous function that fetches the image from '/api/image' endpoint and updates the messages state with a new image or sets the isLoading state to true and waits for the next response
      const fetchImage = async () => {
        try {
          const res = await myPromise('/api/image', content);
          const url = res.data.image;
          if (url !== '') {
            setIsLoading(false);


            // Create an image object with the image URL and add it to the messages state
            const image = {
              text: <ImageBox value={url} />,
              sender: "chatgpt"
            };

            setMessages((prevMessages) => [...prevMessages, image]);


            // Set a timeout of 2 seconds and add an image option to the messages state after the timeout
            setTimeout(() => {
              setMessages((prevMessages) => [...prevMessages, {
                text: <ImageOption onChange={pickPicture} />,
                sender: "chatgpt"
              }]);
            }, 2000);



          } else if (count_2 < 1000) {
            
            // If the image URL is empty and the maximum retries limit is not reached, increment the count and set a timeout of 10 seconds to retry fetching the image
            count_2++;
            timeoutId_2 = setTimeout(fetchImage, 10000);
          }
        } catch (error) {
          console.error('Promise rejected:', error);
        }
      };


      // Set a timeout of 10 seconds to call the fetchImage function
      timeoutId_2 = setTimeout(fetchImage, 10000);

      // Return a cleanup function that clears the timeout
      return () => clearTimeout(timeoutId_2);
    }
    else {

      // If the value selected is not 5, fetch an image from '/api/image' endpoint
      setIsLoading(true);
      let timeoutId_1; // Define timer ID
      let count_1 = 0;

      // Fetch an image from '/api/image' endpoint
      await myPromise_2('/api/imageV2', `${value.target.value}`)


      // Define an asynchronous function that fetches the image from '/api/image' endpoint and updates the messages state with a new image or sets the isLoading state to true and waits for the next response
      const fetchImage = async () => {
        try {
          const res = await myPromise_2('/api/image', '');
          const url = res.data.image;
          if (url !== '') {
            setIsLoading(false);


            // Create an image object with the image URL and add it to the messages state
            const image = {
              text: <ImageBox value={url} />,
              sender: "chatgpt"
            };

            setMessages((prevMessages) => [...prevMessages, image]);

          } 
                    
          // If the image URL is empty and the maximum retries limit is
          else if (count_1 < 1000) {
            count_1++;
            timeoutId_1 = setTimeout(fetchImage, 500);
          }
        } catch (error) {
          console.error('Promise rejected:', error);
        }
      };

      timeoutId_1 = setTimeout(fetchImage, 500);

      return () => clearTimeout(timeoutId_1);
    }


  }, [myPromise, content, myPromise_2])

  // Define the function 'getPicture' using the 'useCallback' hook, which will be called when a user selects a message content value
  const getPicture = useCallback(async (value) => {

    // Set the state of 'Content' to the selected value, and set 'isLoading' to true
    setContent(value.target.value);
    setIsLoading(true);

    // Call an asynchronous function 'myPromise' with the endpoint and value parameters
    myPromise('/api/message', value.target.value)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.error('Promise rejected:', error);
      });

    // Declare variables for a timer and a counter
    let timeoutId;
    let count = 0;

    // Define an asynchronous function 'fetchImage'
    const fetchImage = async () => {
      try {
        // Call 'myPromise' function with the endpoint and value parameters
        const res = await myPromise('/api/image', value.target.value);
        const url = res.data.image;

        // If a URL is returned, set 'isLoading' to false and add the image to the messages state
        if (url !== '') {
          setIsLoading(false);

          const image = {
            text: <ImageBox value={url} />,
            sender: "chatgpt"
          };

          setMessages((prevMessages) => [...prevMessages, image]);

          // Add another message to the messages state after a timeout of 2 seconds
          setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, {
              text: <ImageOption onChange={pickPicture} />,
              sender: "chatgpt"
            }]);
          }, 2000);
        }
            
        // If no URL is returned, and the counter is less than 1000, increment the counter and set a timeout for 10 seconds before calling the 'fetchImage' function again
        else if (count < 1000) {
          count++;
          timeoutId = setTimeout(fetchImage, 10000);
        }
      } catch (error) {
        console.error('Promise rejected:', error);
      }
    };

    timeoutId = setTimeout(fetchImage, 10000);

    // Return a cleanup function that clears the timer when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [myPromise, pickPicture]);



  const getExtention = useCallback((value) => {
    setIsLoading(true);
    myPromise('/api/prompt', value)
      .then(res => {
        setIsLoading(false);
        const chatGPTMessage = {
          text: <OptionBox extendList={res.data} onChange={getPicture} />,
          sender: "chatgpt"
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTMessage]);
        setExtendList(res.data);
      })
      .catch(error => {
        console.error('Promise rejected:', error);
      });
  }, [myPromise, getPicture])

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      if (event.target.value !== '') {
        const currentUserMessage = { text: event.target.value, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, currentUserMessage]);
        getExtention(event.target.value);
        setInputText("");
      }
    }
  }, [getExtention])

  useEffect(() => {
    const windowHeight = window.innerHeight;
    setWindowHeight(windowHeight);
  }, [])




  return (
    <div className="App" style={{ height: windowHeight, background: '#343641' }}>
      <div className="chat-container" style={{ height: windowHeight - 150 }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-container ${message.sender === "user" ? "user" : "chatgpt"}`}
          >
            <Avatar className="avatar" style={{ backgroundColor: message.sender === "user" ? "#f56a00" : '#7265e6', verticalAlign: 'middle' }} size="large" gap={2}>
              {message.sender === "user" ? "User" : 'Bot'}
            </Avatar>
            <div className="message">
              {message.text}
            </div>
          </div>
        ))}
        {!!isLoading && <Spin size='large' style={{ marginTop: '20px' }} />}
        <div className="input-container">
          <input
            disabled={isLoading}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Please key in your keyword"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
