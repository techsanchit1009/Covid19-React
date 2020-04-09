import React, { useState, useEffect } from "react";
import Card from "../../shared/Card/Card";
import classes from "./CurrentSituations.css";
import axios from "axios";

const currentSituations = (props) => {
  const [cases, setCases] = useState([]);

  const formatCases = (caseCount) => {
    return caseCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    axios.get("https://corona.lmao.ninja/all").then((response) => {
      let updatedCases = [
        ...cases,
        {
          heading: "Total Cases",
          casesCount: formatCases(response.data.cases),
        },
        {
          heading: "Recovered",
          casesCount: formatCases(response.data.recovered),
        },
        {
          heading: "Active Cases",
          casesCount: formatCases(response.data.active),
        },
        {
          heading: "Total Deaths",
          casesCount: formatCases(response.data.deaths),
        },
      ];
      setCases(updatedCases);
    });
  }, []);

  return (
    <div className={classes.CurrentSituations}>
      {cases.map((item) => (
        <Card key={item.heading}>
          <div className={classes.CaseCard}>
            <span>
              <span className={classes.CaseHeading}>{item.heading}</span>
              <span className={classes.CaseCount}>{item.casesCount}</span>
            </span>
            <span className={classes.CaseGraph}></span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default currentSituations;
