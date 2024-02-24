import React from "react";

const BlogCommentForm = () => {
  return (
    <div className="post-comments-form">
      <div className="post-comments-title">
        <h2 className="title">I Leave Your Comment</h2>
      </div>

      <div className="comment-form">
        <form action="#">
          <div className="row">
            <div className="col-md-6">
              <div className="form-grp">
                <input type="text" placeholder="Name" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-grp">
                <input type="email" placeholder="Email" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-grp">
                <input type="text" placeholder="Your Number" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-grp">
                <input type="text" placeholder="Subject" />
              </div>
            </div>
          </div>

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

export default BlogCommentForm;
