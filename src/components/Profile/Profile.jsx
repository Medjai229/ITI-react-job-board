import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Avatar, TextField } from "@mui/material";
import { Edit, UploadFile, Delete } from "@mui/icons-material";
import axios from "axios";
import useUserStore from "../../store/User.store";

const ProfilePage = () => {
  const { user, getUser, updateUser, deleteUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) updateUser(updatedUser);
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleCVUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setUpdatedUser({ ...updatedUser, cv: uploadedFile });
    }
  };

  const handleSubmit = async () => {
    if (!updatedUser.cv) return;

    const formData = new FormData();
    formData.append("cv", updatedUser.cv);

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:4200/api/resume/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      updateUser({ ...updatedUser, cv: data.url });
      setIsLoading(false);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
    }
  };

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Box sx={{ p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "white" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            src={user.image}
            alt="User Profile"
            sx={{ width: 80, height: 80 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <TextField
                fullWidth
                name="userName"
                label="Full Name"
                value={updatedUser.userName || ""}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />
            ) : (
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                Name : {user.userName || "loading"}
              </Typography>
            )}
            <Typography variant="h5" sx={{ mt: 1 }}>
              Email : {user.email}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Confirm Email:{" "}
              {user?.confirmEmail ? "✔️ Confirmed" : "❌ Not Confirmed"}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Role : {user.role}
            </Typography>
            {isEditing ? (
              <Box sx={{ mt: 3 }}>
                <input
                  type="file"
                  id="cv-upload"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={handleCVUpload}
                />
                <label htmlFor="cv-upload">
                  <Button
                    component="span"
                    variant="contained"
                    sx={{
                      backgroundColor: "#1A75E8",
                      color: "#fff",
                      mt: 3,
                      mr: 1,
                    }}
                    startIcon={<UploadFile />}
                  >
                    Choose CV
                  </Button>
                </label>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ backgroundColor: "#28A745", color: "#fff", mt: 3 }}
                >
                  Upload CV
                </Button>
                {isLoading ? "loading..." : "."}
              </Box>
            ) : user.cv ? (
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={() => window.open(user?.cv, "_blank")}
                  sx={{ backgroundColor: "#1A75E8", color: "#fff" }}
                >
                  Show My Resume
                </Button>
              </Box>
            ) : (
              <Typography sx={{ mt: 2, color: "gray" }}>
                No CV uploaded
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={handleEdit}
            sx={{ backgroundColor: "#1A75E8", color: "#fff", mt: 3 }}
            startIcon={<Edit />}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
          <Button
            variant="contained"
            onClick={deleteUser}
            sx={{ backgroundColor: "red", color: "#fff", mt: 3 }}
            startIcon={<Delete />}
          >
            Remove My account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
