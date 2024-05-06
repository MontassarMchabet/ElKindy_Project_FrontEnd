

import React, { useState, useEffect } from "react";
import { getEventComments } from "../../../services/eventsApi";
import BlogCommentItem from "./BlogCommentItem";
import { useParams } from "react-router-dom";

const BlogComments = ({commentsData, updateComments ,filterBadWords}) => {
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
        {commentsData.length} <span>Comments</span>
      </h2>

      <div className="latest-comments">
        <ul className="list-wrap">
          {commentsData.map((comment, index) => (
            <li key={index}>
              <BlogCommentItem comment={comment} 
              updateComments={updateComments} 
              filterBadWords={filterBadWords} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogComments;

