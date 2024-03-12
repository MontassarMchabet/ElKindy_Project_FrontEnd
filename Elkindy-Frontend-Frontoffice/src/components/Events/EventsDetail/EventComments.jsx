import React from "react";
import BlogCommentItem from "./BlogCommentItem";

const BlogComments = () => {
  return (
    <div className="comment-wrap">
      <h2 className="title">
        281 <span>Comments</span>
      </h2>

      <div className="latest-comments">
        <ul className="list-wrap">
          <li>
            <BlogCommentItem
              item={{
                src: "/img/blog/comment_avatar01.png",
                author: "Lincoln Culhane",
                created_at: "March 17, 2023",
                comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown`,
              }}
            />
          </li>

          <li>
            <BlogCommentItem
              item={{
                src: "/img/blog/comment_avatar02.png",
                author: "Emerson Septimus",
                created_at: "March 17, 2023",
                comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown`,
              }}
            />

            <BlogCommentItem
              className={"children"}
              item={{
                src: "/img/blog/comment_avatar03.png",
                author: "Emerson Septimus",
                created_at: "March 17, 2023",
                comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown`,
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogComments;
