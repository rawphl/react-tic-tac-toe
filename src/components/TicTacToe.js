import { useState, useEffect, useCallback } from "react"
import "./TicTacToe.css"

const playerNumberToSymbol = {
    0: "",
    1: "×",
    2: "○"
}

const PLAYERS = {
    ONE: 1,
    TWO: 2
}

const STATES = {
    PLAYING: 1,
    GAME_OVER: 2,
    TIE: 3
}

const defaultBoard = () => {
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
}

const TicTacToe = () => {
    const [board, setBoard] = useState(defaultBoard())
    const [round, setRound] = useState(1)
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.ONE)
    const [state, setState] = useState(STATES.PLAYING)
    const [json, setJson] = useState("")

    useEffect(() => {
        setJson(JSON.stringify({ board, round, currentPlayer, state }, null, 4))
    }, [board, round, currentPlayer, state])

    const handleClick = (x, y) => {
        if (board[x][y] !== 0) return
        const newBoard = [...board]
        newBoard[x][y] = currentPlayer
        setBoard(newBoard)

        const didWin = isWinner()

        if (round === 9 && !didWin) {
            setState(STATES.TIE)
        } else if (didWin) {
            setState(STATES.GAME_OVER)
        } else {
            setRound(r => r + 1)
            setCurrentPlayer(currentPlayer === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE)
        }
    }

    const reset = () => {
        setBoard(defaultBoard())
        setRound(1)
        setCurrentPlayer(PLAYERS.ONE)
        setState(STATES.PLAYING)
    }

    const isWinner = () => {
        const checkRows = () => {
            const top = board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[2][0] === currentPlayer
            const center = board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[2][1] === currentPlayer
            const bottom = board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[2][2] === currentPlayer
            return top || center || bottom
        }

        const checkCols = () => {
            const left = board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[2][0] === currentPlayer
            const center = board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[2][1] === currentPlayer
            const right = board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[2][2] === currentPlayer
            return left || center || right
        }

        const checkDiagonals = () => {
            const ltr = board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === currentPlayer
            const rtl = board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] === currentPlayer
            return ltr || rtl
        }

        return checkRows() || checkCols() || checkDiagonals()
    }

    const isPlaying = () => state === STATES.PLAYING
    const isGameOver = () => state === STATES.GAME_OVER
    const isTie = () => state === STATES.TIE

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