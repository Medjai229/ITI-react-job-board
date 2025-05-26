import React, { useEffect } from "react";
import CardCompanies from "../CardCompanies/CardCompanies";
import "./CompanyHome.css";
import image from "../../assets/company-23.svg";
import useCompanyStore from "../../store/UseCompanyStore";
import image2 from "../../assets/image-2.png";
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
              <div className="card p-3 border-0 rounded-4 shadow-sm w-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <div
                    className="shadow-sm p-2 bg-primary"
                    style={{ width: "70px", borderRadius: "25%" }}
                  >
                    <img className="" src={image} alt="" />
                  </div>

                  <h2 className="card-title my-3">{company.name}</h2>
                  <h5 className="card-title my-2 text-secondary">
                    Company industry
                  </h5>
                  <p className="card-text my-3">Company website </p>

                  <div className="mt-auto">
                    <button href="#" className="btn btn-primary my-2 w-100">
                      View Company
                    </button>
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
