import React, { useState, useEffect } from 'react';

const DiscoveryView = () => {
  const [photo, setPhoto] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  // Function to fetch a random photo from Unsplash
  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
      const data = await response.json();

      // Check if the photographer is in the ban list
      if (!banList.includes(data.user.username)) {
        setPhoto(data);
        setHistory((prevHistory) => [...prevHistory, data]);
      } else {
        // If banned, fetch another photo
        fetchRandomPhoto();
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  // Add a photographer to the ban list and fetch a new photo
  const addToBanList = (username) => {
    if (!banList.includes(username)) {
      setBanList([...banList, username]);
      fetchRandomPhoto();
    }
  };

  // Remove a photographer from the ban list
  const removeFromBanList = (username) => {
    setBanList(banList.filter((user) => user !== username));
  };

  // Fetch a new photo when the component mounts
  useEffect(() => {
    fetchRandomPhoto();
  }, []);

  if (!photo) return <div>Loading...</div>;

  return (
    <div className="discovery-view">
      <div className="header">Discover New Images</div>
      {photo && (
        <>
          <div className="main-image-container">
            <img src={photo.urls.regular} alt={photo.description || 'Unsplash Image'} className="main-image" />
          </div>
          <div className="photo-attributes">
            <p><strong>Photographer:</strong> {photo.user.name}</p>
            <p><strong>Description:</strong> {photo.description || 'No description available.'}</p>
            <p><strong>Published on:</strong> {new Date(photo.created_at).toLocaleDateString()}</p>
            <p><strong>Likes:</strong> {photo.likes}</p>
            <button onClick={() => addToBanList(photo.user.username)}>Ban {photo.user.name}</button>
            <button onClick={fetchRandomPhoto}>Discover More</button>
          </div>
          <div className="ban-list">
            <h3>Ban List:</h3>
            {banList.map((username) => (
              <span key={username} className="ban-list-item" onClick={() => removeFromBanList(username)}>
                {username}
              </span>
            ))}
          </div>
          <div className="history">
            <h3>History:</h3>
            {history.map((item, index) => (
              <img key={index} src={item.urls.thumb} alt={item.description} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DiscoveryView;
