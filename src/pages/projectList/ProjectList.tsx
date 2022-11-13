import React from "react";

import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

import { Project } from "../../../types";
import { useCountdown } from "../../hooks/useCountDown";
import { PROJECTS } from "../../utils/data";
import Frame from "../components/Frame";
import ListBox from "../components/ListBox";

const ProjectList = () => {
  const navigate = useNavigate();
  const [days, hours, minutes, seconds] = useCountdown("Dec 5, 2022 15:37:25");

  return (
    <Frame title="Project List">
      <div className="project-wrapper">
        <div className="title-section">
          <div className="title">Project Listing</div>
          <div className="project-time">
            <span className="iconify" data-icon="fluent:timer-32-regular"></span>{" "}
            <div className="countdown">
              Live for {days} more days and {`${hours}:${minutes}:${seconds}`}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Scrollbars autoHide autoHideTimeout={1} style={{ width: "100%", height: "70vh" }}>
          {PROJECTS.Projects.map((data: Project) => (
            <div onClick={() => navigate("/project-detail", { state: data })} key={data.id}>
              <ListBox
                imagePath={data.image}
                title={data.title}
                detail={data.info}
                objective={data.objective}
                backer={data.backers}
                rank={data.rank}
              />
            </div>
          ))}
        </Scrollbars>
      </div>
    </Frame>
  );
};

export default ProjectList;
