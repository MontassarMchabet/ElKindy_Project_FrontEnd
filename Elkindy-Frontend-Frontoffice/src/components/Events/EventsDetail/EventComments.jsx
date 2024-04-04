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
//         const commentsData = await getEventComments(eventId); // Assurez-vous de remplacer "eventId" par l'ID de l'événement approprié et "config" par les configurations nécessaires
//         setComments(commentsData);
//       } catch (error) {
//         console.error("Error fetching comments :", error);
//       }
//     };

//     fetchComments(); // Appel de la fonction pour récupérer les commentaires au chargement du composant
//   }, [eventId]); // Utilisation de useEffect pour s'assurer que la fonction est appelée une seule fois au chargement du composant

//   return (
//     <div className="comment-wrap">
//       <h2 className="title">
//       {comments.length} <span>Comments</span>
//       </h2>

//       <div className="latest-comments">
//       <ul className="list-wrap">
//       {comments.map((comment, index) => (
//             <li key={index}>
//                {comment.user && (
//             <BlogCommentItem
//               item={{
//                 src: comment.user.profilePicture,
//                   author: comment.user.username,
//                   created_at: comment.date,
//                   comment: comment.comment,
//               }}
//             />
//             )}
//           </li>
//           ))}
          
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BlogComments;
// ****************
import React, { useState, useEffect } from "react";
import { getEventComments } from "../../../services/eventsApi";
import BlogCommentItem from "./BlogCommentItem";
import { useParams } from "react-router-dom";

const BlogComments = () => {
  const [comments, setComments] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    // Fonction pour récupérer les commentaires depuis le backend
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
              <BlogCommentItem
                item={{
                  src: comment.user ? comment.user.profilePicture : "", // Vérification de nullité pour l'utilisateur
                  author: comment.user ? comment.user.username : "Unknown", // Affichage de "Unknown" si l'utilisateur est null
                  created_at: comment.date, // Assurez-vous que la propriété correcte est utilisée ici
                  comment: comment.comment,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogComments;

// // *********
// import React, { useState, useEffect } from "react";
// import { getEventComments } from "../../../services/eventsApi"; // Importez la fonction pour ajouter un commentaire depuis votre service
// import {  addComment } from "../../../services/eventsCommentApi"; // Importez la fonction pour ajouter un commentaire depuis votre service
// import BlogCommentItem from "./BlogCommentItem";
// import { useParams } from "react-router-dom";
// import EventCommentForm from "./EventCommentForm";

// const BlogComments = () => {
//   const [comments, setComments] = useState([]);
//   const { eventId } = useParams();
  
//   // Fonction pour récupérer les commentaires depuis le backend
//   const fetchComments = async () => {
//     try {
//       const commentsData = await getEventComments(eventId);
//       setComments(commentsData);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des commentaires :", error);
//     }
//   };

//   useEffect(() => {
//     fetchComments(); // Appel de la fonction pour récupérer les commentaires au chargement du composant
//   }, [eventId]);

//   const handleSubmitComment = async (message) => {
//     try {
//       // Envoyez le commentaire au backend pour être associé à l'événement
//       await addComment(eventId, { comment: message });
//       // Après l'ajout réussi du commentaire, récupérez à nouveau les commentaires pour afficher le nouveau commentaire ajouté
//       fetchComments();
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du commentaire :", error);
//       // Ajoutez une logique pour afficher un message d'erreur à l'utilisateur si nécessaire
//     }
//   };

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
//                   src: comment.user ? comment.user.profilePicture : "",
//                   author: comment.user ? comment.user.username : "Unknown",
//                   created_at: comment.date,
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


// import React, { useState, useEffect } from "react";
// import { getEventComments } from "./votre-fichier-api"; // Assurez-vous de remplacer "votre-fichier-api" par le chemin correct vers votre fichier contenant la fonction getEventComments
// import BlogCommentItem from "./BlogCommentItem";

// const BlogComments = () => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     // Fonction pour récupérer les commentaires depuis le backend
//     const fetchComments = async () => {
//       try {
//         const commentsData = await getEventComments(eventId, config); // Assurez-vous de remplacer "eventId" par l'ID de l'événement approprié et "config" par les configurations nécessaires
//         setComments(commentsData);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des commentaires :", error);
//       }
//     };

//     fetchComments(); // Appel de la fonction pour récupérer les commentaires au chargement du composant
//   }, []); // Utilisation de useEffect pour s'assurer que la fonction est appelée une seule fois au chargement du composant

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
//                   src: comment.user.image,
//                   author: comment.user.username,
//                   created_at: comment.created_at,
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