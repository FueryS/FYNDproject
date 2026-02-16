import React from "react";
import "./nav.css";

function MenuMore() {
  const [show, setShow] = React.useState(false);

  function toggleDropdown() {
    setShow((prev) => !prev);
  }

  return (
    <div className="menu-more">
      <button className="more-button" onClick={toggleDropdown}>
        More
      </button>
      <div className={`more-dropdown${show ? " show" : ""}`}>
        <div className="more-dropdown-list">
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#help">Help</a>
          </li>
          <li>
            <a href="#feedback">Feedback</a>
          </li>
        </div>
      </div>
    </div>
  );
}
export default MenuMore;

//please remeber to add a few more features like ui to show which page you are on
//replace the logo
//temporarily starting something else
