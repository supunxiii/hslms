import React from "react";

const Dashboard = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <iframe
        style={{
          background: "#F1F5F4",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100vw",
          height: "100vh",
        }}
        src="https://charts.mongodb.com/charts-hslms-znydqqe/embed/dashboards?id=66fe559d-d09f-4bb0-8735-efa4e2f2cf11&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
        title="MongoDB Dashboard"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default Dashboard;
