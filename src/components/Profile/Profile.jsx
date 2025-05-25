import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../store/User.store"; // Assuming this store is already set up

// Import the custom CSS file
import "./ProfilePage.css";

// Reusable Section Component (Base structure for other sections)
const EditableSection = ({
  title,
  children,
  onSave,
  onEdit,
  isEditing,
  sectionKey,
  hideMenu = false, // Option to hide the menu for sections like the main header
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, getUser, updateUser, deleteUser } = useUserStore();

  const handleToggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const handleCloseDropdown = () => setDropdownOpen(false);

  const handleEditClick = () => {
    onEdit(sectionKey, !isEditing); // Toggle edit mode for this specific section
    handleCloseDropdown();
  };

  const handleSaveClick = () => {
    onSave(sectionKey); // Trigger save for this specific section
    handleCloseDropdown();
  };

  return (
    <div className="section-card">
      <div className="section-header">
        {title && <h6 className="fw-bold mb-0 text-dark-grey">{title}</h6>}
        {!hideMenu && (
          <div className="dropdown">
            <button
              className="btn btn-sm"
              type="button"
              id={`${sectionKey}-dropdownMenuButton`}
              data-bs-toggle="dropdown"
              aria-expanded={dropdownOpen}
              onClick={handleToggleDropdown}
            >
              <i className="bi bi-three-dots-vertical"></i>{" "}
              {/* Bootstrap Icons */}
            </button>
            <ul
              className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
              aria-labelledby={`${sectionKey}-dropdownMenuButton`}
            >
              <li>
                <a className="dropdown-item" href="#" onClick={handleEditClick}>
                  {isEditing ? "Cancel Edit" : "Edit"}
                </a>
              </li>
              {isEditing && (
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleSaveClick}
                  >
                    Save
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

// Main Profile Page Component
const ProfilePage = () => {
  const { user, getUser, updateUser, deleteUser } = useUserStore();
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  // State to manage edit mode for each section
  const [sectionEditModes, setSectionEditModes] = useState({
    summary: false,
    education: false,
    workExperience: false,
    aboutMe: false,
    contacts: false,
    objective: false,
    skills: false,
    header: false, // For Name and Title
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSectionEditToggle = (sectionKey, isEditing) => {
    setSectionEditModes((prev) => ({
      ...prev,
      [sectionKey]: isEditing,
    }));
  };

  const handleSectionSave = (sectionKey) => {
    updateUser(updatedUser);
    handleSectionEditToggle(sectionKey, false); // Exit edit mode after saving
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;

    setUpdatedUser((prevUser) => {
      let newUser = { ...prevUser };

      switch (section) {
        case "summary":
          newUser.summary = value;
          break;
        case "education":
          newUser.education = { ...newUser.education, [name]: value };
          break;
        case "workExperience":
          if (newUser.workExperience && newUser.workExperience.length > 0) {
            newUser.workExperience = [...newUser.workExperience];
            newUser.workExperience[0] = {
              ...newUser.workExperience[0],
              [name]: value,
            };
          } else {
            // Initialize if empty, assuming first entry
            newUser.workExperience = [{ [name]: value }];
          }
          break;
        case "aboutMe":
          newUser.aboutMe = { ...newUser.aboutMe, [name]: value };
          break;
        case "contacts":
          newUser.contacts = { ...newUser.contacts, [name]: value };
          break;
        case "objective":
          newUser.objective = value;
          break;
        case "skills":
          newUser.skills = value.split(",").map((s) => s.trim());
          break;
        case "header":
          newUser[name] = value;
          break;
        default:
          break;
      }
      return newUser;
    });
  };

  const handleCVUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setUpdatedUser({ ...updatedUser, cv: uploadedFile });
      handleSubmitCV(uploadedFile); // Pass the file directly
    }
  };

  const handleSubmitCV = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:4200/api/resume/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      updateUser({ ...updatedUser, cv: data.url });
      setIsLoading(false);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      setIsLoading(false);
    }
  };

  // Dummy data for structure matching the image and default values if user data is missing
  const dummyUserData = {
    userName: user.userName || "Sarah Johnson",
    email: user.email || "sarah.johnson@example.com",
    confirmEmail: user.confirmEmail || true,
    role: user.role || "Software Engineer",
    image: user.image || "https://i.pravatar.cc/150?img=33", // Example avatar
    summary:
      updatedUser.summary ||
      "Sarah Johnson is a highly skilled software engineer with 5 years of experience developing web-based applications. She is an expert in Python, Java, and Ruby on Rails and has a deep understanding of cloud computing technologies. Sarah has a proven track record of delivering high-quality solutions that meet or exceed client expectations.",
    education: updatedUser.education || {
      university: "University of California, Berkeley",
      location: "California",
      major: "Computer Science",
      description:
        "This is a short bio about Sarah Johnson study in University of California, Berkeley. Talk about what Sarah Johnson did in the college and her achievements.",
    },
    workExperience: updatedUser.workExperience || [
      {
        company: "XYZ Corporation",
        title: "Software Engineer",
        years: "2018 - present",
        description:
          "This is a short bio about Sarah Johnson work experience in XYZ Corporation in San Fransisco, California. Talk about what Sarah Johnson did in the work.",
      },
      {
        company: "ABC Corporation",
        title: "Junior Software Engineer",
        years: "2016 - 2018",
        description:
          "This is a short bio about Sarah Johnson work experience in ABC Corporation in Palo Alto, California. Talk about what Sarah Johnson did in the work.",
      },
    ],
    aboutMe: updatedUser.aboutMe || {
      primaryIndustry: "Information Technology",
      expectedSalary: "80,000 - 10,000 per year",
      experience: "0-2 years",
    },
    contacts: updatedUser.contacts || {
      phone: "123 456 7890",
      email: "sarah.johnson@gmail.com",
      location: "123 Anywhere Street, California, LA, USA",
      linkedin: "linkedin.com/in/sarahjohnson",
    },
    objective:
      updatedUser.objective ||
      "To obtain a position in the field of software engineering that utilizes my skills and experience.",
    skills: updatedUser.skills || [
      "Python",
      "Java",
      "Ruby on Rails",
      "Cloud Computing",
      "React",
      "Node.js",
    ],
    cv: updatedUser.cv, // This will be the URL after upload
  };

  return (
    <div className="container py-3">
      <div className="row">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Header Section (Name and Title) */}
          <EditableSection
            title=""
            sectionKey="header"
            isEditing={sectionEditModes.header}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
            hideMenu={true}
          >
            <div className="d-flex align-items-center gap-3">
              <img
                src={dummyUserData.image}
                alt="User Profile"
                className="profile-avatar"
              />
              <div className="flex-grow-1">
                {sectionEditModes.header ? (
                  <>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      name="userName"
                      placeholder="Full Name"
                      value={updatedUser.userName || dummyUserData.userName}
                      onChange={(e) => handleInputChange(e, "header")}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="role"
                      placeholder="Role / Title"
                      value={updatedUser.role || dummyUserData.role}
                      onChange={(e) => handleInputChange(e, "header")}
                    />
                  </>
                ) : (
                  <>
                    <h4 className="fw-bold mb-0 text-dark-grey">
                      {dummyUserData.userName}
                    </h4>
                    <p className="text-medium-grey mb-1 fs-6">
                      {dummyUserData.role}
                    </p>
                  </>
                )}
                <p className="text-medium-grey small mb-0">
                  San Fransisco, California
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary-custom">
                  Contact This Candidate
                </button>
                <button className="icon-button">
                  <i className="bi bi-bookmark"></i>
                </button>
                <button className="icon-button">
                  <i className="bi bi-cloud-arrow-down"></i>
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <p className="small text-medium-grey mb-0">
                Joined March 2022 | Last activity 2 days ago
              </p>
            </div>
          </EditableSection>

          {/* Summary Section */}
          <EditableSection
            title="Summary"
            sectionKey="summary"
            isEditing={sectionEditModes.summary}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            {sectionEditModes.summary ? (
              <textarea
                className="form-control"
                rows="4"
                name="summary"
                placeholder="Summary"
                value={updatedUser.summary || dummyUserData.summary}
                onChange={(e) => handleInputChange(e, "summary")}
              ></textarea>
            ) : (
              <p className="text-dark-grey mb-0">{dummyUserData.summary}</p>
            )}
          </EditableSection>

          {/* Education Section */}
          <EditableSection
            title="Education"
            sectionKey="education"
            isEditing={sectionEditModes.education}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            <div className="d-flex align-items-start gap-3">
              <img
                src="https://via.placeholder.com/40"
                alt="University Logo"
                className="profile-avatar-small" // New class for smaller avatar
              />
              <div className="flex-grow-1">
                {sectionEditModes.education ? (
                  <>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      name="university"
                      placeholder="University"
                      value={
                        updatedUser.education?.university ||
                        dummyUserData.education.university
                      }
                      onChange={(e) => handleInputChange(e, "education")}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      name="location"
                      placeholder="Location"
                      value={
                        updatedUser.education?.location ||
                        dummyUserData.education.location
                      }
                      onChange={(e) => handleInputChange(e, "education")}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      name="major"
                      placeholder="Major"
                      value={
                        updatedUser.education?.major ||
                        dummyUserData.education.major
                      }
                      onChange={(e) => handleInputChange(e, "education")}
                    />
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      name="description"
                      placeholder="Description"
                      value={
                        updatedUser.education?.description ||
                        dummyUserData.education.description
                      }
                      onChange={(e) => handleInputChange(e, "education")}
                    ></textarea>
                  </>
                ) : (
                  <>
                    <h6 className="fw-bold mb-0 text-dark-grey">
                      {dummyUserData.education.university}
                    </h6>
                    <p className="text-medium-grey small mb-1">
                      {dummyUserData.education.location} &bull;{" "}
                      {dummyUserData.education.major}
                    </p>
                    <p className="text-dark-grey small mb-0">
                      {dummyUserData.education.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </EditableSection>

          {/* Work Experience Section */}
          <EditableSection
            title="Work Experience"
            sectionKey="workExperience"
            isEditing={sectionEditModes.workExperience}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            {dummyUserData.workExperience.map((job, index) => (
              <div key={index} className="d-flex align-items-start gap-3 mb-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Company Logo"
                  className="profile-avatar-small" // New class for smaller avatar
                />
                <div className="flex-grow-1">
                  {sectionEditModes.workExperience ? (
                    <>
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        name="company"
                        placeholder="Company"
                        value={
                          updatedUser.workExperience[index]?.company ||
                          job.company
                        }
                        onChange={(e) => handleInputChange(e, "workExperience")}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        name="title"
                        placeholder="Title"
                        value={
                          updatedUser.workExperience[index]?.title || job.title
                        }
                        onChange={(e) => handleInputChange(e, "workExperience")}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        name="years"
                        placeholder="Years"
                        value={
                          updatedUser.workExperience[index]?.years || job.years
                        }
                        onChange={(e) => handleInputChange(e, "workExperience")}
                      />
                      <textarea
                        className="form-control form-control-sm"
                        rows="2"
                        name="description"
                        placeholder="Description"
                        value={
                          updatedUser.workExperience[index]?.description ||
                          job.description
                        }
                        onChange={(e) => handleInputChange(e, "workExperience")}
                      ></textarea>
                    </>
                  ) : (
                    <>
                      <h6 className="fw-bold mb-0 text-dark-grey">
                        {job.title}
                      </h6>
                      <p className="text-medium-grey small mb-1">
                        {job.company} &bull; {job.years}
                      </p>
                      <p className="text-dark-grey small mb-0">
                        {job.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </EditableSection>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* About Me Section */}
          <EditableSection
            title="About Me"
            sectionKey="aboutMe"
            isEditing={sectionEditModes.aboutMe}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            <div className="mb-2">
              {sectionEditModes.aboutMe ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="primaryIndustry"
                  placeholder="Primary Industry"
                  value={
                    updatedUser.aboutMe?.primaryIndustry ||
                    dummyUserData.aboutMe.primaryIndustry
                  }
                  onChange={(e) => handleInputChange(e, "aboutMe")}
                />
              ) : (
                <p className="mb-0 text-dark-grey">
                  <span className="fw-bold">Primary Industry:</span>{" "}
                  {dummyUserData.aboutMe.primaryIndustry}
                </p>
              )}
            </div>
            <div className="mb-2">
              {sectionEditModes.aboutMe ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="expectedSalary"
                  placeholder="Expected Salary"
                  value={
                    updatedUser.aboutMe?.expectedSalary ||
                    dummyUserData.aboutMe.expectedSalary
                  }
                  onChange={(e) => handleInputChange(e, "aboutMe")}
                />
              ) : (
                <p className="mb-0 text-dark-grey">
                  <span className="fw-bold">Expected Salary:</span>{" "}
                  {dummyUserData.aboutMe.expectedSalary}
                </p>
              )}
            </div>
            <div>
              {sectionEditModes.aboutMe ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="experience"
                  placeholder="Experience"
                  value={
                    updatedUser.aboutMe?.experience ||
                    dummyUserData.aboutMe.experience
                  }
                  onChange={(e) => handleInputChange(e, "aboutMe")}
                />
              ) : (
                <p className="mb-0 text-dark-grey">
                  <span className="fw-bold">Experience:</span>{" "}
                  {dummyUserData.aboutMe.experience}
                </p>
              )}
            </div>
          </EditableSection>

          {/* Contacts Section */}
          <EditableSection
            title="Contacts"
            sectionKey="contacts"
            isEditing={sectionEditModes.contacts}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            <div className="mb-2">
              {sectionEditModes.contacts ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="phone"
                  placeholder="Phone"
                  value={
                    updatedUser.contacts?.phone || dummyUserData.contacts.phone
                  }
                  onChange={(e) => handleInputChange(e, "contacts")}
                />
              ) : (
                <p className="mb-0 text-dark-grey">
                  <span className="fw-bold">Phone:</span>{" "}
                  {dummyUserData.contacts.phone}
                </p>
              )}
            </div>
            <div className="mb-2">
              {sectionEditModes.contacts ? (
                <input
                  type="email"
                  className="form-control form-control-sm"
                  name="email"
                  placeholder="Email"
                  value={
                    updatedUser.contacts?.email || dummyUserData.contacts.email
                  }
                  onChange={(e) => handleInputChange(e, "contacts")}
                />
              ) : (
                <p className="mb-0 text-dark-grey">
                  <span className="fw-bold">Email:</span>{" "}
                  {dummyUserData.contacts.email}
                </p>
              )}
            </div>
            <div className="mb-2">
              {sectionEditModes.contacts ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="location"
                  placeholder="Location"
                  value={
                    updatedUser.contacts?.location ||
                    dummyUserData.contacts.location
                  }
                  onChange={(e) => handleInputChange(e, "contacts")}
                />
              ) : (
                <p className="mb-0 text-dark-grey">
                  <span className="fw-bold">Location:</span>{" "}
                  {dummyUserData.contacts.location}
                </p>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-linkedin fs-5 text-blue"></i>
              {sectionEditModes.contacts ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="linkedin"
                  placeholder="LinkedIn Profile"
                  value={
                    updatedUser.contacts?.linkedin ||
                    dummyUserData.contacts.linkedin
                  }
                  onChange={(e) => handleInputChange(e, "contacts")}
                />
              ) : (
                <a
                  href={`https://${dummyUserData.contacts.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-blue small"
                >
                  {dummyUserData.contacts.linkedin}
                </a>
              )}
            </div>
          </EditableSection>

          {/* Objective Section */}
          <EditableSection
            title="Objective"
            sectionKey="objective"
            isEditing={sectionEditModes.objective}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            {sectionEditModes.objective ? (
              <textarea
                className="form-control"
                rows="3"
                name="objective"
                placeholder="Objective"
                value={updatedUser.objective || dummyUserData.objective}
                onChange={(e) => handleInputChange(e, "objective")}
              ></textarea>
            ) : (
              <p className="text-dark-grey mb-0">{dummyUserData.objective}</p>
            )}
          </EditableSection>

          {/* Skills Section */}
          <EditableSection
            title="Skills"
            sectionKey="skills"
            isEditing={sectionEditModes.skills}
            onEdit={handleSectionEditToggle}
            onSave={handleSectionSave}
          >
            {sectionEditModes.skills ? (
              <textarea
                className="form-control"
                rows="3"
                name="skills"
                placeholder="Skills (comma-separated)"
                value={
                  updatedUser.skills?.join(", ") ||
                  dummyUserData.skills.join(", ")
                }
                onChange={(e) => handleInputChange(e, "skills")}
              ></textarea>
            ) : (
              <div className="d-flex flex-wrap gap-2">
                {dummyUserData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </EditableSection>

          {/* CV Upload and Delete Account */}
          <div className="section-card">
            <h6 className="fw-bold mb-3 text-dark-grey">Manage CV</h6>
            <div className="mb-3">
              <input
                type="file"
                id="cv-upload"
                accept="application/pdf"
                className="d-none"
                onChange={handleCVUpload}
              />
              <label
                htmlFor="cv-upload"
                className="btn btn-primary-custom d-flex align-items-center gap-2"
              >
                <i className="bi bi-cloud-arrow-up"></i>
                Upload / Update CV
              </label>
              {isLoading && (
                <p className="text-medium-grey mt-2 mb-0">Uploading...</p>
              )}
            </div>
            {dummyUserData.cv ? (
              <div className="mb-3">
                <button
                  onClick={() => window.open(dummyUserData?.cv, "_blank")}
                  className="btn btn-primary-custom"
                >
                  Show My Resume
                </button>
              </div>
            ) : (
              <p className="text-medium-grey mb-3">No CV uploaded</p>
            )}
            <button
              className="btn btn-red-custom d-flex align-items-center gap-2"
              onClick={deleteUser}
            >
              <i className="bi bi-trash"></i>
              Remove My account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
