import "./project-page.scss";
import ProjectAdd from "../projectAdd/project-add";

function ProjectPage() {
  return (
    <div className="project-container">
      <div className="project-menu">
        <div>sort by</div>
        <div>sort by</div>
        <div>sort by</div>
        <div>something</div>
      </div>
      <ProjectAdd />
    </div>
  );
}

export default ProjectPage;
