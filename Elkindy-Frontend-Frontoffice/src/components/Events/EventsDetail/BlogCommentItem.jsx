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

// import React, { useEffect, useState } from "react";
// import cn from "classnames";
// import { updateComment,deleteMyComment } from "../../../services/eventsCommentApi";

// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';

// const BlogCommentItem = ({ comment, className }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedComment, setEditedComment] = useState(comment.comment);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//       const getUserIdFromToken = () => {
//           const storedToken = Cookies.get('token');
//           if (storedToken) {
//               const decodedToken = jwtDecode(storedToken);
//               const userId = decodedToken.userId;
//               setUserId(userId);
//           }
//       };

//       getUserIdFromToken();
//   }, []);
//   console.log('userid',userId)
//   const handleEditButtonClick = () => {
//     setIsEditing(true);
//   };

// //   const handleSaveButtonClick = async () => {
// //     try {
// // console.log("userrresers ",userId)
// //       await updateComment(comment._id, { comment: editedComment , user: userId });
// //       setIsEditing(false);
// //     } catch (error) {
// //       console.error("Error updating comment:", error);
// //       // Gérer l'erreur
// //     }
// //   };

// const handleSaveButtonClick = async () => {
//   try {
//     await updateComment(comment._id, { comment: editedComment, user: userId });
//     setIsEditing(false);
//   } catch (error) {
//     console.error("Error updating comment:", error);
//     // Gérer l'erreur
//   }
// };

// const handleDeleteButtonClick = async () => {
//   try {
//     await deleteMyComment(comment._id); // Appelez la fonction de suppression avec l'ID du commentaire
//     // Vous pouvez également mettre à jour l'état local pour supprimer le commentaire de la liste des commentaires affichés
//   } catch (error) {
//     console.error("Error deleting comment:", error);
//     // Gérer l'erreur
//   }
// };
//   return (
//     <div className={cn("comments-box", className)}>
//       <div className="comments-avatar">
//         <img src={comment.user ? comment.user.profilePicture : ""} alt="" />
//       </div>

//       <div className="comment-text">
//         <h4 className="title">{comment.user ? comment.user.username : "Unknown"}</h4>

//         <span>
//           <i className="fal fa-calendar-alt"></i>
//           {new Date(comment.created_at).toLocaleString('tn-TN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric'
//           })}
//         </span>

//         {isEditing ? (
//           <textarea
//             value={editedComment}
//             onChange={(e) => setEditedComment(e.target.value)}
//           />
//         ) : (
//           <p>{comment.comment}</p>
//         )}

//         {isEditing ? (
//           <button onClick={handleSaveButtonClick}>Save</button>
//         ) : (
//           <button onClick={handleEditButtonClick}>Edit</button>
//         )}
//         <button onClick={handleDeleteButtonClick}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default BlogCommentItem;

import React, { useEffect, useState } from "react";
import cn from "classnames";
import { updateComment, deleteMyComment } from "../../../services/eventsCommentApi";
import axios from 'axios'; // Importez axios
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const BlogCommentItem = ({ comment, className, updateComments,filterBadWords }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [userId, setUserId] = useState(null);
  console.log(typeof updateComments,' khraaaa');
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
              <button className=" comment-button comment-save-button" onClick={handleSaveButtonClick}>Save</button>
            ) : (
              <button className=" comment-button comment-edit-button" onClick={handleEditButtonClick}>Edit</button>
            )}
            <button className="comment-button comment-delete-button" onClick={handleDeleteButtonClick}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCommentItem;


// const BlogCommentItem = ({ comment, className, updateComments }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedComment, setEditedComment] = useState(comment.comment);
//   const [userId, setUserId] = useState(null);
//   console.log(typeof updateComments,' khraaaa');
//   useEffect(() => {
//     const getUserIdFromToken = () => {
//       const storedToken = Cookies.get('token');
//       if (storedToken) {
//         const decodedToken = jwtDecode(storedToken);
//         const userId = decodedToken.userId;
//         setUserId(userId);
//       }
//     };

//     getUserIdFromToken();
//   }, []);

//   const handleEditButtonClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveButtonClick = async () => {
//     try {
//       // Mettez à jour le commentaire
//       await updateComment(comment._id, { comment: editedComment, user: userId });
//       setIsEditing(false);

//       // Mettez à jour les commentaires après l'édition
//       updateComments();
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       // Gérer l'erreur
//     }
//   };

