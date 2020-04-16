import React, { useEffect, useState } from "react";
import Card from "../../../shared/Card/Card";
import { FaChevronRight, FaChevronLeft, FaArrowRight } from "react-icons/fa";
import newsLogo from "../../../assets/news_update.svg";
import { connect } from "react-redux";
import classes from "./NewsUpdate.css";


const NewsUpdate = (props) => {
  const [x, setX] = useState(0);

  const goLeft = () =>
    x === 0 ? setX(-100 * (props.newsArray.length - 1)) : setX(x + 100);
  const goRight = () =>
    x === -100 * (props.newsArray.length - 1) ? setX(0) : setX(x - 100);

  useEffect(() => {
    const timer = setInterval(() => {
      goRight();
    }, 10000);
    return () => clearInterval(timer);
  }, [props.newsArray, x, setX]);

  const formatNewsTime = (postTime) => {
    let fullTimeArr = new Date(postTime).toString().split(" ");
    let date = `${fullTimeArr[2]} ${fullTimeArr[1]}, ${fullTimeArr[3]}  `;
    let timeArr = fullTimeArr[4].split(":");
    let meridian = "AM";
    if (timeArr[0] > 12) {
      timeArr[0] -= 12;
      meridian = "PM";
    }
    let timeString = `${timeArr[0]}:${timeArr[1]} ${meridian}`;
    return `${date}  ${timeString}`;
  };

  return (
    <div className={classes.NewsUpdate}>
      <Card>
        <div className={classes.Slider}>
          {props.newsArray.map((article, index) => (
            <div
              className={classes.NewsCard}
              key={index}
              style={{ transform: `translateX(${x}%)` }}
            >
              <div>
                <img src={newsLogo} height="155px" width="145px" alt={index} />
              </div>
              <div className={classes.NewsInfo}>
                <span>News & Updates</span>
                <div className={classes.NewsTitle}>{article.title}</div>
                <div className={classes.NewsTime}>
                  Posted on: {formatNewsTime(article.publishedAt)}
                </div>
                <div className={classes.NewsDesc}>
                  {article.description ?  article.description.substring(0, 100).concat('. . .') : ' '}
                  <br />
                  <span>
                    <a href={article.url}>
                      Read More <FaArrowRight />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => goLeft()}
            className={[classes.NavigationButtons, classes.GoLeft].join(" ")}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => goRight()}
            className={[classes.NavigationButtons, classes.GoRight].join(" ")}
          >
            <FaChevronRight />
          </button>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    newsArray: state.newsData.newsArray
  }
};


export default connect(mapStateToProps)(NewsUpdate);
