import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GameBoard } from "../components/GameBoard";
import { Leaderboard } from "../components/LeaderBoard";
import { getLeaderboard } from "../services/leaderboardService";
import { Container, Row, Col, Card } from "react-bootstrap"; 
import "./Home.css";

export const Game = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName;

  const refreshLeaderboard = () => {
    setLeaderboard(getLeaderboard());
  };

  useEffect(() => {
    if (!playerName) {
      navigate("/");
      return;
    }
    refreshLeaderboard();
  }, [playerName, navigate]);

  if (!playerName) return null;

  return (
    <Container className="home-container">
      <h1 className="text-center fw-bold home-title">Palabras Encadenadas</h1>
      
      <Row className="justify-content-center align-items-center g-4 home-row">
        <Col xs={12} lg={7} xl={6} className="home-col">
          <GameBoard onGameOver={refreshLeaderboard} playerName={playerName} />
        </Col>

        <Col xs={12} lg={5} xl={4} className="home-col">
          <Card className="leaderboard-card border-0 rounded-4 h-100">
            <Card.Body className="leaderboard-card-body">
              <Card.Title className="text-center fw-bold mb-4 leaderboard-title">
                🏆 Top 10 Puntajes
              </Card.Title>
              <Leaderboard leaderboard={leaderboard} currentPlayerName={playerName} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};