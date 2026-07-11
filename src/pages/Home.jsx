import { useState, useEffect } from "react";
import { GameBoard } from "../components/game/GameBoard";
import { getLeaderboard } from "../services/leaderboardService";
import { Container, Row, Col, Card, Table } from "react-bootstrap"; 

import "./Home.css";

export const Home = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const refreshLeaderboard = () => {
    setLeaderboard(getLeaderboard());
  };

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  return (
    <Container className="home-container">
      <h1 className="text-center fw-bold home-title">Palabras Encadenadas</h1>
      
      <Row className="justify-content-center align-items-center g-4 home-row">
        <Col xs={12} lg={7} xl={6} className="home-col">
          <GameBoard onGameOver={refreshLeaderboard} />
        </Col>

        <Col xs={12} lg={5} xl={4} className="home-col">
          <Card className="leaderboard-card border-0 rounded-4">
            <Card.Body className="leaderboard-card-body">
              <Card.Title className="text-center fw-bold mb-3 leaderboard-title">
                🏆 Top 10 Puntajes
              </Card.Title>
              
              {leaderboard.length === 0 ? (
                <p className="text-center text-muted mt-3">Aún no hay puntajes registrados.</p>
              ) : (
                <div className="leaderboard-scroll">
                  <Table borderless hover responsive size="sm" className="bg-transparent">
                    <thead>
                      <tr className="border-bottom border-secondary border-opacity-25">
                        <th className="bg-transparent">#</th>
                        <th className="bg-transparent">Puntaje</th>
                        <th className="bg-transparent">Palabras</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <tr key={entry.id}>
                          <td className="fw-bold text-muted bg-transparent">{index + 1}</td>
                          <td className="fw-bold text-success bg-transparent">{entry.score} pts</td>
                          <td className="bg-transparent">{entry.wordsCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};