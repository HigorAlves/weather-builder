import React from "react";
import "./index.css";

interface Props {
  city: string;
  country: string;
}

function weekDay() {
  const day: number = new Date().getDay();

  switch (day) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda-Feira";
    case 2:
      return "Terça-Feira";
    case 3:
      return "Quarta-Feira";
    case 4:
      return "Quinta-Feira";
    case 5:
      return "Sexta-Feira";
    case 6:
      return "Sábado";
  }
}

const rightSide = (props: Props) => {
  return (
    <section className="right-side">
      <p>{weekDay()}</p>
      <small>{props.city + ", " + props.country}</small>
    </section>
  );
};
export default rightSide;
