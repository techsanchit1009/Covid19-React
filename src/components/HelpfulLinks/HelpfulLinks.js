import React from "react";
import Card from "../../shared/Card/Card";
import Container from "../../shared/Container/Container";
import classes from "./HelpfulLinks.css";

const HelpfulLinks = () => {
  const links = [
    {
      title: "HELPLINE NUMBERS [by State]",
      link: 'https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf'
    },
    {
      title: 'WHO : COVID-19 Home Page',
      link: 'https://www.who.int/EMERGENCIES/DISEASES/NOVEL-CORONAVIRUS-2019',
    },
    {
      title: 'Ministry of Health and Family Welfare, Gov. of India',
      link: 'https://www.mohfw.gov.in/'
    },
    {
      title: 'CDC',
      link: 'https://www.cdc.gov/CORONAVIRUS/2019-NCOV/FAQ.HTML'
    },
    {
      title: 'Crowdsourced list of Resources & Essentials from across India',
      link: 'https://bit.ly/covid19resourcelist'
    }
  ];

  return (
    <div className={classes.HelpfulLinks}>
      <Container>
        <div className={classes.Heading}>
          <h1>Helpful Links</h1>
        </div>
        {links.map((link) => (
          <div className={classes.CardWrapper}>
          <Card>
            <div className={classes.LinkBox}>
              <div className={classes.LinkTitle}>
                {link.title}
              </div>
              <div className={classes.Link}>
                <a href={link.link} target="_blank">{link.link} </a>
              </div>
            </div>
          </Card>
          </div>
        ))}
        <div className={classes.VideoArea}>
          <div className={classes.VideoTitle}>
            How to protect yourself against COVID-19
          </div>
          <div className={classes.Video}>
            <iframe
              width="450"
              height="250"
              src="https://www.youtube.com/embed/1APwq1df6Mw"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpfulLinks;
