import React from "react";
import classes from "./TwitterFeeds.css";
import Card from "../../shared/Card/Card";
import { FaTwitter } from "react-icons/fa";
import { TwitterTimelineEmbed } from "react-twitter-embed";


const twitterFeeds = () => {
  let twitterHandlers = ['WHO','PMOIndia','realDonaldTrump','TOIIndiaNews','ABPNews'];
  return (
    <div className={classes.TwitterFeeds}>
      <Card>
        <div className={classes.TwitterFeedsHeading}>
        <p>Latest Feeds</p>
        <span><FaTwitter /></span>
        </div>
        <div className={classes.TweetList}>
        {twitterHandlers.map(handler => (
          <div key={handler}>
          <TwitterTimelineEmbed
          sourceType="profile"
          screenName={handler}
          options={{ height: 400, tweetLimit: 1 }}
          noHeader
          noFooter
        />
        </div>
        ))}
        </div>
      </Card>
    </div>
  );
};

export default twitterFeeds;
