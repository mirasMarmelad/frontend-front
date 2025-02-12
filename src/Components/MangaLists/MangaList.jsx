import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MangaList.css';
import AppBar from '../Helpers/Appbar';
import Footer from '../Helpers/Footer';

const MangaListPage = () => {
    const [mangas, setMangas] = useState([]);
    const [allMangas, setAllMangas] = useState([]);
    const [collaborativeMangas,setAllCollaborative] = useState([]);
    const [mainAllMangas, setMainAllMangas] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('forYou'); 
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedSort, setSelectedSort] = useState('-_id');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAuthorsAndCategories = async () => {
            try {
                console.log('Fetching authors and categories...');
                const authorsResponse = await axios.get('http://localhost:8000/manga/getAuthors');
                const categoriesResponse = await axios.get('http://localhost:8000/manga/getCategories');
                setAuthors(authorsResponse.data.data);
                setCategories(categoriesResponse.data.data);
                console.log('Authors and categories fetched successfully');
            } catch (err) {
                console.error('Error fetching authors and categories:', err);
            }
        };

        fetchAuthorsAndCategories();
    }, []);

    const fetchMainAllMangas = async (query = '', author = '', category = '', sort='') => {
        try {
            console.log(`Fetching mangas with query: ${query}, author: ${author}, category: ${category}, sort: ${sort}`);
            const response = await axios.get(`http://localhost:8000/manga/all?q=${query}&author=${author}&category=${category}&sort=${sort}`, { withCredentials: true });
            setMainAllMangas(response.data.data || []);
            console.log('Mangas fetched successfully');
        } catch (err) {
            setError('Error fetching mangas.');
            console.error('Error fetching mangas:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                console.log('Fetching recommended mangas...');
                const response = await axios.get('http://localhost:8000/recomendations', { withCredentials: true });
                setMangas(response.data.data); 
                console.log('Recommended mangas fetched successfully');
            } catch (err) {
                setError('Error fetching mangas.');
                console.error('Error fetching recommended mangas:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllMangas = async () => {
            try {
                console.log('Fetching all mangas...');
                const response = await axios.get('http://localhost:8000/manga/all?sort=-_id&limit=5', { withCredentials: true });
                setAllMangas(response.data.data || []);
                console.log('All mangas fetched successfully');
            } catch (err) {
                setError('Error fetching mangas.');
                console.error('Error fetching all mangas:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchCollMangas = async () => {
            try {
                console.log('Fetching collaborative mangas...');
                const response = await axios.get('http://localhost:8000/collaborative', { withCredentials: true });
                setAllCollaborative(response.data.data); 
                console.log('Collaborative mangas fetched successfully');
            } catch (err) {
                setError('Error fetching mangas.');
                console.error('Error fetching collaborative mangas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCollMangas();
        fetchMangas();
        fetchAllMangas();
        fetchMainAllMangas();
    }, []);

    useEffect(() => {
        fetchMainAllMangas(search, selectedAuthor, selectedCategory, selectedSort);
    }, [search, selectedAuthor, selectedCategory, selectedSort]);

    const filteredMangas = allMangas.filter(manga =>
        manga.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted with search:', search);
        fetchMainAllMangas(search, selectedAuthor, selectedCategory, selectedSort);
    };

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
        console.log('Selected author:', event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
        console.log('Selected sort:', event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log('Selected category:', event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const clearFilters = () => {
        console.log('Clearing filters...');
        setSearch('');
        setSelectedAuthor('');
        setSelectedCategory('');
        setSelectedSort('-_id');
        fetchMainAllMangas();
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
                <h2  style={{
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      flexDirection: 'column', // Arrange items in a column
    }}>Каталог манги</h2>
                <form onSubmit={handleSubmit}>
                    <div className='main-filters'>
                        <div className='main-filter-search'>
                            <input 
                                type="text" 
                                placeholder='Поиск...' 
                                value={search} 
                                onChange={handleSearchChange}
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
                            <button onClick={clearFilters} className="clear-button">Clear</button>
                        </div>
                    </div>
                </form>

                <div className="main-manga-grid">
                    {mainAllMangas.length === 0 ? (
                        <div>No such data found.</div>
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
