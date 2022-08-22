import React from "react";

function Card({ card, img, name, isOpen }) {
  return (
    <div
      className="w-24 h-24 p-4 bg-slate-200 cursor-pointer rounded-2xl"
      value={isOpen}
      id={card}
    >
      <img className="w-full h-full" src={img} alt={name} />
    </div>
  );
}

export default Card;
