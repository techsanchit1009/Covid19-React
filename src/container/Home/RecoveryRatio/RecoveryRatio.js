import React, { useEffect, useState } from "react";
import Card from "../../../shared/Card/Card";
import classes from "./RecoveryRatio.css";
import axios from "axios";

const recoveryRatio = () => {
  const [totalCases, setTotalCases] = useState({});
  useEffect(() => {
    axios.get("https://corona.lmao.ninja/all").then((response) => {
      let fetchedResponse = response.data;
      let casesObj = {
        activeCases: fetchedResponse.cases,
        recovered: fetchedResponse.recovered,
      };
      setTotalCases(casesObj);
    });
  }, []);

  const formatCases = (cases) => {
    return (cases/1000).toFixed(1);
  }

  const percent = ((totalCases.recovered / totalCases.activeCases) * 100).toFixed(1);
  return (
    <Card>
      <div className={classes.RecoveryRatio}>
        <div className={classes.Heading}>Ratio of Recovery</div>
        <div className={classes.ProgressBarArea}>
          <svg>
            <circle className={classes.Path} cx="50%" cy="50%" r="90" />
            <circle
              className={classes.Progress}
              style={{
                strokeDashoffset: `calc(565 - (565 * ${percent}) / 100)`,
              }}
              cx="50%"
              cy="50%"
              r="90"
            />
          </svg>
          <div className={classes.PercentBox}>
            <h2>
              {percent}
              <span style={{ fontSize: "18px" }}>%</span>
            </h2>
          </div>
        </div>
        <div className={classes.CaseCount}>
            <div className={classes.AffectedCount}>
              {formatCases(totalCases.activeCases)}k Affected
              </div>
          <div className={classes.RecoveredCount}>
            {formatCases(totalCases.recovered)}k Recovered
            </div>
        </div>
      </div>
    </Card>
  );
};

export default recoveryRatio;
