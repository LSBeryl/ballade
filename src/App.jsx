import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // 쇼팽 발라드 정보
  const ballades = [
    {
      title: "Ballade No.1",
      time: 0,
      display: "1번 (00:00)",
      desc: "G minor, Op.23. 격정적이고 극적인 분위기, 쇼팽의 대표적 명곡.",
    },
    {
      title: "Ballade No.2",
      time: 9 * 60 + 24,
      display: "2번 (09:24)",
      desc: "F major, Op.38. 서정적이면서도 폭발적인 대조가 인상적.",
    },
    {
      title: "Ballade No.3",
      time: 16 * 60 + 56,
      display: "3번 (16:56)",
      desc: "A-flat major, Op.47. 밝고 서정적인 선율, 환상적인 분위기.",
    },
    {
      title: "Ballade No.4",
      time: 24 * 60 + 5,
      display: "4번 (24:05)",
      desc: "F minor, Op.52. 가장 복잡하고 깊이 있는 작품, 극적인 전개.",
    },
  ];
  const audioRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // 곡 선택 핸들러
  const handleSelect = (time, idx) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time + 5;
      audioRef.current.play();
      setCurrentIdx(idx);
    }
  };

  // 오디오 끝나면 1번 곡으로
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = ballades[0].time + 5;
      audioRef.current.play();
      setCurrentIdx(0);
    }
  };

  // 재생 위치에 따라 현재 곡 인덱스 자동 업데이트
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const t = audioRef.current.currentTime;
      // 각 곡의 시작+5초 ~ 다음 곡 시작+5초 사이에 있으면 해당 곡
      for (let i = ballades.length - 1; i >= 0; i--) {
        const start = ballades[i].time + 5;
        const next =
          i < ballades.length - 1 ? ballades[i + 1].time + 5 : Infinity;
        if (t >= start && t < next) {
          if (currentIdx !== i) setCurrentIdx(i);
          break;
        }
      }
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
      <div
        style={{
          marginBottom: "0.7rem",
          fontWeight: 500,
          fontSize: "1.05em",
          color: "#646cff",
        }}
      >
        지금 듣고 있는 곡: {ballades[currentIdx].display}
      </div>
      <div
        style={{
          marginBottom: "1.2rem",
          fontSize: "0.98em",
          color: "#888",
          minHeight: 24,
        }}
      >
        {ballades[currentIdx].desc}
      </div>
      <audio
        ref={audioRef}
        controls
        src="/ballade.mp3"
        style={{ width: "100%", marginBottom: "1.5rem" }}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="ballade-list">
        {ballades.map((b, idx) => (
          <button
            key={b.title}
            onClick={() => handleSelect(b.time, idx)}
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
