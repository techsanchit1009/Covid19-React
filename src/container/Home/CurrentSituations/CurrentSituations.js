import React, { useEffect } from "react";
import Card from "../../../shared/Card/Card";
import { connect } from 'react-redux';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { AreaChart, Area, Tooltip, XAxis } from "recharts";
import classes from "./CurrentSituations.css";
import * as timelineAction from '../../../store/actions/fetchByTimeline';

const CurrentSituations = (props) => {

  useEffect(() => {
    props.onFetchTimeline();
  }, [props.onFetchTimeline]);

  const formatCases = (caseCount) => {
    return caseCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const printCaretSign = (caseType) => {
    let caretSign;
    let caretColor = "red";

    if (caseType === "Recovered") {
      caretColor = "#06BA90";
    }

    if (props.splicedData[9][caseType] > props.splicedData[8][caseType]) {
      caretSign = <FaCaretUp color={caretColor} />;
    } else {
      caretSign = <FaCaretDown color={caretColor} />;
    }
    return caretSign;
  };


  return (
    <div className={classes.CurrentSituations}>
      {props.totalCasesCount.map((item) => (
        <Card key={item.heading}>
          <div className={classes.CaseCard}>
            <span>
              <span className={classes.CaseHeading}>
                <span>{item.heading}</span>
                <span className={classes.CaretSign}>
                  {printCaretSign(item.heading)}
                </span>
              </span>
              <span className={classes.CaseCount}>{formatCases(item.casesCount)}</span>
            </span>
            <span className={classes.CaseGraph}>
              <AreaChart width={72} height={55} data={props.splicedData}>
                <Tooltip viewBox={{width: 100, height: 100}}/>
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06BA90" stopOpacity={0.8} />
                    <stop offset="60%" stopColor="#06BA90" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6C75" stopOpacity={0.8} />
                    <stop offset="60%" stopColor="#FF6C75" stopOpacity={0} />
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

const mapStateToProps = state => {
  return {
    totalCasesCount: state.casesData.totalCases,
    splicedData: state.casesData.splicedData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTimeline: () => dispatch(timelineAction.initFetchByTimeline())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSituations);
