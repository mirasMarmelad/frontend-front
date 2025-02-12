import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [mangas, setMangas] = useState([]);
  const [newManga, setNewManga] = useState({
    name: "",
    description: "",
    categories: [],
    author: "",
    publisher: "",
    price: 0.0,
    release_date_string: "",
    rating: 0.0,
    amount: 0,
    ended: false,
    imageHash: "",
    coverHash:""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get("http://localhost:8000/manga/all");
        if (response.data && response.data.data) {
          setMangas(response.data.data);
        } else {
          setMangas([]);
        }
      } catch (err) {
        console.error("Error fetching mangas:", err);
        setError("Failed to fetch mangas.");
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categories") {
      setNewManga({
        ...newManga,
        [name]: value.split(",").map((category) => category.trim())
      });
    } else {
      setNewManga({
        ...newManga,
        [name]: value
      });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Immediately upload the image
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("http://localhost:8000/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setNewManga((prev) => ({
          ...prev,
          imageHash: response.data.hash
        }));
      } catch (err) {
        console.error("Error uploading image:", err);
        setError("Failed to upload image.");
      }
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Immediately upload the image
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("http://localhost:8000/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setNewManga((prev) => ({
          ...prev,
          coverHash: response.data.hash
        }));
      } catch (err) {
        console.error("Error uploading image:", err);
        setError("Failed to upload image.");
      }
    }
  };

  const handleAddManga = async (e) => {
    e.preventDefault();

    // Convert price, rating, and amount to appropriate types
    const mangaToSend = {
      ...newManga,
      price: parseFloat(newManga.price),
      rating: parseFloat(newManga.rating),
      amount: parseInt(newManga.amount, 10) // Convert amount to integer
    };

    try {
      const response = await axios.post("http://localhost:8000/manga/add", mangaToSend);
      setMangas([...mangas, response.data]);
      setNewManga({
        name: "",
        description: "",
        categories: [],
        author: "",
        publisher: "",
        price: 0.0,
        release_date_string: "",
        rating: 0.0,
        amount: 0,
        ended: false,
        imageHash: ""
      });
      setImageFile(null);
      setIsModalOpen(false);
      window.location.reload();
      alert("New book was added")
    } catch (err) {
      console.error("Error adding manga:", err);
      setError("Failed to add new manga.");
    }
  };

  const handleDeleteManga = async (manga) => {
    try {
      const { id } = manga;
      await axios.post("http://localhost:8000/manga/remove", { id });
      setMangas(mangas.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting manga:", err);
      setError("Failed to delete manga.");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-page">
      <h2>Admin Manga Management</h2>
      <button onClick={toggleModal} className="add-manga-button">Add New Manga</button>

      {mangas.length === 0 ? (
        <div>No mangas available.</div>
      ) : (
        <table className="manga-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Categories</th>
              <th>Price</th>
              <th>Release Date</th>
              <th>Rating</th>
              <th>Amount</th>
              <th>Ended</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mangas.map(manga => (
              <tr key={manga.id}>
                <td>{manga.id}</td>
                <td>{manga.name}</td>
                <td>{manga.description}</td>
                <td>{manga.author}</td>
                <td>{manga.categories ? manga.categories.join(", ") : ''}</td>
                <td>${manga.price}</td>
                <td>{new Date(manga.release_date).toLocaleDateString()}</td>
                <td>{manga.rating}</td>
                <td>{manga.amount}</td>
                <td>{manga.ended ? "Yes" : "No"}</td>
                <td>{manga.views}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteManga(manga)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Manga</h3>
            <form onSubmit={handleAddManga}>
              <input type="text" name="name" placeholder="Name" value={newManga.name} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Description" value={newManga.description} onChange={handleChange} required />
              <input type="text" name="categories" placeholder="Categories (comma-separated)" value={newManga.categories.join(", ")} onChange={handleChange} required />
              <input type="text" name="author" placeholder="Author" value={newManga.author} onChange={handleChange} required />
              <input type="text" name="publisher" placeholder="Publisher" value={newManga.publisher} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Price" value={newManga.price} onChange={handleChange} required />
              <input type="datetime-local" name="release_date_string" value={newManga.release_date_string} onChange={handleChange} required />
              <input type="number" name="rating" placeholder="Rating" value={newManga.rating} onChange={handleChange} required />
              <input type="number" name="amount" placeholder="Amount" value={newManga.amount} onChange={handleChange} required />
              <input type="checkbox" name="ended" checked={newManga.ended} onChange={() => setNewManga({ ...newManga, ended: !newManga.ended })} /> Ended
              <span>
              <p>Image</p>
              <input type="file" accept="image/*" onChange={handleImageChange} required />
              </span>
             <span>
              <p>Cover</p>
              <input type="file" accept="image/*" onChange={handleCoverChange} required />
             </span>
              <button type="submit" className="submit-button">Add Manga</button>
              <button type="button" onClick={toggleModal} className="cancel-button">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
