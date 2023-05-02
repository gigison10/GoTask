import "./side-menu.css";
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
        <a href="#">Projects</a>
      </div>
      <div className="menu-categories">
        <TaskIcon />
        <a href="#">My Tasks</a>
      </div>
      <div className="menu-categories">
        <MessagesIcon />
        <a href="#">Messages</a>
      </div>
      <div className="menu-categories">
        <Calendar />
        <a href="#">Calendar</a>
      </div>
    </aside>
  );
}

export default SideMenu;
