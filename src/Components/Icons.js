import React from "react";

import '../css/StaticBar.css'

export const GrAdd = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "30px" }
      width={ size ? size : "30px" }
      style={{ color }}
      className={ className ? className : 'ListIcon' }
    >
      { title ? <title>{title}</title> : null }
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M12,22 L12,2 M2,12 L22,12"
      ></path>
    </svg>
  );
};

export const BsCollection = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="-3.5 -5 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "30px" }
      width={ size ? size : "30px" }
      style={{ color }}
      className={ className ? className : 'ListIcon' }
    >
      { title ? <title>{title}</title> : null }
      <path
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth="0.5"
        clipRule="evenodd"
        d="M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z"
      ></path>
    </svg>
  );
};

export const IoSettingsOutline = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "30px" }
      width={ size ? size : "30px" }
      style={{ color }}
      className={ className ? className : 'ListIcon' }
    >
      { title ? <title>{title}</title> : null }
      <path
        stroke="currentColor"
        strokeWidth="0"
        d="M2 12c0-.865.11-1.703.316-2.504A3 3 0 0 0 4.99 4.867a9.99 9.99 0 0 1 4.335-2.505 3 3 0 0 0 5.348 0 9.99 9.99 0 0 1 4.335 2.505 3 3 0 0 0 2.675 4.63c.206.8.316 1.638.316 2.503 0 .865-.11 1.703-.316 2.504a3 3 0 0 0-2.675 4.629 9.99 9.99 0 0 1-4.335 2.505 3 3 0 0 0-5.348 0 9.99 9.99 0 0 1-4.335-2.505 3 3 0 0 0-2.675-4.63C2.11 13.704 2 12.866 2 12zm4.804 3c.63 1.091.81 2.346.564 3.524.408.29.842.541 1.297.75A4.993 4.993 0 0 1 12 18c1.26 0 2.438.471 3.335 1.274.455-.209.889-.46 1.297-.75A4.993 4.993 0 0 1 17.196 15a4.993 4.993 0 0 1 2.77-2.25 8.126 8.126 0 0 0 0-1.5A4.993 4.993 0 0 1 17.195 9a4.993 4.993 0 0 1-.564-3.524 7.989 7.989 0 0 0-1.297-.75A4.993 4.993 0 0 1 12 6a4.993 4.993 0 0 1-3.335-1.274 7.99 7.99 0 0 0-1.297.75A4.993 4.993 0 0 1 6.804 9a4.993 4.993 0 0 1-2.77 2.25 8.126 8.126 0 0 0 0 1.5A4.993 4.993 0 0 1 6.805 15zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      ></path>
    </svg>
  );
};

export const MailOutline = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "30px" }
      width={ size ? size : "30px" }
      style={{ color }}
      className={ className ? className : 'ListIcon' }
    >
      { title ? <title>{title}</title> : null }
      <path
        stroke="currentColor"
        strokeWidth="0"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
      ></path>
    </svg>
  );
};

export const SaveOutline = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "30px" }
      width={ size ? size : "30px" }
      style={{ color }}
      className={ className ? className : 'ListIcon' }
    >
      { title ? <title>{title}</title> : null }
      <path
        stroke="currentColor"
        strokeWidth="0"
        d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
      ></path>
    </svg>
  );
};

export const PeopleAlt = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "30px" }
      width={ size ? size : "30px" }
      style={{ color }}
      className={ className ? className : 'ListIcon' }
    >
      { title ? <title>{title}</title> : null }
      <path
        stroke="currentColor"
        strokeWidth="0"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
      ></path>
    </svg>
  );
};
