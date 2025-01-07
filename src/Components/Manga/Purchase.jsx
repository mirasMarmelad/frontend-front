import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed
import "./Purchase.css"; // Ass
import AppBar from "../Helpers/Appbar.jsx"; // Ensure the path is correct
import Footer from "../Helpers/Footer";

const PurchasePage = () => {
  const [mangaData, setMangaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/purchase/get", {
          withCredentials: true // Include credentials in the request
        });
        setMangaData(response.data.data);
      } catch (error) {
        console.error("Error fetching manga data:", error);
        setError("Failed to fetch manga data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, []);

  const handleRemove = async (mangaID) => {
    try {
      await axios.post("http://localhost:8000/purchase/remove", {
        mangaID,
      }, {
        withCredentials: true
      });
      // Optionally, update the state to reflect the removal
      setMangaData(mangaData.filter(manga => manga.id !== mangaID));
    } catch (error) {
      console.error("Error removing manga:", error);
    }
  };

  const handleBuy = async (mangaID) => {
    try {
      await axios.post("http://localhost:8000/purchase/buy", {
        mangaID,
      }, {
        withCredentials: true
      });
      // Optionally, handle post-purchase actions
      alert("Purchase successful!");
    } catch (error) {
      console.error("Error buying manga:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="purchase-container">
      <AppBar />
        {mangaData ? (
             <div className="purchase-content">
             <h2 style={{ textAlign: "center" }}>Available Mangas for Purchase</h2>
             <div className="purchase-manga-list">
               {mangaData.map((manga) => (
                 <div className="purchase-manga-item" key={manga.id}>
                   {manga.imageHash ? (
                     <img src={`http://localhost:8000/image/${manga.imageHash}`} alt={manga.name} />
                   ) : (
                     <div>No Image Available</div>
                   )}
                   <h3 style={{textAlign: "center"}}>{manga.name}</h3>
                   <p><strong>Price:</strong> ${manga.price}</p>
                   <p><strong>Rating:</strong> {manga.rating}</p>
                   <p><strong>Views:</strong> {manga.views}</p>
                   <div className="purchase-button-group">
                     <button className="purchase-remove-button" onClick={() => handleRemove(manga.id)}>Remove</button>
                     <button className="purchase-buy-button" onClick={() => handleBuy(manga.id)}>Buy</button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        ) : ( <div className="error-message">No data</div>)}
      <Footer />
    </div>
  );
};

export default PurchasePage;
