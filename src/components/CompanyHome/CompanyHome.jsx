import React, { useEffect } from "react";
import CardCompanies from "../CardCompanies/CardCompanies";
import "./CompanyHome.css";
import image from "../../assets/Artboard 1.svg";
import useCompanyStore from "../../store/UseCompanyStore";
import image2 from "../../assets/image-2.png";
import { Link } from "react-router-dom";
export default function CompanyHome() {
  const { getAllCompanies, companies, isLoading, error } = useCompanyStore();

  useEffect(() => {
    getAllCompanies();
    console.log("companies", companies);
  }, []);
  return (
    <>
      <div className="container my-5">
        <h1 style={{ fontSize: "50px" }} className="mb-4 ">
          Explore All <span style={{ color: "#26A4FF" }}>Companies </span>{" "}
        </h1>

        <div className="row">
          {companies.foundedCompany?.map((company) => (
            <div className="col-md-3 d-flex">
              <div className="card company-card p-3 border-0 rounded-4 shadow-sm w-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <div
                    className="shadow-sm p-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "25%",
                      backgroundColor: "#4640DE",
                    }}
                  >
                    <img
                      src={image}
                      alt="Company Logo"
                      style={{ maxWidth: "120%" }}
                    />
                  </div>

                  <h2
                    className="card-title my-3 fw-bold text-dark"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {company.name}
                  </h2>

                  <h5
                    className="card-subtitle my-2 text-muted"
                    style={{ fontSize: "1.3rem" }}
                  >
                    {company.industry}
                  </h5>

                  <p
                    className="card-text my-3 text-secondary"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {company.website}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/CompanyDetails/${company._id}`}
                      className="btn btn-primary my-2 w-100 fw-semibold"
                    >
                      View Company
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="banner my-5"
          style={{
            backgroundImage: `url(${image2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        ></div>
      </div>

      {/* <CardCompanies /> */}
    </>
  );
}
