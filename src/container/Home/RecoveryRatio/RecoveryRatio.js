import React from "react";
import Card from "../../../shared/Card/Card";
import classes from "./RecoveryRatio.css";
import { connect } from "react-redux";

const RecoveryRatio = (props) => {
 
  const formatCases = (cases) => {
    return (cases/1000).toFixed(1);
  }

  let percent;
  let affectedCases, recoveredCases;
  if(props.totalCases.length){
    affectedCases = props.totalCases[0].casesCount;
    recoveredCases = props.totalCases[1].casesCount;
    percent = ((recoveredCases / affectedCases) * 100).toFixed(1);  
  } 
  
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

const mapStateToProps = state => {
  return {
    totalCases: state.casesData.totalCases
  }
};


export default connect(mapStateToProps)(RecoveryRatio);
