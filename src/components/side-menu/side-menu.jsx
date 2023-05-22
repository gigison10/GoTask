import "./side-menu.scss";
import {
  ProjectIcon,
  TaskIcon,
  MessagesIcon,
  Calendar,
} from "../../assets/icons.jsx";

function SideMenu() {
  return (
    <aside>
      <span className="menu-text">Menu</span>
      <div className="menu-categories">
        <ProjectIcon />
        <h4>Projects</h4>
      </div>
      <div className="menu-categories">
        <TaskIcon />
        <h4>My Tasks</h4>
      </div>
      <div className="menu-categories">
        <MessagesIcon />
        <h4>Messages</h4>
      </div>
      <div className="menu-categories">
        <Calendar />
        <h4>Calendar</h4>
      </div>
    </aside>
  );
}

export default SideMenu;
