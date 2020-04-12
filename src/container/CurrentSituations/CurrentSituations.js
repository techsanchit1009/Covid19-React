import React, { useState, useEffect } from "react";
import Card from "../../shared/Card/Card";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./CurrentSituations.css";

const currentSituations = (props) => {
  const [cases, setCases] = useState([]);

  const formatCases = (caseCount) => {
    return caseCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    axios
      .get("https://api.thevirustracker.com/free-api?global=stats")
      .then((response) => {
        let fetchedResponse = response.data.results[0];
        let updatedCases = [
          ...cases,
          {
            heading: "Total Cases",
            casesCount: formatCases(fetchedResponse.total_cases),
          },
          {
            heading: "Recovered",
            casesCount: formatCases(fetchedResponse.total_recovered),
          },
          {
            heading: "Active Cases",
            casesCount: formatCases(fetchedResponse.total_active_cases),
          },
          {
            heading: "Total Deaths",
            casesCount: formatCases(fetchedResponse.total_deaths),
          },
        ];
        setCases(updatedCases);
      })
      .catch((err) => console.log("Error in fetching data"));
  }, []);

  return (
    <div className={classes.CurrentSituations}>
      {cases.map((item) => (
        <Card key={item.heading}>
          <div className={classes.CaseCard}>
            <span>
              <span className={classes.CaseHeading}>
                <span>{item.heading}</span>
                <span className={classes.CaretSign}>
                  {item.heading === 'Recovered' 
                  ? <FontAwesomeIcon color="#06BA90" icon={faCaretDown} />
                  :  <FontAwesomeIcon color="red" icon={faCaretUp} /> }
                </span>
              </span>
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
