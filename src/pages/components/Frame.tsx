import React from "react";

import { Scrollbars } from "react-custom-scrollbars-2";
import { Helmet } from "react-helmet";

import Footer from "./Footer";
import Header from "./Header";

interface FrameProps {
  title: string;
  children: React.ReactNode;
  isLanding?: boolean;
  useDefaultScroll?: boolean;
}

const Frame: React.FC<FrameProps> = ({ title, children, isLanding, useDefaultScroll }: FrameProps) => {
  return (
    <div className={isLanding ? "landing-bg" : "bg"}>
      <Helmet>
        <title>{title} | Kolo</title>
      </Helmet>
      <Header isLanding={isLanding} />
      {useDefaultScroll ? (
        <div>
          <div className="wrapper">{children}</div>
        </div>
      ) : (
        <Scrollbars autoHide autoHideTimeout={1} style={{ width: "100vw", height: "80vh" }} className="scroll">
          <div className="wrapper">{children}</div>
        </Scrollbars>
      )}
      <Footer isLanding={isLanding} />
    </div>
  );
};

export default Frame;
