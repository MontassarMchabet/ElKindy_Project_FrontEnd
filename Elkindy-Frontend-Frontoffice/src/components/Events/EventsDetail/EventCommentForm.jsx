
import React, { useState, useEffect } from "react";
import { addComment } from "../../../services/eventsCommentApi";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const EventCommentForm = ({ updateComments,filterBadWords}) => {
  const { eventId } = useParams();
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filtrer les mots interdits du commentaire
      const filteredComment = await filterBadWords(comment);
      
      // Ajouter le commentaire filtré
      await addComment(eventId, { comment: filteredComment, user: userId });
  
      // Effacer le champ de commentaire après l'ajout
      setComment("");
  
      // Mettre à jour les commentaires après l'ajout d'un nouveau commentaire
      updateComments();
    } catch (error) {
      console.error("Error sending comment :", error);
    }
  };
  
  const handleChange = (e) => {
    setComment(e.target.value);
  };
    return (
    <div className="post-comments-form">
      <div className="post-comments-title">
        <h2 className="title">Leave Your Comment</h2>
      </div>

      <div className="comment-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grp">
            <textarea
              name="message"
              placeholder="Write your comment here"
              value={comment}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn">
             Comment <span></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCommentForm;
