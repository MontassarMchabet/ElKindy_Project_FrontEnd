import React from "react";

const EventCommentForm = () => {
  return (
    <div className="post-comments-form">
      <div className="post-comments-title">
        <h2 className="title">Leave Your Comment</h2>
      </div>

      <div className="comment-form">
        <form action="#">
          

          <div className="form-grp">
            <textarea
              name="message"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Send Message <span></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCommentForm;
