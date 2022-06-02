import { DefaultArray } from "../App";

// functions to transform original array to vertical, diagonal1 and diagonal2
const getVertical = (arr: DefaultArray) => {
    const resultArr = arr.map(el => [] as unknown[] as string[]);
    arr.map((row) => row.map((el, idY) => resultArr[idY].push(el)));
    return resultArr;
}

// before transformation to 2 arrays of diagonals, we need to get indices for x and y axes for all the elements in those arrays

const getDiagonalIndices1 = () => {
    let tempArr = [];
    const resultArr = [];

    let rowMin = 0;
    let rowMax = 0;
    let columnMin = 0;
    let columnMax = 0;
    let x = rowMin;
    let y = columnMax;

    while (rowMax <= 7 && columnMax <= 7) {
        while (x >= rowMin && x <= rowMax && y >= columnMin && y <= columnMax) {
            tempArr.push({ x, y });
            x++;
            y--;
        }

        resultArr.push(tempArr);
        tempArr = [];
        rowMax = x;
        columnMax++;
        x = rowMin;
        y = columnMax;
    }

    rowMin = 1;
    columnMin = 1;
    rowMax = 7;
    columnMax = 7;
    x = rowMin;
    y = columnMax;

    while (rowMin <= rowMax && columnMin <= columnMax) {
        while (x >= rowMin && x <= rowMax && y >= columnMin && y <= columnMax) {
            tempArr.push({ x, y });
            x++;
            y--;
        }
        resultArr.push(tempArr);
        tempArr = [];
        rowMin++;
        columnMin++;
        x = rowMin;
        y = columnMax;
    }

    return resultArr;
};

const getDiagonalIndices2 = () => {
    let tempArr = [];
    const resultArr = [];

    let rowMin = 0;
    let rowMax = 0;
    let columnMin = 7;
    let columnMax = 7;
    let x = rowMin;
    let y = columnMax;

    while (rowMax <= 7 && columnMax <= 7 && rowMin >= 0 && columnMin >= 0) {
        while (x >= rowMin && x <= rowMax && y >= columnMin && y <= columnMax) {
            tempArr.push({ x, y });
            x++;
            y++;
        }

        resultArr.push(tempArr);
        tempArr = [];
        rowMax = x;
        columnMin--;
        x = rowMin;
        y = columnMin;
    }

    rowMin = 1;
    columnMin = 0;
    rowMax = 7;
    columnMax = 6;
    x = rowMin;
    y = columnMin;

    while (rowMin <= rowMax && columnMin <= columnMax) {
        while (x >= rowMin && x <= rowMax && y >= columnMin && y <= columnMax) {
            tempArr.push({ x, y });
            x++;
            y++;
        }
        resultArr.push(tempArr);
        tempArr = [];
        rowMin++;
        columnMax--;
        x = rowMin;
        y = columnMin;
    }

    return resultArr;
}

// and we will need to get X or O symbols out of the original array with those indices
const getSymbol = (arr: DefaultArray, obj: { x: number, y: number }) => {
    return arr[obj.y][obj.x];
}

const getDiagonals = (arr: DefaultArray, callbackFn: typeof getDiagonalIndices1) => {
    const indicesArr = callbackFn();
    return indicesArr.map((row:any) => row.map((el:any) => getSymbol(arr, el)));
}

const doesWinningRowExist = (line: string[], player: string, winningMax: number = 5) => {
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
    return maxCount >= winningMax;
}

// call previous function for all rows/columns in one direction

const hasPlayerWonInDir = (player: string, array: DefaultArray) =>
    array.map(row => doesWinningRowExist(row, player)).some(el => el);

// call previous function for all 4 arrays(horizontal, vertical, diagonal1, diagonal2)

export const getWinner = (player: string, arr: DefaultArray) =>
    hasPlayerWonInDir(player, arr) || hasPlayerWonInDir(player, getVertical(arr)) || hasPlayerWonInDir(player, getDiagonals(arr, getDiagonalIndices1 )) || hasPlayerWonInDir(player, getDiagonals(arr, getDiagonalIndices2 )) ? player : null;
