import React, { useState } from "react";
import Container from "../../shared/Container/Container";
import Faq from './Faq/Faq';
import classes from "./Faqs.css";


const Faqs = () => {
  const [faqs, setFaqs] = useState([
    {
      question: 'What is coronavirus?',
      answer: 'Coronaviruses are a large family of viruses which may cause illness in animals or humans.  In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19.',
      open: true
    },
    {
      question: 'What is COVID-19?',
      answer: 'COVID-19 is the infectious disease caused by the most recently discovered coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019.',
      open: false
    },
    {
      question: 'What are the symptoms of COVID-19?',
      answer: 'The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but don’t develop any symptoms and don\'t feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention.',
      open: false
    },
    {
      question: 'How does COVID-19 spread?',
      answer: 'People can catch COVID-19 from others who have the virus. The disease can spread from person to person through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or exhales. These droplets land on objects and surfaces around the person. Other people then catch COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick.',
      open: false
    },
    {
      question: 'Who is at risk of developing severe illness',
      answer: 'While we are still learning about how COVID-2019 affects people, older persons and persons with pre-existing medical conditions (such as high blood pressure, heart disease, lung disease, cancer or diabetes)  appear to develop serious illness more often than others.',
      open: false
    },
    {
      question: 'Is there a vaccine, drug or treatment for COVID-19?',
      answer: 'Not yet. To date, there is no vaccine and no specific antiviral medicine to prevent or treat COVID-2019. However, those affected should receive care to relieve symptoms. People with serious illness should be hospitalized. Most patients recover thanks to supportive care.',
      open: false
    },
    {
      question: 'How long is the incubation period for COVID-19?',
      answer: 'The “incubation period” means the time between catching the virus and beginning to have symptoms of the disease. Most estimates of the incubation period for COVID-19 range from 1-14 days, most commonly around five days. These estimates will be updated as more data become available.',
      open: false
    },
    {
      question: 'How long does the virus survive on surfaces?',
      answer: 'It is not certain how long the virus that causes COVID-19 survives on surfaces, but it seems to behave like other coronaviruses. Studies suggest that coronaviruses (including preliminary information on the COVID-19 virus) may persist on surfaces for a few hours or up to several days. This may vary under different conditions (e.g. type of surface, temperature or humidity of the environment).',
      open: false
    }
  ]);

  const toggleFaq = selectedIndex => {
    setFaqs(faqs.map((faq, index) => {
      if(index === selectedIndex){
        faq.open = !faq.open;
      } 
      else {
        faq.open = false;
      }
      return faq;
    }));
  }

  return (
    <div className={classes.Faqs}>
      <Container>
        <div className={classes.FaqHeading}><h1>FAQs</h1></div>

        <div className={classes.FaqsArea}>
          {faqs.map((faq, index) => (
            <Faq 
                index={index}
                key={index}
                question={faq.question}
                answer={faq.answer}
                open={faq.open}
                toggleFaq={toggleFaq} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Faqs;
