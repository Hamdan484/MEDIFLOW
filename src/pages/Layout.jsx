// src/Components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BuyerDashboard from "./Buyer_Dashboard";

const Layout = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={styles.main}>
        <Header />
        <div style={styles.content}>
          <Outlet /> <BuyerDashboard />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7fb",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default Layout;