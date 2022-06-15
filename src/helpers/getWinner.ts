import { DefaultArray } from "../App";

// functions to transform original array to vertical, diagonal1 and diagonal2
const getVertical = (arr: DefaultArray) => {
    const resultArr = arr.map(el => [] as unknown[] as string[]);
    arr.map((row) => row.map((el, idY) => resultArr[idY].push(el)));
    return resultArr;
}

// before transformation to 2 arrays of diagonals, we need to get indices for x and y axes for all the elements in those arrays

const getDiagonalIndices1 = (columnCount = Number(process.env.REACT_APP_SIZE)-1, rowCount = Number(process.env.REACT_APP_SIZE)-1) => {
    let tempRow = [];
    const resultArr = [];

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    let x = minX;
    let y = maxY;

    while (maxX <= columnCount && maxY <= rowCount) {
        while (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            tempRow.push({ x, y });
            x++;
            y--;
        }

        resultArr.push(tempRow);
        tempRow = [];
        maxX = x;
        maxY++;
        x = minX;
        y = maxY;
    }

    minX = 1;
    minY = 1;
    maxX = columnCount;
    maxY = rowCount;
    x = minX;
    y = maxY;

    while (minX <= maxX && minY <= maxY) {
        while (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            tempRow.push({ x, y });
            x++;
            y--;
        }
        resultArr.push(tempRow);
        tempRow = [];
        minX++;
        minY++;
        x = minX;
        y = maxY;
    }

    return resultArr;
};

const getDiagonalIndices2 = (columnCount = Number(process.env.REACT_APP_SIZE)-1, rowCount = Number(process.env.REACT_APP_SIZE)-1) => {
    let tempRow = [];
    const resultArr = [];

    let minX = 0;
    let maxX = 0;
    let minY = rowCount;
    let maxY = rowCount;
    let x = minX;
    let y = maxY;

    while (maxX <= columnCount && maxY <= rowCount && minX >= 0 && minY >= 0) {
        while (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            tempRow.push({ x, y });
            x++;
            y++;
        }

        resultArr.push(tempRow);
        tempRow = [];
        maxX = x;
        minY--;
        x = minX;
        y = minY;
    }

    minX = 1;
    minY = 0;
    maxX = columnCount;
    maxY = rowCount - 1;
    x = minX;
    y = minY;

    while (minX <= maxX && minY <= maxY) {
        while (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            tempRow.push({ x, y });
            x++;
            y++;
        }
        resultArr.push(tempRow);
        tempRow = [];
        minX++;
        maxY--;
        x = minX;
        y = minY;
    }

    return resultArr;
}

// and we will need to get X or O symbols out of the original array with those indices
const getSymbol = (arr: DefaultArray, obj: { x: number, y: number }) => {
    return arr[obj.y][obj.x];
}

const getDiagonals = (arr: DefaultArray, callbackFn: typeof getDiagonalIndices1) => {
    const indicesArr = callbackFn();
    return indicesArr.map((row) => row.map((el) => getSymbol(arr, el)));
}

const doesWinningRowExist = (line: string[], player: string, winningCount = 5) => {
    let count = 0;
    let maxCount = 0;
    line.map(el => {
        if (el === player) {
            count++;
            if(count > maxCount) {maxCount = count};
        }
        else {
            count = 0;
        }
    })
    return maxCount >= winningCount;
}

// call previous function for all rows/columns in one direction

const hasPlayerWonInDir = (player: string, array: DefaultArray) =>
    array.map(row => doesWinningRowExist(row, player)).some(el => el);

// call previous function for all 4 arrays(horizontal, vertical, diagonal1, diagonal2)

export const getWinner = (player: string, arr: DefaultArray) =>
    hasPlayerWonInDir(player, arr) || hasPlayerWonInDir(player, getVertical(arr)) || hasPlayerWonInDir(player, getDiagonals(arr, getDiagonalIndices1 )) || hasPlayerWonInDir(player, getDiagonals(arr, getDiagonalIndices2 )) ? player : null;
