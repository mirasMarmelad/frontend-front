import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MangaList.css'; // Import CSS for styling
import AppBar from '../Helpers/Appbar';
import Footer from '../Helpers/Footer';

const MangaListPage = () => {
    const [mangas, setMangas] = useState([]);
    const [allMangas, setAllMangas] = useState([]);
    const [collaborativeMangas,setAllCollaborative] = useState([]);
    const [mainAllMangas, setMainAllMangas] = useState([]); // Ensure it's initialized as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('forYou'); // Added state for filtering
    const [selectedAuthor, setSelectedAuthor] = useState(''); // State for selected author
    const [selectedSort, setSelectedSort] = useState('-_id')
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const [authors, setAuthors] = useState([]); // State for authors
    const [categories, setCategories] = useState([]); // State for categories

    // Fetch authors and categories on component mount
    useEffect(() => {
        const fetchAuthorsAndCategories = async () => {
            try {
                const authorsResponse = await axios.get('http://localhost:8000/manga/getAuthors');
                const categoriesResponse = await axios.get('http://localhost:8000/manga/getCategories');
                setAuthors(authorsResponse.data.data);
                setCategories(categoriesResponse.data.data);
            } catch (err) {
                console.error('Error fetching authors and categories:', err);
            }
        };

        fetchAuthorsAndCategories();
    }, []);

    // Function to fetch mangas based on query
    const fetchMainAllMangas = async (query = '', author = '', category = '', sort='') => {
        try {
            const response = await axios.get(`http://localhost:8000/manga/all?q=${query}&author=${author}&category=${category}&sort=${sort}`, { withCredentials: true });
            setMainAllMangas(response.data.data || []); // Set to empty array if data is null
        } catch (err) {
            setError('Error fetching mangas.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/recomendations', { withCredentials: true });
                setMangas(response.data.data); 
            } catch (err) {
                setError('Error fetching mangas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllMangas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/manga/all?sort=-_id&limit=5', { withCredentials: true });
                setAllMangas(response.data.data || []); // Set to empty array if data is null
            } catch (err) {
                setError('Error fetching mangas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        const fetchCollMangas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/collaborative', { withCredentials: true });
                setAllCollaborative(response.data.data); 
            } catch (err) {
                setError('Error fetching mangas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCollMangas();
        fetchMangas();
        fetchAllMangas();
        fetchMainAllMangas(); // Initial fetch without query
    }, []);

    useEffect(() => {
        // Fetch mangas when the search input, author, or category changes
        fetchMainAllMangas(search, selectedAuthor, selectedCategory,selectedSort);
    }, [search, selectedAuthor, selectedCategory,selectedSort]); // Dependency on search, author, and category

    const filteredMangas = allMangas.filter(manga =>
        manga.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        fetchMainAllMangas(search, selectedAuthor, selectedCategory,selectedSort); // Fetch based on the current search term
    };

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const clearFilters = () => {
        setSearch('');
        setSelectedAuthor('');
        setSelectedCategory('');
        setSelectedSort('-_id'); // Assuming '-_id' is your default sort
        fetchMainAllMangas(); // Re-fetch the mangas with default parameters
    };
    

    const displayMangas = filter === 'forYou' ? mangas :
    filter === 'othersWatched' ? collaborativeMangas : filteredMangas;

    return (
        <div>
            <AppBar />
            <div className="manga-list-page">
                <div className="filter-buttons">
                    <button onClick={() => setFilter('forYou')} className={filter === 'forYou' ? 'active' : ''}>For You</button>
                    <button onClick={() => setFilter('othersWatched')} className={filter === 'othersWatched' ? 'active' : ''}>Others Watched</button>
                    <button onClick={() => setFilter('recent')} className={filter === 'recent' ? 'active' : ''}>Recent</button>
                </div>

                <div className="manga-grid">
                    {displayMangas.map((manga) => (
                        <Link to={`/manga/${manga.id}`} key={manga.id} className="manga-card">
                            <img
                                src={`http://localhost:8000/image/${manga.imageHash}`}
                                alt={manga.name}
                                className="manga-image-lists"
                            />
                            <div className="manga-name">{manga.name}</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="main-manga-list">
                <h2>Каталог манги</h2>
                <form onSubmit={handleSubmit}> {/* Use form for the search input */}
                    <div className='main-filters'>
                        <div className='main-filter-search'>
                            <input 
                                type="text" 
                                placeholder='Поиск...' 
                                value={search} // Set input value to state
                                onChange={handleSearchChange} // Update search state on change
                            />
                        </div>
                        <div className='main-filter-select-author'>
                            <select name="author" id="author-select" value={selectedAuthor} onChange={handleAuthorChange}>
                                <option value="">Select Author</option>
                                {authors.map((author, index) => (
                                    <option key={index} value={author}>{author}</option>
                                ))}
                            </select>
                            <select name="categories" id="categories-select" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <select name="sort" id="sort-select" onChange={handleSortChange} value={selectedSort}>
                                <option value="-_id">От новых к старым</option>
                                <option value="">От старых к новым</option>
                                <option value="-rating">От популярных до не популярных</option>
                                <option value="rating">От не популярных к популярнам</option>
                            </select>
                            <button onClick={clearFilters} className="clear-button">Clear</button> {/* Add this line */}

                        </div>
                        
                    </div>
                </form>

                <div className="main-manga-grid">
                    {mainAllMangas.length === 0 ? ( // Check if there are no mangas
                        <div>No such data found.</div> // Display message if no data found
                    ) : (
                        mainAllMangas.map((manga) => (
                            <Link to={`/manga/${manga.id}`} key={manga.id} className="main-manga-card">
                                <img
                                    src={`http://localhost:8000/image/${manga.imageHash}`}
                                    alt={manga.name}
                                    className="main-manga-image-lists"
                                />
                                <div className="main-manga-name">{manga.name}</div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MangaListPage;
