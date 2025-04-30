import React from "react";
import banner from "./../../assets/Desktop.jpg";
import SearchIcon from '@mui/icons-material/Search';

export default function HeroSection() {


  return (
    <>
      <div className="hero-section my-1">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "87vh",
            width: "100%",
          }}
          className="banner mx-auto container"
        >
          <div
            className="search-bar mx-2 py-3 d-flex"
            style={{ position: "absolute", top: 628, background: "white", left:"352px" }}
          >

            <SearchIcon 
              style={{
                fontSize: 40,
                color: "#4640DE",
                marginLeft: 40,
                marginTop: 10,
                // position: "absolute",
                // left: 20,
                // top: 10,
              }}
            
            />

            <input
              type="text"
              placeholder="Search for job details..."
              style={{
                width: "480px",
                height: "55px",
                paddingLeft: "20px",
                fontSize: "17px",
                border: "none",
                borderRadius: "none",
              }}
              className=" mx-3 bg-body rounded"
            ></input>

            <button
              type="button"
              className=" mx-4"
              style={{
                width: 225,
                height: 60,
                fontSize: 24,
                backgroundColor: "#4640DE",
                color: "white",
                fontWeight: 600,
                border: "none",
              }}
            >
              search my job
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
