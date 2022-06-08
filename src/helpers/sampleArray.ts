import { X, O, Empty } from "../constants";

const choice = [X, O, Empty];

const getRandomSquare = () => choice[Math.floor(Math.random() * choice.length)];

const sampleArr = Array.from({ length: Number(process.env.REACT_APP_SIZE)-1 }).map(el => Array.from({ length: Number(process.env.REACT_APP_SIZE)-1 }).map(el => getRandomSquare()));
