import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Appbar.css"; // Assuming you have an external CSS file for styles


const AppBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/user/logout", {
        withCredentials: true,
      });
      setUser(null); // Clear the user state after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out.");
    }
    navigate("/");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/profile", {
          withCredentials: true, // Include credentials for the request
        });
        setUser(response.data.data); // Adjust to the correct path in the response
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="app-bar">
      <div className="logo-container">
        <img src="./unnamed.png" alt="Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/manga" className="nav-link">Cataloge</Link>
        <Link to="https://t.me/mirasKabykenov" className="nav-link">Contact</Link>
      </nav>
      <Link to="/purchase">
        {user ? (  <i className={`fa fa-shopping-basket`} style={{ fontSize: '30px', color:'white'}}></i>) : (<p></p>)}
      </Link>
  
      <Link to="/profile" className="nav-link">
        <div className="user-profile">
          {loading ? (
            <div>Loading...</div> // Optional loading state
          ) : error ? (
            <div style={{textDecoration:"none"}}>
                <Link to="/login" className="nav-link" style={{textDecoration:"none"}}>Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
            </div>
          ) : user ? (
            <>
              {user.imageHash ? (
                <img src={`http://localhost:8000/image/${user.imageHash}`} alt="Profile" className="profile-icon" />
              ) : (
                <img src="path/to/default-profile-icon.png" alt="Profile" className="profile-icon" />
              )}
              <span className="username">{user.username}</span>
            </>
          ) : (
            <span className="username">Guest</span>
          )}
        </div>
      </Link>
      {user ? (
          <i
            className="fa fa-sign-out-alt"
            style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
            onClick={handleLogout}
          ></i>
        ) : (
          <p></p>
        )}

    </header>
  );
};

export default AppBar;
