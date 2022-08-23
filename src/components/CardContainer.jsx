import React, { useState, useEffect } from "react";
import data from "../data";
import Card from "./Card";

function CardContainer() {
  const [cards, setCards] = useState([]);

  // Set timer
  const [timer, setTimer] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...data, ...data]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
      }));
    setCards(shuffledCards);
    setTimer(0);
  };

  // Setting up choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleChoice = (card) => {
    if (!choiceTwo) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // compare
  useEffect(() => {
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
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // On page load shuffle cards
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    shuffleCards();
  }, []);

  // don't render
  if (!shouldRender) return null;

  // if every card is open end the game and show the score
  const matchedCards = cards.length
    ? cards.every((card) => card.matched)
    : false;
  console.log(matchedCards);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <button
          onClick={shuffleCards}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Shuffle Cards
        </button>
        <h2>Time</h2>
      </div>
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
    </div>
  );
}

export default CardContainer;
