import React from "react";
import Button from "../Button";

import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          {social.title === "Email" ? (
            <img src="/images/gmail.png" alt="Email" style={{ width: 36, height: 36 }} />
          ) : social.title === "Instagram" ? (
            <img src="/images/insta.png" alt="Instagram" style={{ width: 36, height: 36 }} />
          ) : (
            social.title
          )}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
