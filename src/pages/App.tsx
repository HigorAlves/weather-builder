import React, { useEffect, useState } from "react";
import RightSide from "components/rightSide";
import Button from "components/button";
import "assets/css/home.css";

interface CoordsProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface CityData {
  name: string | undefined;
  main: {
    temp: number | undefined;
    temp_max: number | undefined;
    temp_min: number | undefined;
  };
  sys: {
    country: string | undefined;
  };
  weather: any;
}

const App: React.FC = () => {
  const [coords, setCoords] = useState<CoordsProps>();
  const [data, setData] = useState<CityData>();
  const [load, setLoad] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<string>();

  function getLocation(): void {
    navigator.geolocation.getCurrentPosition(
      data => {
        setCoords({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        });
        setLoad(false);
        return;
      },
      error => {
        return { error: true, code: 1 };
      }
    );
  }

  function getWheater() {
    fetch(
      `http://api.openweathermap.org/data/2.5/find?lat=${
        coords!.latitude
      }&lon=${coords!.longitude}&units=metric&cnt=15&APPID=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(async (result: any) => {
        const cityData = await result.json().then((data: any) => data.list[0]);
        setData(cityData);
        currentTimeNow();
        console.log(cityData);
      })
      .catch(error => console.error(error));
  }

  function currentTimeNow() {
    var currentdate = new Date();
    setLastUpdate(
      currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds()
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (load === false) {
      getWheater();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <div className="bg-animated">
      {data && (
        <div className="container-fluid">
          <RightSide city={data.name} country={data.sys.country} />
          <div className="center-xs center-sm center-md center-lg">
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="Weather Icon"
            />

            <h1 style={{ margin: 0, padding: 0 }}>
              {data ? data.main.temp : 0}˚C
            </h1>
            <section className="row center-xs center-sm center-md center-lg">
              <div className="col-xs-3">
                <p>Maxima: {data ? data.main.temp_max : null}˚</p>
              </div>
              <div className="col-xs-3">
                <p>Minima: {data ? data.main.temp_min : null}˚</p>
              </div>
            </section>
            <section>
              <h3>Última atualização:</h3>
              <p>{lastUpdate}</p>
            </section>
            <Button onClick={() => getWheater()} disabled={load} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
