import React from "react";
import data from "../data";
import Card from "./Card";

function CardContainer() {
  // shuffle the cards
  const shuffledCardsOne = data.sort(() => 0.5 - Math.random());
  const shuffledCardsTwo = data.sort(() => 0.5 - Math.random());

  let cards = [...shuffledCardsOne, ...shuffledCardsTwo];
  cards = cards.sort(() => 0.5 - Math.random());
  console.log(cards);

  return (
    <div className="card-container grid grid-cols-4 grid-rows-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card.cardId}
          img={card.cardImage}
          name={card.cardName}
          isOpen={card.isOpen}
        />
      ))}
    </div>
  );
}

export default CardContainer;
