import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuMore from "./moremenu.jsx";
import "./nav.css";

function Nav() {
  const location = useLocation(); // detects current route
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Toggle left bar for mobile burger menu
  const handleBurgerClick = () => {
    const leftBar = document.querySelector(".LBM");
    if (leftBar) {
      leftBar.style.display =
        leftBar.style.display === "none" ? "flex" : "none";
    }
  };

  const BurgerButton = useRef(null);
  useEffect(() => {
    const el = BurgerButton.current;
    if (!el) return;
    el.addEventListener("click", handleBurgerClick);
    return () => el.removeEventListener("click", handleBurgerClick);
  }, [BurgerButton]);

  return (
    <div className="navbar">
      {/* Logo in the center */}
      <Link to="/FYNDproject">
        <div className="navbar-logo">E-Fitness</div>
      </Link>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li className={activePath === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={activePath === "/about" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li className={activePath === "/contact" ? "active" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Burger button for mobile */}
      <div className="BurgerButton">
        <label className="hamburger">
          <input type="checkbox" ref={BurgerButton} />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            />
            <path className="line" d="M7 16 27 16" />
          </svg>
        </label>
      </div>

      {/* Login / Signup button on left */}
      <div className="navbar-auth left">
        <Link to="/auth">
          <button className="boton-elegante">Login / Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
