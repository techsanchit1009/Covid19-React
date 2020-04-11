import React, { useEffect, useState } from "react";
import Card from "../../shared/Card/Card";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import classes from "./SpreadTrends.css";

const spreadTrends = () => {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then((response) => {
        const countryList = Object.keys(response.data);
        const totalDays = response.data[countryList[0]].length;
        console.log(response.data, response.data[countryList[0]][3], totalDays);
        const totalCountries = countryList.length;
        const finalData = [];
        for (let i = 0; i < totalDays; i++) {
          let date = response.data[countryList[0]][i].date;
          let groupedObj = { date: date };
          let totalCases = 0;
          let totalRecovered = 0;
          let totalDeath = 0;
          for (let j = 0; j < totalCountries; j++) {
            totalCases += response.data[countryList[j]][i].confirmed;
            totalRecovered += response.data[countryList[j]][i].recovered;
            totalDeath += response.data[countryList[j]][i].deaths;
          }
          groupedObj.confirmedCases = totalCases;
          groupedObj.recoveredCases = totalRecovered;
          groupedObj.deaths = totalDeath;
          finalData.push(groupedObj);
        }
        console.log(finalData);
        setGraphData(finalData);
      });
  }, []);
  return (
    <div className={classes.SpreadTrends}>
      <Card>
        <div className={classes.GraphHeading}>
        <p>SpreadTrends</p>
        </div>
        <div className={classes.Graph}>
          <LineChart width={448} height={151} data={graphData}>
            <YAxis tick={{ fontSize: "12px" }} orientation="right" />
            <Tooltip />
            <Line
              type="linear"
              dataKey="confirmedCases"
              stroke="#FF6C75"
              strokeWidth={2}
            />
            <XAxis dataKey="date" tick={{ fontSize: "12px" }} />
          </LineChart>
        </div>
      </Card>
    </div>
  );
};

export default spreadTrends;
