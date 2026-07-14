import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"; 
import "./Home.css";

export const Welcome = () => {
  const [tempName, setTempName] = useState("");
  const navigate = useNavigate();

  const handleStartGame = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      navigate("/game", { state: { playerName: tempName.trim() } });
    }
  };

  return (
    <Container className="home-container">
      <h1 className="text-center fw-bold home-title">Palabras Encadenadas</h1>
      
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <Card className="welcome-card border-0 rounded-4 shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4 welcome-title">¡El desafío comienza aquí!</h3>
              <p className="text-center text-muted mb-4">
                Ingresa tu nombre para comenzar el juego y dejar tu marca en los registros.
              </p>
              <Form onSubmit={handleStartGame} className="d-flex flex-column gap-3">
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Tu nombre..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="name-input text-center"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="start-btn fw-bold"
                  disabled={!tempName.trim()}
                >
                  Comenzar Partida
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};