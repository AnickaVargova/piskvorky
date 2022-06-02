import React, {useContext} from 'react';
import { GameContext } from './App';
import styled from "styled-components";
import { Cell } from "./Cell";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 40px);
  grid-template-rows: repeat(8, 40px);
  border: 1px solid black;
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