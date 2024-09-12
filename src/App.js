import React, { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { useSpeechRecognition } from 'react-speech-kit';

function App() {
  const { speak } = useSpeechSynthesis()

  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  useEffect(() => {
    if (value.includes("빵빵")) {
      setTimeout(() => {
        alert("빵빵 인식 성공!!")
      }, 2000);
    }
  }, [value])
  return (
    <div>
      <button onClick={() => speak({ text: value })}>음성 test</button>
      <div>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={() => { listen({ interimResults: false }) }} >
          🎤
        </button>
        <button onClick={stop}>취소</button>
        {listening && <div>듣고있어요!</div>}
        <div>사용자가 한말 : <span>{`" ${value} "`}</span></div>
      </div>
    </div>
  )
}

export default App