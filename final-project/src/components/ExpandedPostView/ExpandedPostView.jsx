import React from 'react';
import './ExpandedPostView.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Close icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'; // Edit and Delete icons

const calculateTimeDifference = (createdAt) => {
        const postDate = new Date(createdAt).getTime(); // Convert createdAt to milliseconds
        const currentTime = new Date().getTime(); // Get current time in milliseconds
        const timeDifference = currentTime - postDate; // Calculate time difference in milliseconds
        const userId = sessionStorage.getItem("userid")
        // Check if time difference is negative
        if (timeDifference < 0) {
            return 'Invalid timestamp'; // Return an error message
        }

        const minutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
        const hours = Math.floor(minutes / 60); // Convert minutes to hours
        const remainingMinutes = minutes % 60; // Get remaining minutes after subtracting hours

        // Format the post date
        const formattedPostDate = new Date(createdAt).toLocaleString('en-US', {
            hour12: true,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        if (hours > 0) {
            return `Posted at ${formattedPostDate}`;
        } else {
            return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
    };


const ExpandedPostView = ({ post, onClose, onEdit, onDelete }) => {
  return (
    <div className="expanded-post-view">
      <div className='close-div'>
                <button className="edit-btn" onClick={onEdit} disabled={sessionStorage.getItem('userId') !== post.users.id} title={sessionStorage.getItem('userId') !== post.users.id ? "Only authors can edit" : ""}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-btn" disabled={sessionStorage.getItem('userId') !== post.users.id} title={sessionStorage.getItem('userId') !== post.users.id ? "Only authors can delete" : ""}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
      <div className="post-header">
        <h3>{post.title}</h3>
      </div>
      <div className='info-row-parent'>
        <div className="info-row">
            <span className="label">Asked by:</span>
            <span className="value">{post.users.first_name}</span>
        </div>
        <div className="info-row">
            <span className="label">Time:</span>
            <span className="value">{calculateTimeDifference(post.createdat)}</span>
        </div>
      </div>
      <div className="post-details">
        <div>
          <img className="expand-image" src={post.imageurl} alt="Post Image" />
        </div>
      </div>
      <div className="info-row">
        <span className="value">{post.description}</span>
      </div>
       <div className="like-dislike-buttons">
        <button className="like-btn">
          <FontAwesomeIcon icon={faThumbsUp} />
          {post.likes}
        </button>
        <button className="dislike-btn">
          <FontAwesomeIcon icon={faThumbsDown} />
          {post.dislikes}
        </button>
      </div>
      <div className="btn-group">
      </div>
    </div>
  );
};

export default ExpandedPostView;
