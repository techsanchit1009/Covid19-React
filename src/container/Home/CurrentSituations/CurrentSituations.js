import React, { useState, useEffect } from "react";
import Card from "../../../shared/Card/Card";
import axios from "axios";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { AreaChart, Area, Tooltip, XAxis } from "recharts";
import classes from "./CurrentSituations.css";

const currentSituations = () => {
  const [totalCases, setTotalCases] = useState([]);
  const [casesTimeline, setCasesTimeline] = useState([]);

  const formatCases = (caseCount) => {
    return caseCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
          groupedObj["Total Cases"] = totalCases;
          groupedObj["Recovered"] = totalRecovered;
          groupedObj["Total Deaths"] = totalDeath;
          groupedObj["Active Cases"] =
            totalCases - (totalRecovered + totalDeath);
          finalData.push(groupedObj);
        }
        const splicedFinalData = finalData.splice(-10);
        console.log(splicedFinalData);
        setCasesTimeline(splicedFinalData);

        let updatedCases = [
          {
            heading: "Total Cases",
            casesCount: formatCases(
              splicedFinalData.slice(-1)[0]["Total Cases"]
            ),
          },
          {
            heading: "Recovered",
            casesCount: formatCases(splicedFinalData.slice(-1)[0]["Recovered"]),
          },
          {
            heading: "Active Cases",
            casesCount: formatCases(
              splicedFinalData.slice(-1)[0]["Active Cases"]
            ),
          },
          {
            heading: "Total Deaths",
            casesCount: formatCases(
              splicedFinalData.slice(-1)[0]["Total Deaths"]
            ),
          },
        ];
        console.log(updatedCases);
        setTotalCases(updatedCases);
      });
  }, []);

  const printCaretSign = (caseType) => {
    let caretSign;
    let caretColor = "red";

    if (caseType === "Recovered") {
      caretColor = "#06BA90";
    }

    if (casesTimeline[9][caseType] > casesTimeline[8][caseType]) {
      caretSign = <FaCaretUp color={caretColor} />;
    } else {
      caretSign = <FaCaretDown color={caretColor} />;
    }
    return caretSign;
  };

  return (
    <div className={classes.CurrentSituations}>
      {totalCases.map((item) => (
        <Card key={item.heading}>
          <div className={classes.CaseCard}>
            <span>
              <span className={classes.CaseHeading}>
                <span>{item.heading}</span>
                <span className={classes.CaretSign}>
                  {printCaretSign(item.heading)}
                </span>
              </span>
              <span className={classes.CaseCount}>{item.casesCount}</span>
            </span>
            <span className={classes.CaseGraph}>
              <AreaChart width={72} height={55} data={casesTimeline}>
                <Tooltip viewBox={{width: 100, height: 100}}/>
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06BA90" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06BA90" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6C75" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF6C75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="linear"
                  dataKey={item.heading}
                  stroke={item.heading === "Recovered" ? "#06BA90" : "#FF6C75"}
                  strokeWidth={3}
                  dot={false}
                  fill={item.heading === "Recovered" ? "url(#colorGreen)" : "url(#colorRed)"}
                />
                <XAxis dataKey="date" hide={true}/>
              </AreaChart>
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default currentSituations;
