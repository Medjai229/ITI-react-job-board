import React, { use } from "react";
import { Formik, useFormik } from "formik";
import useCompanyStore from "../../store/UseCompanyStore";
import * as Yup from "yup";

export default function CreateCompany() {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "too short ")
      .max(30, "too long")
      .required("required"),
    industry: Yup.string()
      .min(5, "too short ")
      .max(300, "too long")
      .required("required"),
    website: Yup.string().email("invald email").required("required"),
  });

  const { CreateCompanies } = useCompanyStore();
  let formik = useFormik({
    initialValues: {
      name: "",
      industry: "",
      website: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      CreateCompanies(values);
      console.log(formik);
    },
  });

  return (
    <>
      <div className="container d-flex  flex-column align-items-center ">
        <h1 style={{ fontSize: "50px" }} className="my-5 text-center ">
          Create a <span style={{ color: "#26A4FF" }}>Company </span>{" "}
        </h1>

        <div className="form  bg-light shadow-sm w-75 p-5">
          <h5>To submit Compay you should enter alll fields</h5>
          <hr />

          <div className="formcard">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter company name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.name && formik.touched.name ? (
                  <span className=" text-danger p-2">{formik.errors.name}</span>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="industry" className="form-label">
                  Industry
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="industry"
                  placeholder="Enter industry"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.industry && formik.touched.industry ? (
                  <span className=" text-danger p-2">{formik.errors.industry}</span>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  website
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  placeholder="Enter location"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.website && formik.touched.website ? (
                  <span className=" text-danger p-2">{formik.errors.website}</span>
                ) : (
                  ""
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Create Company
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
