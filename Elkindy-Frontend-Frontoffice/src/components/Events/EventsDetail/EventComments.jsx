
// import React, { useState, useEffect } from "react";
// import { getEventComments } from "../../../services/eventsApi";
// import BlogCommentItem from "./BlogCommentItem";
// import { useParams } from "react-router-dom";

// const BlogComments = () => {
//   const [comments, setComments] = useState([]);
//   const { eventId } = useParams();

//   useEffect(() => {
//     // Fonction pour récupérer les commentaires depuis le backend
//     const fetchComments = async () => {
//       try {
//         const commentsData = await getEventComments(eventId);
//         setComments(commentsData);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des commentaires :", error);
//       }
//     };

//     fetchComments();
//   }, [eventId]);

//   return (
//     <div className="comment-wrap">
//       <h2 className="title">
//         {comments.length} <span>Comments</span>
//       </h2>

//       <div className="latest-comments">
//         <ul className="list-wrap">
//           {comments.map((comment, index) => (
//             <li key={index}>
//               <BlogCommentItem
//                 item={{
//                   src: comment.user ? comment.user.profilePicture : "", // Vérification de nullité pour l'utilisateur
//                   author: comment.user ? comment.user.username : "Unknown", // Affichage de "Unknown" si l'utilisateur est null
//                   created_at: comment.date, // Assurez-vous que la propriété correcte est utilisée ici
//                   comment: comment.comment,
//                 }}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BlogComments;


import React, { useState, useEffect } from "react";
import { getEventComments } from "../../../services/eventsApi";
import BlogCommentItem from "./BlogCommentItem";
import { useParams } from "react-router-dom";

const BlogComments = () => {
  const [comments, setComments] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getEventComments(eventId);
        setComments(commentsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      }
    };

    fetchComments();
  }, [eventId]);

  return (
    <div className="comment-wrap">
      <h2 className="title">
        {comments.length} <span>Comments</span>
      </h2>

      <div className="latest-comments">
        <ul className="list-wrap">
          {comments.map((comment, index) => (
            <li key={index}>
              <BlogCommentItem comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogComments;
