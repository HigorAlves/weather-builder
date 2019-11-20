import React from "react";

interface Props {
  max: number;
  min: number;
  temp: number;
}

const MaxAndMinTemp = (props: Props) => {
  return (
    <>
      <h1 style={{ margin: 0, padding: 0 }}>{props.temp}˚C</h1>
      <section className="row center-xs center-sm center-md center-lg">
        <div className="col-xs-3">
          <p>Maxima: {props.max}˚</p>
        </div>
        <div className="col-xs-3">
          <p>Minima: {props.min}˚</p>
        </div>
      </section>
    </>
  );
};
export default MaxAndMinTemp;
