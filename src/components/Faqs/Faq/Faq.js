import React from "react";
import Card from "../../../shared/Card/Card";
import { FaCaretDown } from "react-icons/fa";
import classes from "./Faq.css";

const Faq = (props) => {
  let attachedClasses = [classes.Faq];
  if (props.open) {
    attachedClasses = [classes.Faq, classes.Open];
  }
  return (
    <div className={attachedClasses.join(" ")}>
      <Card>
        <div className={classes.FaqQuestion} onClick={() => props.toggleFaq(props.index)}>
          <div>{props.question}</div>
          <div className={classes.CaretArea}><FaCaretDown size="20px"/></div>
        </div>
      </Card>
      <Card>
        <div className={classes.FaqAnswer}>{props.answer}</div>
      </Card>
    </div>
  );
};

export default Faq;
