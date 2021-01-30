import { useTicTacToe } from "./hooks/useTicTacToe"
import "./TicTacToe.css"

const TicTacToe = () => {
    const [board, round, currentPlayer, json, reset, handleClick, isPlaying, isGameOver, isTie, playerNumberToSymbol] = useTicTacToe()

    return (
        <div className="tic-tac-toe">
            <div className="ui">
                <h1>React Tic-Tac-Toe</h1>
                <h2>Round: {round}</h2>
                <h3>Player {currentPlayer}'s turn ({playerNumberToSymbol[currentPlayer]})</h3>
                {isTie() && <div>It's a tie!</div>}
                {isGameOver() && <div>Game over! Player {currentPlayer} won!</div>}
                {!isPlaying() && <button onClick={reset}>Play again</button>}
                <pre>
                    {json}
                </pre>
                <hr />
            </div>
            <div className="board">
                {
                    board.map((row, x) => row.map((v, y) => {
                        return (
                            <div key={`${x}-${y}`} onClick={() => handleClick(x, y)}>
                                {playerNumberToSymbol[v]}
                            </div>
                        )
                    }
                    ))
                }
            </div>
        </div>
    )
}

export default TicTacToe