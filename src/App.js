import React, { useEffect, useState } from 'react'
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { useSpeechRecognition } from 'react-speech-kit';
import SpeechKit from '@mastashake08/speech-kit';
function App() {
  const [text, setText] = useState('');
  const [speechKit, setSpeechKit] = useState(null);
  const [listen, setListen] = useState(false)

  // SpeechKit 인스턴스를 생성합니다
  const initializeSpeechKit = () => {
    const options = {
      continuous: true,  // 음성 인식을 지속적으로 수행
      interimResults: true,  // 중간 결과를 반환
      pitch: 1.2,  // 음성의 높이
      rate: 1.0,  // 음성의 속도
    };

    const kit = new SpeechKit(options);
    setSpeechKit(kit);
  };

  const handleSpeak = () => {
    if (speechKit) {
      speechKit.speak(text);
    }
  };

  React.useEffect(() => {
    initializeSpeechKit();
  }, []);

  return (
    <div>
      <button onClick={() => speechKit.speak(text)}>음성 test</button>
      <div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button onClick={() => speechKit.listen({ interimResults: false })} >
          🎤
        </button>
        <button onClick={() => { speechKit.stopListen() }}>취소</button>
        {listen && <div>듣고있어요!</div>}
        <div>사용자가 한말 : <span>{`" ${text} "`}</span></div>
      </div>
    </div>
  )
}

export default App