import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserUpdate.css";
import AppBar from "../Helpers/Appbar";
import Footer from "../Helpers/Footer";

const UserInfoUpdate = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    location: {
      city: "",
      country: "",
    },
    imageHash: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false); // State for tracking upload status

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/profile", {
          withCredentials: true,
        });
        setUserInfo(response.data.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      setUserInfo((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name.startsWith("location.")) {
      setUserInfo((prev) => ({
        ...prev,
        location: { ...prev.location, [name.split(".")[1]]: value },
      }));
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true); // Set uploading state to true

    try {
      const response = await axios.post("http://localhost:8000/upload-image", formData, {
        withCredentials: true,
      });
      setUserInfo((prev) => ({ ...prev, imageHash: response.data.hash }));
      alert("Image uploaded successfully!"); // Notify user on successful upload
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image.");
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file); // Automatically upload image after selection
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8000/user/update", userInfo, {
        withCredentials: true,
      });
      alert("User information updated successfully!");
    } catch (err) {
      console.error("Error updating user info:", err);
      setError("Failed to update user information.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
        <AppBar/>
        <div className="user-info-update">
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-container">
          <div className="image-column">
            <label>
              <img
                src={userInfo.imageHash ? `http://localhost:8000/image/${userInfo.imageHash}` : ""}
                alt="user profile"
                className="user-image"
              />
            </label>
            <label>
              Upload Image:
              <input
                type="file"
                onChange={handleImageChange} // Change handler for image selection
              />
              {uploading && <span>Uploading...</span>} {/* Show uploading status */}
            </label>
          </div>
          <div className="input-column">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={userInfo.age}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Location:
              <div>
                <label>
                  City:
                  <input
                    type="text"
                    name="location.city"
                    value={userInfo.location.city}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Country:
                  <input
                    type="text"
                    name="location.country"
                    value={userInfo.location.country}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </label>
            <button type="submit">Update</button>
          </div>
        </div>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default UserInfoUpdate;
