import React, { useEffect, useState } from "react";
import Card from "../../../shared/Card/Card";
import axios from "axios";
import { FaChevronRight, FaChevronLeft, FaArrowRight } from "react-icons/fa";
import newsLogo from "../../../assets/news_update.svg";
import classes from "./NewsUpdate.css";

const newsUpdate = () => {
  const [articles, setArticles] = useState([]);
  const [x, setX] = useState(0);

  const api_key = "c6a1adbb29f74f2eb5a2a5c54c6f51da";
  useEffect(() => {
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?q=COVID&country=in&apiKey=${api_key}`
      )
      .then((response) => {
        let fetchedNewsArticles = response.data.articles.slice(0, 10);
        console.log(fetchedNewsArticles);
        setArticles(fetchedNewsArticles);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      x === -100 * (articles.length - 1) ? setX(0) : setX(x - 100);
    }, 10000);
    return () => clearInterval(timer);
  }, [articles, x, setX]);


  const goLeft = () =>
    x === 0 ? setX(-100 * (articles.length - 1)) : setX(x + 100);
  const goRight = () =>
    x === -100 * (articles.length - 1) ? setX(0) : setX(x - 100);

  const formatNewsTime = (postTime) => {
    let fullTimeArr = new Date(postTime).toString().split(' ');
    let date = `${fullTimeArr[2]} ${fullTimeArr[1]}, ${fullTimeArr[3]}  `;
    let timeArr = fullTimeArr[4].split(":");
    let meridian = "AM";
    if(timeArr[0] > 12){
      timeArr[0] -= 12;
      meridian = "PM"
    }
    let timeString = `${timeArr[0]}:${timeArr[1]} ${meridian}`;
    return `${date}  ${timeString}`;
  }

  return (
    <div className={classes.NewsUpdate}>
      <Card>
        <div className={classes.Slider}>
          {articles.map((article, index) => (
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
                <div className={classes.NewsTime}>Posted on: {formatNewsTime(article.publishedAt)}</div>
                <div className={classes.NewsDesc}>
                  {article.description.substring(0, 100)}. . .
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

export default newsUpdate;
