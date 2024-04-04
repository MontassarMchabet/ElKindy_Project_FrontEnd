import React from "react";
import cn from "classnames";

const BlogCommentItem = ({ item, className }) => {
  return (
    <div className={cn("comments-box", className)}>
      <div className="comments-avatar">
        <img src={item.src} alt="" />
      </div>

      <div className="comment-text">
        <h4 className="title">{item.author}</h4>

        <span>
          <i className="fal fa-calendar-alt"></i>
          
          {new Date(item.created_at).toLocaleString('tn-TN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        })}
        </span>

        <p>{item.comment}</p>

        <a href="#" className="comment-reply-link">
          <i className="fal fa-reply"></i>Reply
        </a>
      </div>
    </div>
  );
};

export default BlogCommentItem;
