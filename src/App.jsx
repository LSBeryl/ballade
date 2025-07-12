import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // 쇼팽 발라드 정보
  const ballades = [
    { title: "Ballade No.1", time: 0, display: "1번 (00:00)" },
    { title: "Ballade No.2", time: 9 * 60 + 24, display: "2번 (09:24)" },
    { title: "Ballade No.3", time: 16 * 60 + 56, display: "3번 (16:56)" },
    { title: "Ballade No.4", time: 24 * 60 + 5, display: "4번 (24:05)" },
  ];
  const audioRef = useRef(null);

  // 곡 선택 핸들러
  const handleSelect = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time + 5;
      audioRef.current.play();
    }
  };

  // 오디오 끝나면 1번 곡으로
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = ballades[0].time + 5;
      audioRef.current.play();
    }
  };

  return (
    <div className="ballade-container">
      <h1>쇼팽 발라드 전곡 듣기</h1>
      <div style={{ marginBottom: "1.2rem" }}>
        <img
          src="/chopin.png"
          alt="Frédéric Chopin"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 2px 8px #0002",
          }}
        />
      </div>
      <audio
        ref={audioRef}
        controls
        src="/ballade.mp3"
        style={{ width: "100%", marginBottom: "1.5rem" }}
        onEnded={handleEnded}
      />
      <div className="ballade-list">
        {ballades.map((b, idx) => (
          <button
            key={b.title}
            onClick={() => handleSelect(b.time)}
            className="ballade-btn"
          >
            {b.display}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
