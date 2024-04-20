// import React from "react";
// import cn from "classnames";

// const BlogCommentItem = ({ item, className }) => {
//   return (
//     <div className={cn("comments-box", className)}>
//       <div className="comments-avatar">
//         <img src={item.src} alt="" />
//       </div>

//       <div className="comment-text">
//         <h4 className="title">{item.author}</h4>

//         <span>
//           <i className="fal fa-calendar-alt"></i>
          
//           {new Date(item.created_at).toLocaleString('tn-TN', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                           hour: 'numeric',
//                           minute: 'numeric'
//                         })}
//         </span>

//         <p>{item.comment}</p>

//         {/* <a href="#" className="comment-reply-link">
//           <i className="fal fa-reply"></i>Reply
//         </a> */}
//       </div>
//     </div>
//   );
// };

// export default BlogCommentItem;

import React, { useEffect, useState } from "react";
import cn from "classnames";
import { updateComment,deleteMyComment } from "../../../services/eventsCommentApi";

import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const BlogCommentItem = ({ comment, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
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
  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

//   const handleSaveButtonClick = async () => {
//     try {
// console.log("userrresers ",userId)
//       await updateComment(comment._id, { comment: editedComment , user: userId });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       // Gérer l'erreur
//     }
//   };

const handleSaveButtonClick = async () => {
  try {
    console.log("userId: ", userId); // Assurez-vous que userId est défini correctement
    console.log('commentId',comment._id)
    await updateComment(comment._id, { comment: editedComment, user: userId });
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating comment:", error);
    // Gérer l'erreur
  }
};

const handleDeleteButtonClick = async () => {
  try {
    await deleteMyComment(comment._id); // Appelez la fonction de suppression avec l'ID du commentaire
    // Vous pouvez également mettre à jour l'état local pour supprimer le commentaire de la liste des commentaires affichés
  } catch (error) {
    console.error("Error deleting comment:", error);
    // Gérer l'erreur
  }
};
  return (
    <div className={cn("comments-box", className)}>
      <div className="comments-avatar">
        <img src={comment.user ? comment.user.profilePicture : ""} alt="" />
      </div>

      <div className="comment-text">
        <h4 className="title">{comment.user ? comment.user.username : "Unknown"}</h4>

        <span>
          <i className="fal fa-calendar-alt"></i>
          {new Date(comment.created_at).toLocaleString('tn-TN', {
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

        {isEditing ? (
          <button onClick={handleSaveButtonClick}>Save</button>
        ) : (
          <button onClick={handleEditButtonClick}>Edit</button>
        )}
        <button onClick={handleDeleteButtonClick}>Delete</button>
      </div>
    </div>
  );
};

export default BlogCommentItem;
