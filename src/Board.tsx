import React, {useContext} from 'react';
import { GameContext } from './App';
import styled from "styled-components";
import { Cell } from "./Cell";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${Number(process.env.REACT_APP_SIZE)}, 40px);
  grid-template-rows: repeat(${Number(process.env.REACT_APP_SIZE)}, 40px);
  border: 1px solid black;
  background: ${process.env.REACT_APP_BACKGROUND};
`;


export const Board = () => {
    const {data} = useContext(GameContext);
    const renderCells = () => data.map((row, rowId) => row.map((el, elId) => <Cell key={elId} elId={elId} rowId={rowId}/>))

    return (
    <StyledBoard>
        {renderCells()}
    </StyledBoard>
    )
}