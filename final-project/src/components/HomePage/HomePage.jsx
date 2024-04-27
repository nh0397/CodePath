import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Modal from '../../contexts/Modal';
import apiServices from '../../services/apiServices';
import PostInfo from '../PostInfo/PostInfo';

function HomePage(props) {
    const { modalOpen, toggleModal } = props;
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to track loading state

    useEffect(() => {
        // Fetch posts data when the component mounts
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await apiServices.getPosts();
            if (error) {
                console.error('Error fetching posts:', error.message);
                return;
            }
            setPosts(data);
            setIsLoading(false); // Set loading state to false once posts are fetched
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    };

    const openModal = () => {
        toggleModal(true);
    };

    const closeModal = () => {
        toggleModal(false);
    };

    const handleSubmit = async (userId, title, description, imageUrl) => {
        const { error } = await apiServices.addPost(userId, title, description, imageUrl);
        if (error) {
            console.error('Error adding post:', error.message);
            // Handle error, display message to user, etc.
        } else {
            // Reset form fields or update state as needed
            closeModal();
            fetchPosts(); // Refresh posts after adding a new one
        }
    };

    return (
        <div className="home-page">
            {modalOpen && (
                <Modal onSubmit={handleSubmit} onClose={closeModal}>
                </Modal>
            )}

            {isLoading ? ( // Check if loading state is true
                <div className="loading-message">
                    Loading... {/* Display loading message */}
                </div>
            ) : posts.length === 0 ? ( // Check if there are no posts
                <div className="no-posts-message">
                    <span role="img" aria-label="superman emoji">🦸‍♂️</span> 
                    No Discussions Yet! <br></br>
                    Be the first one to start.
                </div>
            ) : ( // Render posts if there are any
                <div className="post-container">
                    {posts.map(post => (
                        <PostInfo
                            key={post.id}
                            title={post.title}
                            description={post.description}
                            firstName={post.users.first_name}
                            createdAt={post.createdat}
                            likes={post.likes}
                            dislikes={post.dislikes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
