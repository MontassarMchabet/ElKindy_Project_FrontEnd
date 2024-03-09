import React from "react";
import { Link } from "react-router-dom";
const DashboardSidebar = () => {
    return (
      <div className="dashboard-sidebar">
        <div className="sidebar">
          <div className="sidebar-item">
            <h3 className="sidebar-title">Dashboard</h3>
          </div>
          <div className="sidebar-item">
            <h3 className="sidebar-title">Exams</h3>
            <ul className="sidebar-list">
              <li>
                <Link to="/exams">Upcoming Exams</Link>
              </li>
              <li>
                <Link to="/completed-exams">Completed Exams</Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-item">
            <h3 className="sidebar-title">Calendar</h3>
            <ul className="sidebar-list">
              <li>
                <Link to="/calendar">View Calendar</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-item">
            <h3 className="sidebar-title">Notes</h3>
            <ul className="sidebar-list">
              <li>
                <Link to="/notes">View Notes</Link>
              </li>
              <li>
                <Link to="/create-note">Create Note</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardSidebar;
