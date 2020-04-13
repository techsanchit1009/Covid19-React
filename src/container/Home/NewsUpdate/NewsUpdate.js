import React, { useEffect } from 'react';
import Card from '../../../shared/Card/Card';
import axios from 'axios';
import classes from './NewsUpdate.css';


const newsUpdate = props => {
  const api_key = 'c6a1adbb29f74f2eb5a2a5c54c6f51da';
  useEffect(() => {
    axios.get(`http://newsapi.org/v2/top-headlines?q=COVID&country=in&apiKey=${api_key}`)
        .then(response => console.log(response.data.articles));
  }, []);

  return(
    <div className={classes.NewsUpdate}>
    <Card>
      News Update
    </Card>
    </div>
  );
};

export default newsUpdate