import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "./store/HiddenSlice";

const Sidebar = () => {
 

  const [url, setUrl] = useState("");

  useEffect(() => {
    const pageURLArray = window.location.href.split("/");
    setUrl(pageURLArray[pageURLArray.length - 1]);
  });

  
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const dispatch = useDispatch();


  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        window.innerWidth < 1200 &&
        !sidebarRef.current.contains(event.target)
      ) {
        dispatch(setHidden(true));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  


  useEffect(() => {
    const handleInitialVisibility = () => {
      if (window.innerWidth < 768) {
        dispatch(setHidden(true));
      } else {
        dispatch(setHidden(false));
      }
    };

    handleInitialVisibility();

    return () => {
      window.removeEventListener("resize", handleInitialVisibility);
    };
  }, [dispatch]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setHidden(true));
      } else if (!hidden) {
        dispatch(setHidden(false)); 
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, hidden]);


  const calculateTransformValue = () => {
    if (window.innerWidth < 768) {
      return hidden ? "translateX(0px)" : "translateX(240px)";
    } else {
      return hidden ?"translateX(-255px)" : "translateX(0)";
    }
  };



  


  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
        ref={sidebarRef}
      style={{
        background: "white",
        overflow: "hidden",
        transform: calculateTransformValue(),
      }}
    >
      <a
        href="/dashboard"
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
                <img src="img/home.png" className="img-responsive sidebar-img" />
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/messages"
                className={`nav-link ${url == "messages" ? "active" : ""}`}
                style={{ height: "41px", padding: "8px" }}
              >
                <img src="img/msg.png" className="img-responsive sidebar-img" />
                <p>Messages</p>
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                href="/users"
                className={`nav-link ${url == "users" ? "active" : ""}`}
                style={{ height: "41px", padding: "8px" }}
              >
                <img src="img/manage.png" className="img-responsive sidebar-img" />
                <p>Users</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/help"
                className={`nav-link ${url == "users" ? "active" : ""}`}
                style={{ height: "41px", padding: "8px" }}
              >
                <img src="img/manage.png" className="img-responsive sidebar-img" />
                <p>Help Section</p>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
