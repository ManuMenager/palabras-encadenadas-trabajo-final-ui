import { Table } from "react-bootstrap";
import "./Leaderboard.css";

export const Leaderboard = ({ leaderboard, currentPlayerName }) => {
  if (leaderboard.length === 0) {
    return <p className="text-center text-muted mt-3">Aún no hay registros en la biblioteca.</p>;
  }

  return (
    <div className="leaderboard-scroll pe-2">
      <Table borderless hover responsive size="sm" className="bg-transparent align-middle">
        <thead>
          <tr className="border-bottom border-secondary border-opacity-25">
            <th className="bg-transparent text-muted small">#</th>
            <th className="bg-transparent text-muted small">Nombre</th>
            <th className="bg-transparent text-muted small text-end">Pts</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.id}>
              <td className="fw-bold text-muted bg-transparent">{index + 1}</td>
              <td className={`bg-transparent ${entry.playerName === currentPlayerName ? 'fw-bold text-primary' : ''}`}>
                {entry.playerName}
              </td>
              <td className="fw-bold text-success bg-transparent text-end">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};