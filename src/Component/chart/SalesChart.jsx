import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Paper } from "@mui/material";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);
const SalesChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "july",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales of the Year",
        data: [
          655, 888, 978, 1245, 1367, 2678, 1108, 2265, 1532, 2090, 1545, 3078,
        ],
        backgroundColor: "aqua",
        // borderColor: "black",
        pointBorderColor: "aqua",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {},
    },
    maintainAspectRatio: false, // Disable the aspect ratio
    responsive: true,
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* <h2 style={{margin:'30px 0'}}>Total sales:</h2> */}
      <Box
        style={{
          // position: 'relative',
          width: "100%",

          height: "430px",
          marginTop: "60px",
        }}
      >
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default SalesChart;
