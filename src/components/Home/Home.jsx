import React, { useEffect } from "react";
import HeroSection from "../HeroSection/HeroSection";
import JobCard from "../JobCard/JobCard";
import useJobStore from "../../store/useJobsStore";
import JobsHero from "../JobsHero/JobsHero";

export default function Home() {
  const { jobs, loading, error, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      {/* <HeroSection /> */}
      {}
      <JobsHero />

      <div className="container">
        <h1 style={{ fontSize: "50px" }} className="mx-5">
          Explore by <span style={{ color: "#26A4FF" }}>category </span>{" "}
        </h1>

        <div className="row mx-5 my-4">
          <div className="col-md-3">
            <div className="category-card">Category 1</div>
          </div>
          <div className="col-md-3">
            <div className="category-card">Category 2</div>
          </div>
          <div className="col-md-3">
            <div className="category-card">Category 3</div>
          </div>
          <div className="col-md-3">
            <div className="category-card">Category 4</div>
          </div>
        </div>
      </div>

      <JobCard job={jobs} />
    </>
  );
}
