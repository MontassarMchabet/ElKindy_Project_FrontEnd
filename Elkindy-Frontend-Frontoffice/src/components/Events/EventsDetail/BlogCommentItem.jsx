
import React, { useEffect, useState } from "react";
import cn from "classnames";
import { updateComment, deleteMyComment } from "../../../services/eventsCommentApi";
import axios from 'axios'; // Importez axios
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const BlogCommentItem = ({ comment, className, updateComments, filterBadWords }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [userId, setUserId] = useState(null);
  console.log(typeof updateComments, ' khraaaa');
  useEffect(() => {
    const getUserIdFromToken = () => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken.userId;
        setUserId(userId);
      }
    };

    getUserIdFromToken();
  }, []);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    try {
      const filteredComment = await filterBadWords(editedComment);
      // Mettez à jour le commentaire
      await updateComment(comment._id, { comment: filteredComment, user: userId });
      setIsEditing(false);

      // Mettez à jour les commentaires après l'édition
      updateComments();

    } catch (error) {
      console.error("Error updating comment:", error);
      // Gérer l'erreur
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      // Supprimer le commentaire
      await deleteMyComment(comment._id, userId); // Passer l'ID du commentaire et l'ID de l'utilisateur
      // Mettre à jour les commentaires après la suppression
      updateComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Gérer l'erreur
    }
  };

  return (
    <div className={cn("comments-box", className)}>
      <div className="comments-avatar-1">
        <img src={comment.user ? comment.user.profilePicture : ""} alt="" />
      </div>

      <div className="comment-text">
        <h4 className="title">{comment.user ? comment.user.username : "Unknown"}</h4>

        <span>
          <i className="fal fa-calendar-alt"></i>
          {new Date(comment.date).toLocaleString('tn-TN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}
        </span>

        {isEditing ? (
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        ) : (
          <p>{comment.comment}</p>
        )}

        {/* Vérifiez si l'utilisateur connecté est l'auteur du commentaire */}
        {userId === comment.user?._id && (
          <>

            {isEditing ? (
            <Link className="rade-more-btn" style={{ marginLeft: 20 , marginRight: 20 }} onClick={handleSaveButtonClick}>
            Save
          </Link>
            ) : (
              <Link className="rade-more-btn" style={{ marginLeft: 20, marginRight: 20 }} onClick={handleEditButtonClick}>
                Edit
              </Link>
            )}
            <Link className="rade-more-btn" style={{ marginLeft: 20, marginRight: 20 }} onClick={handleDeleteButtonClick}>
              Delete
            </Link>
          </>

        )}
      </div>
    </div>
  );
};

export default BlogCommentItem;