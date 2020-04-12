import React, { useEffect, useState } from "react";
import Card from "../../shared/Card/Card";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import classes from "./SpreadTrends.css";

const spreadTrends = () => {
  const [graphData, setGraphData] = useState([]);
  const [graphType, setGraphType] = useState("Confirmed");

  useEffect(() => {
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then((response) => {
        const countryList = Object.keys(response.data);
        const totalDays = response.data[countryList[0]].length;
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
          groupedObj["Confirmed"] = totalCases;
          groupedObj["Recovered"] = totalRecovered;
          groupedObj["Deaths"] = totalDeath;
          finalData.push(groupedObj);
        }
        setGraphData(finalData);
      });
  }, []);

  return (
    <div className={classes.SpreadTrends}>
      <Card>
        <div className={classes.GraphHeading}>
          <div>
            <p>Spread Trends</p>
          </div>
          <div className={classes.GraphButtonsArea}>
            <button
              className={
                graphType === "Confirmed"
                  ? [classes.GraphButton, classes.Active].join(" ")
                  : classes.GraphButton
              }
              onClick={() => setGraphType("Confirmed")}
            >Confirmed</button>

            <button
              className={
                graphType === "Recovered"
                  ? [classes.GraphButton, classes.Active].join(" ")
                  : classes.GraphButton
              }
              onClick={() => setGraphType("Recovered")}
            >Recovered</button>

            <button
              className={
                graphType === "Deaths"
                  ? [classes.GraphButton, classes.Active].join(" ")
                  : classes.GraphButton
              }
              onClick={() => setGraphType("Deaths")}
            >Deceased</button>

          </div>
        </div>
        <div className={classes.Graph}>
          <LineChart width={448} height={151} data={graphData} >
            <YAxis tick={{ fontSize: "12px" }} orientation="right" padding={{ bottom: 10}}/>
            <Tooltip />
            <Line
              type="monotone"
              dataKey={graphType}
              stroke="#FF6C75"
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="date" tick={{ fontSize: "12px" }} padding={{ right: 10 }}/>
          </LineChart>
        </div>
      </Card>
    </div>
  );
};

export default spreadTrends;
