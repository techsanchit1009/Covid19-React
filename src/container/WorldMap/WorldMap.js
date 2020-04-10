/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "./mapData";
import Card from "../../shared/Card/Card";
import classes from "./WorldMap.css";
import axios from "axios";

require("highcharts/modules/map")(Highcharts);

const worldMap = () => {
  const [countriesArray, setCountriesArray] = useState([]);
  const [totalCases, setTotalCases] = useState();

  useEffect(() => {
    axios.get("https://api.covid19api.com/summary").then((response) => {
      let convertedArray = [];
      response.data.Countries.map((country) => {
        let countryArray = new Array(
          country.CountryCode.toLowerCase(),
          country.TotalConfirmed
        );
        return convertedArray.push(countryArray);
      });
      setTotalCases(response.data.Global.TotalConfirmed);
      setCountriesArray(convertedArray);
    });
  }, []);

  const mapOptions = {
    chart:{
      backgroundColor: '#FBF6F6'
    },
    title: {
      text: "",
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.005, "#FFC4C6"],
        [0.01, "#FF6F7D"],
        [0.2, "#FF0019"],
      ],
    },

    series: [
      {
        mapData: mapData,
        name: "Country",
        data: countriesArray,
      },
    ],
  };

  return (
    <div className={classes.WorldMap}>
      <Card>
        {/* <button onClick={() => console.log(10000/totalCases)}>Cicke</button> */}
        <div className={classes.MapHeading}>
          <div style={{'fontWeight': 'bold'}}>COVID-19 Affected Areas</div>
          <div className={classes.ColorLabels}>
            <div><span className={classes.Most}></span> Most Affected</div>
            <div><span className={classes.Least}></span> Least Affected</div>
          </div>
        </div>
        <div className={classes.Map}>
          <HighchartsReact
            options={mapOptions}
            constructorType={"mapChart"}
            highcharts={Highcharts}
          />
        </div>
      </Card>
    </div>
  );
};

export default worldMap;
