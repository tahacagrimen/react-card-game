import React from "react";
import ReactCardFlip from "react-card-flip";

function Card({ card, handleChoice, flipped }) {
  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div>
      <ReactCardFlip
        isFlipped={flipped ? true : false}
        flipDirection="vertical"
      >
        {/* FRONT OF THE CARD  */}
        <div
          onClick={() => handleClick()}
          className="w-24 h-24 p-0 bg-slate-200 cursor-pointer  border-solid  border-0  border-slate-500 rounded-2xl"
        >
          <img
            className="w-full h-full border-solid  border-2  border-slate-500 rounded-2xl"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif"
            alt="card"
          />
        </div>
        {/* BACK OF THE CARD  */}
        <div
          onClick={() => handleClick()}
          className="w-24 h-24 p-4 bg-slate-200 cursor-pointer rounded-2xl"
          value={card.isOpen}
        >
          <img
            className="w-full h-full"
            src={card.cardImage}
            alt={card.cardName}
          />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
