import React from "react";
import BlogDetails from "../../Blog/BlogDetails/BlogDetails";
import NewsLetterAreaTwo from "../../NewsLetter/NewsLetterAreaTwo";
import Layout from "../../../layouts/Layout";

const BlogDetailsPage = () => {
  return (
    <Layout header={1} footer={3} className="" mainClassName="">
      <BlogDetails />
      <NewsLetterAreaTwo />
    </Layout>
  );
};

export default BlogDetailsPage;
