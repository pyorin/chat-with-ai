import { useState } from "react";
import axios from "axios";

const App = () => {
  const [text, setText] = useState([]);
  const [input, setInput] = useState([]);

  const handleClick = async () => {
    const newMsg = [...text, { text: input, sender: "you" }];
    setText(newMsg);
    setInput("");
    try {
      const res = await axios.get(
        `https://openaiapi-nine.vercel.app/chat?q=${input}`
      );
      const botMsg = { text: res.data.result.text, sender: "asuna" };
      setText([...newMsg, botMsg]);
    } catch (error) {
      console.log(error);
      alert("504 error please try again.");
      setText([]);
    }
  };

  return (
    <>
      <div className="h-screen relative max-w-xl border mx-auto p-4 shadow-md">
        <div className="flex items-center">
          <div className="relative">
            <img
              src="https://cdn.myanimelist.net/images/characters/16/437615.jpg"
              className="rounded-full object-cover h-[50px] w-[50px]"
            />
            <div className="absolute bg-green-500 w-3 h-3 rounded-full bottom-0 -right-0 opacity-90 shadow-md"></div>
          </div>
          <div className="mx-3">
            <h1 className="font-bold text-xl">Asuna</h1>
            <p className="text-sm opacity-60 underline">Online</p>
          </div>
        </div>
        <hr className="border-[1px] px-2 my-5" />
        <div className="space-y-2 h-[80%] px-3 overflow-auto">
          {text.length > 0 ? (
            text.map((text, i) => (
              <fieldset key={i}>
                <legend>{text.sender}</legend>
                <div
                  className={
                    text.sender == "you"
                      ? `inline-block p-3 rounded-md bg-blue-500 text-white shadow-md`
                      : `inline-block p-3 rounded-md bg-red-500 text-white shadow-md`
                  }
                >
                  <p>{text.text}</p>
                </div>
              </fieldset>
            ))
          ) : (
            <p className="text-center mt-20">no message here.</p>
          )}
        </div>
        <div className="mx-auto p-3 space-x-2 flex absolute bottom-0 left-0 right-0">
          <input
            className="border border-black shadow-md border-opacity-20 block w-full rounded-md py-1 px-3 relative"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.keyCode === 13 ? handleClick() : null)}
          />
          <button className="absolute right-6 bottom-0 top-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-blue-500 shadow-md"
              onClick={() => handleClick()}
            >
              <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
