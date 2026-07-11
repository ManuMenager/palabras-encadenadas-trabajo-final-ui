import { useState, useEffect } from "react";
import { GameBoard } from "../components/Game/GameBoard";
import { getLeaderboard } from "../services/leaderboardService";
import { Container, Row, Col, Card, Table } from "react-bootstrap"; 

export const Home = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Cargar el leaderboard al montar el componente
  const refreshLeaderboard = () => {
    setLeaderboard(getLeaderboard());
  };

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold text-primary">Palabras Encadenadas</h1>
      
      <Row className="justify-content-center g-4">
        {/* Columna del Juego */}
        <Col xs={12} lg={8}>
          {/* Pasamos refreshLeaderboard para que el tablero avise cuando hay un nuevo puntaje */}
          <GameBoard onGameOver={refreshLeaderboard} />
        </Col>

        {/* Columna del Leaderboard */}
        <Col xs={12} lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-4">
                Top 10 Puntajes
              </Card.Title>
              
              {leaderboard.length === 0 ? (
                <p className="text-center text-muted">Aún no hay puntajes registrados.</p>
              ) : (
                <Table borderless hover responsive size="sm">
                  <thead>
                    <tr className="border-bottom">
                      <th>#</th>
                      <th>Puntaje</th>
                      <th>Palabras</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id}>
                        <td className="fw-bold text-muted">{index + 1}</td>
                        <td className="fw-bold text-success">{entry.score} pts</td>
                        <td>{entry.wordsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};