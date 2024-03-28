// import React from "react";

// const EventCommentForm = () => {
//   return (
//     <div className="post-comments-form">
//       <div className="post-comments-title">
//         <h2 className="title">Leave Your Comment</h2>
//       </div>

//       <div className="comment-form">
//         <form action="#">
          

//           <div className="form-grp">
//             <textarea
//               name="message"
//               placeholder="Write your message here"
//             ></textarea>
//           </div>

//           <button type="submit" className="btn">
//             Send Message <span></span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EventCommentForm;
import React, { useState } from "react";
import { addComment } from "../../../services/eventsCommentApi"; 
import { useParams } from "react-router-dom";

const EventCommentForm = () => {
  const { eventId } = useParams(); // Récupérez l'identifiant de l'événement à partir des paramètres d'URL
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyez le commentaire au backend pour être associé à l'événement
      await addComment(eventId, { comment: message });
      // Réinitialisez le champ de texte après l'envoi du commentaire
      setMessage("");
      // Vous pouvez également ajouter une logique pour actualiser la liste des commentaires après l'ajout du nouveau commentaire si nécessaire
    } catch (error) {
      console.error("Error sending comment :", error);
      // Ajoutez une logique pour afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
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
              value={message}
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
