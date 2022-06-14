import React from "react";

import QuestionCardNormalUser from "./QuestionCardNormalUser";
import QuestionCardPremium from "./QuestionCardPremium";

export const QuestionCard = ({ question }) => {


  return (
    <>
      {
        (question.user?.isSubscribed)
          ? (
            <QuestionCardPremium
              question={question}
            />


          )
          : (
            <QuestionCardNormalUser
              question={question}
            />
          )
      }
    </>

  );
};

