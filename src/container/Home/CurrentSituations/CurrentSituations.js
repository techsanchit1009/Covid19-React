import React from "react";
import Card from "../../../shared/Card/Card";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { AreaChart, Area, Tooltip, XAxis } from "recharts";
import classes from "./CurrentSituations.css";

const CurrentSituations = (props) => {
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
        <div key={item.heading} className={classes.CardWrapper}>
          <Card>
            <div className={classes.CaseCard}>
              <div>
                <span className={classes.CaseHeading}>
                  <span>{item.heading}</span>
                  <span className={classes.CaretSign}>
                    {printCaretSign(item.heading)}
                  </span>
                </span>
                <span className={classes.CaseCount}>
                  {formatCases(item.casesCount)}
                </span>
              </div>
              <div className={classes.CaseGraph}>
                <AreaChart width={72} height={60} data={props.splicedData}>
                  <Tooltip />
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
                    stroke={
                      item.heading === "Recovered" ? "#06BA90" : "#FF6C75"
                    }
                    strokeWidth={3}
                    dot={false}
                    fill={
                      item.heading === "Recovered"
                        ? "url(#colorGreen)"
                        : "url(#colorRed)"
                    }
                  />
                  <XAxis dataKey="date" hide={true} />
                </AreaChart>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CurrentSituations;
