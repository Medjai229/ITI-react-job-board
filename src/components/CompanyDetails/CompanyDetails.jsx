import React from "react";
import bannerImage from "../../assets/banner details.png";
import image2 from "../../assets/image-2.png";

export default function CompanyDetails() {
  const getJobTypeBackgroundColor = (jobType) => {
    switch (jobType) {
      case "Full Time":
        return "#56CDAD1A";
      case "Freelance":
        return "#F443361A";
      case "Remote":
        return "#2196F31A";
      case "Part Time":
        return "#FF98001A";
      default:
    }
  };

  const getJobTypeColor = (jobType) => {
    switch (jobType) {
      case "Full Time":
        return "#56CDAD";
      case "Freelance":
        return "#F44336";
      case "Remote":
        return "#2196F3";
      case "Part Time":
        return "#FF9800";
      default:
    }
  };
  return (
    <>
      <div className="container">
        <div className="cover"></div>

        <div className="companydetails">
          <h1 style={{ fontSize: "50px" }} className="my-5 ">
            Webflow <span style={{ color: "#26A4FF" }}>Cpmpany </span>{" "}
          </h1>

          <div className="container mx-5">
            <h3 style={{ fontSize: "25px" }} className="my-5 ">
              About The Company
            </h3>
            <h3
              style={{ fontSize: "17px", fontFamily: "ClashDisplay-Medium" }}
              className="my-5 "
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloribus unde natus qui laboriosam vero ex ad laborum et
              possimus, nemo quasi veritatis illum ipsam nostrum id est aut ea
              cum adipisci veniam deserunt eveniet dolore. Sit possimus ullam
              illo dolore, esse obcaecati ea exercitationem praesentium, Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde
              natus qui laboriosam vero ex ad laborum et possimus, nemo quasi
              veritatis illum ipsam nostrum id est aut ea cum adipisci veniam
              deserunt eveniet dolore. Sit possimus ullam illo dolore, esse
              obcaecati ea exercitationem praesentium, Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Doloribus unde natus qui
              laboriosam vero ex ad laborum et possimus, nemo quasi veritatis
              illum ipsam nostrum id est aut ea cum adipisci veniam deserunt
              eveniet dolore. Sit possimus ullam illo dolore, esse obcaecati ea
              exercitationem praesentium,
            </h3>

            <div
              className="bannertwo bg-primary rounded-5 my-5"
              style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                height: "470px",
              }}
            ></div>

            <h3
              style={{ fontSize: "25px", color: "#26A4FF" }}
              className="my-5 "
            >
              Job Opening At The Company
            </h3>
            {/* job card  */}
            <div className="col-md-6 ">
              <div className="job-card bg-white py-4 px-5 rounded-3 shadow-sm mb-3">
                <h3 className="job-title">Engineer Trch</h3>
                <div className="info d-flex gap-2">
                  <p className="comp-name"> Webflow</p>
                  <span className="">&bull;</span>
                  <p className="address">Brazil </p>
                </div>
                <div className="tags d-flex align-items-center gap-3">
                  <div
                    className="type position-relative"
                    style={
                      {
                        // backgroundColor: getJobTypeBackgroundColor(job.job_type),
                        // color: getJobTypeColor(job.job_type),
                      }
                    }
                  >
                    Design
                  </div>
                  <div className="status"> Full Time </div>
                </div>
              </div>
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
        </div>
      </div>
    </>
  );
}
