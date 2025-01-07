import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed
import "./Profile.css"; // Assuming you have a CSS file for styles
import AppBar from "../Helpers/Appbar.jsx"; // Ensure the path is correct
import Footer from "../Helpers/Footer";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [likedMangas, setLikedMangas] = useState([]); // State for liked mangas
  const [recentViews, setRecentViews] = useState([]); // State for liked mangas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/profile", {
          withCredentials: true // Include credentials in the request
        });
        setUser(response.data.data); // Adjust to the correct path in the response
      } catch (error) {
        console.error("Error fetching profile data:", error);
        if (error.response && error.response.status === 401) {
          navigate("/"); // Redirect if unauthorized
        }
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchLikedMangas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/liked-mangas", {
          withCredentials: true // Include credentials in the request
        });
        setLikedMangas(response.data.data); // Store the liked mangas in state
      } catch (error) {
        console.error("Error fetching liked mangas:", error);
      }
    };
    const fetchRecentViews = async () => {
        try {
          const response = await axios.get("http://localhost:8000/user/recent-views", {
            withCredentials: true // Include credentials in the request
          });
          setRecentViews(response.data.data); // Store the liked mangas in state
        } catch (error) {
          console.error("Error fetching liked mangas:", error);
        }
      };

    fetchProfileData();
    fetchLikedMangas();
    fetchRecentViews();
  }, [navigate]);

  const handleUpdateProfile = () => {
    navigate("/update-profile"); // Navigate to the update profile page
  };

  const handleMangaClick = (id) => {
    navigate(`/manga/${id}`); // Navigate to the manga page by ID
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-container">
      <AppBar />
      <div className="profile-content">
      <h2 style={{textAlign:"center"}}>Profile info</h2>
        <div className="profile-details">

          <div className="profile-image">
            {user.imageHash ? (
              <img src={`http://localhost:8000/image/${user.imageHash}`} alt="Profile" />
            ) : (
              <div>No Image Available</div>
            )}
            <button className="update-profile-button" onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
            <p><strong>Registration Date:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
            <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString()}</p>
          </div>
        </div>
        
        <h2 style={{textAlign:"center"}}>Liked mangas</h2>
        <div className="liked-mangas">
        
        {(likedMangas && likedMangas.length > 0) ? (
            <div className="manga-row">
              {likedMangas.map((manga) => (
                <div className="manga-item" key={manga.id} onClick={() => handleMangaClick(manga.id)}>
                  <img src={`http://localhost:8000/image/${manga.imageHash}`} alt={manga.name} />
                  <p>{manga.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No liked mangas available</p>
          )}
        </div>

        <h2 style={{textAlign:"center"}}>Recent viewed mangas</h2>
        <div className="liked-mangas">
        
        {(recentViews && recentViews.length > 0) ? (
            <div className="manga-row">
              {recentViews.map((manga) => (
                <div className="manga-item" key={manga.id} onClick={() => handleMangaClick(manga.id)}>
                  <img src={`http://localhost:8000/image/${manga.imageHash}`} alt={manga.name} />
                  <p>{manga.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No liked mangas available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
