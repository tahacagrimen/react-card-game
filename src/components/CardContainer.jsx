import React, { useState, useEffect } from "react";
import data from "../data";
import Card from "./Card";

function CardContainer() {
  const [gameOver, setGameOver] = useState(false);
  //
  //
  // STOPWATCH
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  // STOPWATCH
  //
  //

  const [cards, setCards] = useState([]);

  const shuffleCards = () => {
    setGameOver(false);
    const shuffledCards = [...data, ...data]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
      }));
    setCards(shuffledCards);
    setRunning(false);
    setTime(0);
  };

  // Setting up choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleChoice = (card) => {
    if (!choiceTwo) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
    setRunning(true);
  };

  // compare
  useEffect(() => {
    setGameOver(false);
    if (choiceOne && choiceTwo) {
      if (choiceOne.cardName === choiceTwo.cardName) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.cardName === choiceOne.cardName) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 500);
      }
    }
    if (cards.every((card) => card.matched) && cards.length > 0) {
      setGameOver(true);
      setRunning(false);
    }
  }, [choiceOne, choiceTwo]);

  // On page load shuffle cards
  //
  //
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    shuffleCards();
  }, []);

  // don't render
  if (!shouldRender) return null;
  //
  //
  // On page load shuffle cards

  // Reset choiced cards
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          onClick={shuffleCards}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
        >
          {gameOver ? "Play Again" : "Shuffle Cards"}
        </button>
        <div className="numbers">
          <span className="font-bold text-lg">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          </span>
          <span className="font-bold text-lg">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          </span>
          <span className="font-bold text-lg">
            {("0" + ((time / 10) % 100)).slice(-2)}
          </span>
        </div>
      </div>
      {gameOver ? (
        <div className="text-center text-2xl font-bold w-full h-full">
          <span className="text-red-500">You Win!</span>
        </div>
      ) : (
        <div className="card-container grid grid-cols-4 grid-rows-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              choiceOne={choiceOne}
              choiceTwo={choiceTwo}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardContainer;
