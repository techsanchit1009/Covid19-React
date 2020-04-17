import React, { useState } from "react";
import Card from "../../../shared/Card/Card";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import classes from "./SpreadTrends.css";
import { connect } from "react-redux";


const SpreadTrends = props => {
  const [graphType, setGraphType] = useState("Total Cases");

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
                graphType === "Total Cases"
                  ? [classes.GraphButton, classes.Active].join(" ")
                  : classes.GraphButton
              }
              onClick={() => setGraphType("Total Cases")}
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
                graphType === "Total Deaths"
                  ? [classes.GraphButton, classes.Active].join(" ")
                  : classes.GraphButton
              }
              onClick={() => setGraphType("Total Deaths")}
            >Deceased</button>

          </div>
        </div>
        <div className={classes.Graph}>
          <LineChart width={420} height={151} data={props.casesByTimeline} >
            <YAxis tick={{ fontSize: "12px" }} orientation="right" padding={{ bottom: 10}}/>
            <Tooltip />
            <Line
              type="monotone"
              dataKey={graphType}
              stroke={graphType==='Recovered' ? "#06BA90" : "#FF6C75" }
              strokeWidth={2}
              isAnimationActive={true}
              dot={false}
            />
            <XAxis dataKey="date" tick={{ fontSize: "12px" }} padding={{ right: 10 }}/>
          </LineChart>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    casesByTimeline: state.casesData.casesByTimeline
  }
};



export default connect(mapStateToProps)(SpreadTrends);