//   const handleDeleteButtonClick = async () => {
//     try {
//       // Supprimer le commentaire
//       await deleteMyComment(comment._id, userId); // Passer l'ID du commentaire et l'ID de l'utilisateur
//       // Mettre à jour les commentaires après la suppression
//       updateComments();
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       // Gérer l'erreur
//     }
//   };

//   return (
//     <div className={cn("comments-box", className)}>
//       <div className="comments-avatar-1">
//         <img src={comment.user ? comment.user.profilePicture : ""} alt="" />
//       </div>

//       <div className="comment-text">
//         <h4 className="title">{comment.user ? comment.user.username : "Unknown"}</h4>

//         <span>
//           <i className="fal fa-calendar-alt"></i>
//           {new Date(comment.date).toLocaleString('tn-TN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric'
//           })}
//         </span>

//         {isEditing ? (
//           <textarea
//             value={editedComment}
//             onChange={(e) => setEditedComment(e.target.value)}
//           />
//         ) : (
//           <p>{comment.comment}</p>
//         )}

//         {/* Vérifiez si l'utilisateur connecté est l'auteur du commentaire */}
//         {userId === comment.user?._id && (
//           <>
//             {isEditing ? (
//               <button className="comment-button comment-save-button" onClick={handleSaveButtonClick}>Save</button>
//             ) : (
//               <button className="comment-button comment-edit-button" onClick={handleEditButtonClick}>Edit</button>
//             )}
//             <button className="comment-button comment-delete-button" onClick={handleDeleteButtonClick}>Delete</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogCommentItem;

// import React, { useEffect, useState } from "react";
// import cn from "classnames";
// import { updateComment, deleteMyComment } from "../../../services/eventsCommentApi";
// import axios from 'axios'; // Importez axios
// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';

// const BlogCommentItem = ({ comment, className }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedComment, setEditedComment] = useState(comment.comment);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const getUserIdFromToken = () => {
//       const storedToken = Cookies.get('token');
//       if (storedToken) {
//         const decodedToken = jwtDecode(storedToken);
//         const userId = decodedToken.userId;
//         setUserId(userId);
//       }
//     };

//     getUserIdFromToken();
//   }, []);

//   const handleEditButtonClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveButtonClick = async () => {
//     try {
//       const filteredComment = await filterBadWords(editedComment); // Filtrer les mots interdits
//       if (filteredComment !== editedComment) {
//         // Si le commentaire contient des mots interdits, affichez un message d'erreur
//         console.error("Le commentaire contient des mots interdits.");
//         return;
//       }

//       // Si le commentaire est propre, mettez à jour le commentaire
//       await updateComment(comment._id, { comment: editedComment, user: userId });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       // Gérer l'erreur
//     }
//   };

//   const handleDeleteButtonClick = async () => {
//     try {
//       await deleteMyComment(comment._id);
//       // Vous pouvez également mettre à jour l'état local pour supprimer le commentaire de la liste des commentaires affichés
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       // Gérer l'erreur
//     }
//   };

//   // Fonction pour filtrer les mots interdits
//   const filterBadWords = async (comment) => {
//     const encodedParams = new URLSearchParams();
//     encodedParams.set('content', comment);
//     encodedParams.set('censor-character', '*');

//     const options = {
//       method: 'POST',
//       url: 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'X-RapidAPI-Key': 'f73daeac29msh3b4d521f1fb4e92p1ecc8fjsnd18233e56279',
//         'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
//       },
//       data: encodedParams,
//     };

//     try {
//       const response = await axios.request(options);
//       return response.data['censored-content'];
//     } catch (error) {
//       console.error(error);
//       return comment;
//     }
//   };

//   return (
//     <div className={cn("comments-box", className)}>
//       <div className="comments-avatar">
//         <img src={comment.user ? comment.user.profilePicture : ""} alt="" />
//       </div>

//       <div className="comment-text">
//         <h4 className="title">{comment.user ? comment.user.username : "Unknown"}</h4>

//         <span>
//           <i className="fal fa-calendar-alt"></i>
//           {new Date(comment.created_at).toLocaleString('tn-TN', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric'
//           })}
//         </span>

//         {isEditing ? (
//           <textarea
//             value={editedComment}
//             onChange={(e) => setEditedComment(e.target.value)}
//           />
//         ) : (
//           <p>{comment.comment}</p>
//         )}

//         {isEditing ? (
//           <button onClick={handleSaveButtonClick}>Save</button>
//         ) : (
//           <button onClick={handleEditButtonClick}>Edit</button>
//         )}
//         <button onClick={handleDeleteButtonClick}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default BlogCommentItem;
