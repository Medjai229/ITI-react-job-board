import React from "react";
import NavBar from "../AppBar/AppBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
