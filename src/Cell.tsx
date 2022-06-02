import styled from "styled-components";
import React, { useContext } from 'react';
import { GameContext } from './App';

const Wrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

type Props = {
    elId: number;
    rowId: number;
}

export const Cell = ({ elId, rowId }: Props) => {
    const { togglePlayer, data, updateData} = useContext(GameContext);
    const symbol = data[rowId][elId];
    return (
        <Wrapper onClick={() => { updateData(rowId, elId); togglePlayer();}}>
            {symbol}
        </Wrapper>
    )
};