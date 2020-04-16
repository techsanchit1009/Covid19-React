import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "./mapData";
import Card from "../../../shared/Card/Card";
import classes from "./WorldMap.css";
import { connect } from 'react-redux';


require("highcharts/modules/map")(Highcharts);

const WorldMap = (props) => {

  const mapOptions = {
    chart: {
      backgroundColor: "#FBF6F6",
    },
    title: {
      text: "",
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.005, "#FFC4C6"],
        [0.01, "#FF6F7D"],
        [0.2, "#FF0019"],
      ],
    },

    series: [
      {
        mapData: mapData,
        name: "Country",
        data: props.worldMapData,
      },
    ],
  };

  return (
    <div className={classes.WorldMap}>
      <Card>
        <div className={classes.MapHeading}>
          <div style={{ fontWeight: "bold" }}>COVID-19 Affected Areas</div>
          <div className={classes.ColorLabels}>
            <div>
              <span className={classes.Most}></span> Most Affected
            </div>
            <div>
              <span className={classes.Least}></span> Least Affected
            </div>
          </div>
        </div>
        <div className={classes.Map}>
          <HighchartsReact
            options={mapOptions}
            constructorType={"mapChart"}
            highcharts={Highcharts}
          />
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    worldMapData: state.casesData.worldMapData
  }
};

export default connect(mapStateToProps)(WorldMap);
