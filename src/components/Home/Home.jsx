import React, { useEffect } from "react";
import HeroSection from "../HeroSection/HeroSection";
import JobCard from "../JobCard/JobCard";
import useJobStore from "../../store/useJobsStore";

export default function Home() {
  const { jobs, loading, error, fetchJobs } = useJobStore();

    useEffect(() => {
      fetchJobs();
    }, [fetchJobs]);
  
  return (
    <>
      <HeroSection />

      <div className="container">
        <h1 style={{ fontSize: "50px" }} className="mx-5">
          Explore by <span style={{color:"#26A4FF"}}>category </span>{" "}
        </h1>
      </div>

      <JobCard job={jobs}/>
    </>
  );
}
