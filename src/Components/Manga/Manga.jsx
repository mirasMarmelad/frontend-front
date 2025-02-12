import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Manga.css';
import AppBar from '../Helpers/Appbar';
import Footer from '../Helpers/Footer';

const MangaPage = () => {
    const { id } = useParams(); // Get the manga ID from the URL
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchManga = async () => {
            const cachedData = localStorage.getItem(`manga-${id}`);
            const cachedTime = localStorage.getItem(`manga-${id}-timestamp`);
            if (cachedTime && Date.now() - cachedTime > 3600000) { 
                localStorage.removeItem(`manga-${id}`);
                localStorage.removeItem(`manga-${id}-timestamp`);
            }
            if (cachedData) {
                console.log("📌 Loaded from cache:", JSON.parse(cachedData)); 
                setManga(JSON.parse(cachedData));
                setLoading(false);
                return
            }
    
            try {
                const response = await axios.get(`http://localhost:8000/manga/${id}`, { withCredentials: true });
                console.log("🌍 Loaded from API:", response.data.manga); // Log API load
                setManga(response.data.manga);
                localStorage.setItem(`manga-${id}`, JSON.stringify(response.data.manga));
                localStorage.setItem(`manga-${id}-timestamp`, Date.now()); 

            } catch (err) {
                setError("Error fetching manga data.");
                console.error("❌ API Error:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchManga();
    }, [id]);
    
    const handleToggleLike = async () => {
        if (!manga) return; // Ensure manga data is available
        const url = manga.isLiked 
            ? 'http://localhost:8000/manga/dislike' 
            : 'http://localhost:8000/manga/like'; // Select the correct endpoint

        try {
            const response = await axios.post(url, { mangaID: manga.id }, { withCredentials: true });
            // Update the `isLiked` and `likes` count
            setManga((prevManga) => ({
                ...prevManga,
                isLiked: !prevManga.isLiked,
                likes: prevManga.isLiked ? prevManga.likes - 1 : prevManga.likes + 1,
            }));
        } catch (err) {
            console.error('Error updating like/dislike status:', err);
            alert('Failed to update like/dislike.');
        }
    };

    const handleTogglePurchase = async () => {
        if (!manga) return; // Ensure manga data is available
        const url = manga.isInPurchase 
            ? 'http://localhost:8000/purchase/remove' 
            : 'http://localhost:8000/purchase/add'; // Select the correct endpoint

        try {
            const response = await axios.post(url, { mangaID: manga.id }, { withCredentials: true });
            // Update the `isInPurchase` state
            setManga((prevManga) => ({
                ...prevManga,
                isInPurchase: !prevManga.isInPurchase, // Toggle the purchase state
            }));
        } catch (err) {
            console.error('Error updating purchase status:', err);
            alert('Failed to update purchase status.');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    if (!manga) {
        return <div>No manga found.</div>; // Handle case with no manga data
    }

    return (
        <div className="manga-page">
            <div className="background-image" style={{ backgroundImage: `url(http://localhost:8000/image/${manga.coverHash})` }}></div>
            <AppBar />
            <div className="manga-container">
                <div className="manga-image">
                    <img src={`http://localhost:8000/image/${manga.imageHash}`} alt={manga.name} />
                    
                    <button 
                        className="add-to-purchase" 
                        style={{ backgroundColor3: manga.isInPurchase ? 'red' : 'green' }} 
                        onClick={handleTogglePurchase} // Add the onClick event handler
                    >
                        {manga.isInPurchase ? "Remove from Purchase" : "Add to Purchase"}
                    </button>
                </div>
                <div className="manga-info">
                    <div className="manga-title">
                        <span>{manga.name}</span>
                        <span onClick={handleToggleLike} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                            <i className={`fas ${manga.isLiked ? 'fa-heart' : 'fa-heart'}`} style={{ color: manga.isLiked ? 'red' : 'grey' }}></i>
                            
                            {manga.likes}
                        </span>
                    </div>
                    <div className="manga-description">{manga.description}</div>
                    <div className="manga-categories">
                        <strong>Categories:</strong> {manga.categories.join(', ')}
                    </div>
                    <div className="manga-details">
                        <h3>Details</h3>
                        <ul>
                            <li><strong>Author:</strong> {manga.author}</li>
                            <li><strong>Publisher:</strong> {manga.publisher}</li>
                            <li><strong>Price:</strong> ${manga.price}</li>
                            <li><strong>Release Date:</strong> {new Date(manga.release_date).toLocaleDateString()}</li>
                            <li><strong>Rating:</strong> {manga.rating}</li>
                            <li><strong>Amount:</strong> {manga.amount}</li>
                            <li><strong>Views:</strong> {manga.views}</li>
                            <li><strong>Ended:</strong> {manga.ended ? 'Yes' : 'No'}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MangaPage;
