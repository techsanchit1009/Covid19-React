import React from "react";
import Card from "../../../shared/Card/Card";
import classes from "./RecoveryRatio.css";

const RecoveryRatio = (props) => {
 
  const formatCases = (cases) => {
    return (cases/1000).toFixed(1);
  }

  let percent = 0;
  let affectedCases = 0, recoveredCases = 0;
  if(props.totalCasesCount.length){
    affectedCases = props.totalCasesCount[0].casesCount;
    recoveredCases = props.totalCasesCount[1].casesCount;
    percent = ((recoveredCases / affectedCases) * 100).toFixed(1);  
  } 
  
  return (
    <Card>
      <div className={classes.RecoveryRatio}>
        <div className={classes.Heading}>Ratio of Recovery</div>
        <div className={classes.ProgressBarArea}>
          <svg>
            <defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="10%" stopColor="#06BA90" />
                <stop offset="90%" stopColor="#BAFAEB" />
              </linearGradient>
            </defs>
            <circle className={classes.Path} cx="50%" cy="50%" r="90" />
            <circle
              className={classes.Progress}
              style={{
                strokeDashoffset: `calc(565 - (565 * ${percent}) / 100)`,
                stroke: "url(#linear)"
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
            {formatCases(affectedCases)}k Affected
          </div>
          <div className={classes.RecoveredCount}>
            {formatCases(recoveredCases)}k Recovered
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecoveryRatio;
