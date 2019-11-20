import React from "react";
import "./buttons.css";

interface Props {
  onClick(): any;
  disabled: boolean;
}

const Button = (props: Props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      Atualizar
    </button>
  );
};

export default Button;
