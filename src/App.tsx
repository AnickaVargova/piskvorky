import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Board } from './Board';
import { getWinner } from './helpers/getWinner';
import { X, O, Empty } from "./constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100vw;
`;

const Player = styled.div`
  color: blue;
  font-size: 30px;
  margin: 40px;
  font-weight: bold;
  height: 40px;
`;

const Winner = styled.div`
  color: purple;
  font-size: 30px;
  margin: 40px;
  font-weight: bold;
  height: 40px;
`;

const Reset = styled.div`
  height: 40px;
  width: 80px;
  background: pink;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
`;


type GameContextType = {
  player: string;
  togglePlayer: () => void;
  data: string[][];
  updateData: (rowId: number, elId: number) => void;
}

export const GameContext = React.createContext(null as unknown as GameContextType);

const defaultArray = Array.from({ length: Number(process.env.REACT_APP_SIZE) }).map(el => Array.from({ length: Number(process.env.REACT_APP_SIZE) }).map(el => Empty));

export type DefaultArray = typeof defaultArray;

function App() {

  const [data, setData] = useState(defaultArray);
  const [winner, setWinner] = useState(null as unknown as string | null);
  const [player, setPlayer] = useState(process.env.REACT_APP_FIRST_PLAYER as string);

  const togglePlayer = () => { !winner && (player === X ? setPlayer(O) : setPlayer(X) )};
  const updateData = (rowId: number, elId: number) => { !winner && setData((p) => p.map((row, pRowId) => pRowId === rowId ? row.map((el, pElId) => pElId === elId ? player : el) : row)) };

  useEffect(() => {setWinner(getWinner(player === X ? O : X, data))}, [data]);

  return (
    <GameContext.Provider value={{ player, togglePlayer, data, updateData }} >
      <Player>{!winner && `Next player: ${player}`}</Player>
      <Wrapper>
        <Board />
        <Winner>{winner && `${winner} is the winner!`}</Winner>
        <Reset onClick={()=> {setData(defaultArray); setWinner(null); setPlayer(X)}}>Reset</Reset>
      </Wrapper>
    </GameContext.Provider>
  );
}

export default App;
