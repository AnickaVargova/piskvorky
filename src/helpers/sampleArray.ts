import { X, O, Empty } from "../constants";

const choice = [X, O, Empty];

const getRandomSquare = () => choice[Math.floor(Math.random() * choice.length)];

const sampleArr = Array.from({ length: 8 }).map(el => Array.from({ length: 8 }).map(el => getRandomSquare()));
