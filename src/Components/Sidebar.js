import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "./store/HiddenSlice";

const Sidebar = () => {
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");

  useEffect(() => {
    const pageURLArray = window.location.href.split("/");
    setUrl(pageURLArray[pageURLArray.length - 1]);
  });

  useEffect(() => {
    const handleResize = () => {
      // ---------------------------------------------------------------function to hide/show sidebar based on screen size
      if (window.innerWidth < 768 && hidden === false) {
        dispatch(setHidden(!hidden));
      } else if (window.innerWidth >= 768 && hidden === true) {
        dispatch(setHidden(!hidden));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hidden]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch(setHidden(true));
    }
  }, []);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        window.innerWidth < 768 &&
        !sidebarRef.current.contains(event.target)
      ) {
        dispatch(setHidden(!hidden));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      ref={sidebarRef}
      style={{
        background: "white",
        overflow: "hidden",
        transform: hidden ? "translateX(-255px)" : "translateX(0px)",
      }}
    >
      <a
        href="index.html"
        className="brand-link"
        style={{ paddingBottom: "0px" }}
      >
        <img
          src="img/logo.png"
          alt="Logo"
          className="img-fluid"
          width="180px"
        />
      </a>

      <div className="sidebar" style={{ paddingTop: "20px" }}>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            style={{ gap: "6px" }}
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a
                href="/dashboard"
                className={`nav-link ${url == "dashboard" ? "active" : ""}`}
                style={{ height: "41px", padding: "8px" }}
              >
                <img src="img/home.png" className="img-responsive" />
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/messages"
                className={`nav-link ${url == "messages" ? "active" : ""}`}
                style={{ height: "41px", padding: "10px" }}
              >
                <img src="img/msg.png" className="img-responsive" />
                <p>Messages</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/users"
                className={`nav-link ${url == "users" ? "active" : ""}`}
                style={{ height: "41px", padding: "8px" }}
              >
                <img src="img/manage.png" className="img-responsive" />
                <p>Users</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
