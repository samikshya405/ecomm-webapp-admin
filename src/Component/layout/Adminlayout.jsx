import React from "react";

import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import "./adminlayout.css";

const Adminlayout = ({ title, children }) => {
  return (
    <div className="App">
      <div className="AppGlass">
        
        <Sidebar />

        <main>
          <Box height={'5vh'} width={'100%'} sx={{background:'var(--glass)'}}></Box>
          <Box padding={2}>
            <h2 style={{ textTransform: "capitalize" }}>{title}</h2>
          </Box>
          <Box padding={2}>{children}</Box>
        </main>
      </div>
    </div>
  );
};

export default Adminlayout;
