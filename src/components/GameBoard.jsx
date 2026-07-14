import { useState, useEffect, useRef } from "react";
import { validateWord } from "../services/wordService";
import { validateLocalGameRules } from "../utils/validators";
import { GAME_ERRORS, notify } from "../utils/errorMessages";
import { saveScore } from "../services/leaderboardService";
import "./GameBoard.css";

const TURN_DURATION = 15;

export const GameBoard = ({ playerName, onGameOver }) => {
  const [words, setWords] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TURN_DURATION);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isGameOver || words.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, words.length]);

  useEffect(() => {
    if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  useEffect(() => {
    if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
      saveScore(score, words.length, playerName);
      if (onGameOver) onGameOver();
    }
  }, [timeLeft, isGameOver, score, words.length, playerName, onGameOver]);

  useEffect(() => {
    if (inputRef.current && !isGameOver) {
      inputRef.current.focus();
    }
  }, [isGameOver]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const word = currentInput.trim().toLowerCase();
    
    if (!word || isGameOver || isValidating) return;

    const localValidationError = validateLocalGameRules(word, words);
    if (localValidationError) {
      notify.error(localValidationError);
      return;
    }

    setIsValidating(true);
    try {
      const exists = await validateWord(word);
      if (!exists) {
        notify.error(GAME_ERRORS.notFound);
        return;
      }

      setWords((prev) => [...prev, word]);
      setScore((prev) => prev + word.length);
      setTimeLeft(TURN_DURATION);
      setCurrentInput("");
      
    } catch (err) {
      notify.error(err.message);
    } finally {
      setIsValidating(false);
    }
  };

  const handleRestart = () => {
    setWords([]);
    setCurrentInput("");
    setTimeLeft(TURN_DURATION);
    setScore(0);
    setIsGameOver(false);
  };
  console.log("Estado actual - isGameOver:", isGameOver);
  return (
    <div className="game-container">
      <header className="game-header">
        <div className="stat-box">
          <span className="stat-label">Puntaje</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className={`stat-box ${timeLeft <= 5 ? "time-warning" : ""}`}>
          <span className="stat-label">Tiempo</span>
          <span className="stat-value">{timeLeft}s</span>
        </div>
      </header>

      <div className="word-chain-box">
        {words.length === 0 ? (
          <p className="placeholder-text">Ingresa tu primera palabra para comenzar a jugar.</p>
        ) : (
          <div className="chain-list">
            {words.map((w, idx) => (
              <span key={idx} className="chain-word">
                {w} {idx < words.length - 1 && <span className="arrow">→</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {!isGameOver ? (
        <form onSubmit={handleSubmit} className="game-form">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={words.length > 0 ? `Debe empezar con "${words[words.length - 1].slice(-1)}"` : "Ingresa una palabra"}
              disabled={isValidating}
              className="game-input"
              autoComplete="off"
            />
            <button type="submit" disabled={!currentInput.trim() || isValidating} className="submit-btn">
              {isValidating ? "Validando..." : "Enviar"}
            </button>
          </div>
        </form>
      ) : (
        <div className="game-over-box">
          <h2>¡Fin de la partida!</h2>
          <p>Palabras encadenadas: <strong>{words.length}</strong></p>
          <p>Puntaje Final: <strong>{score}</strong></p>
          <button onClick={handleRestart} className="restart-btn">Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
};