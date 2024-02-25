import React from "react";
import InnerBlogArea from "../../components/Blog/InnerBlogArea";
import BlogBreadcrumbArea from "../../components/BreadcrumbArea/BlogBreadcrumbArea";
import NewsLetterAreaTwo from "../../components/NewsLetter/NewsLetterAreaTwo";
import Layout from "../../layouts/Layout";

const BlogPage = () => {
  return (
    <Layout header={1} footer={3} className="" mainClassName="">
      <BlogBreadcrumbArea />
      <InnerBlogArea />
      <NewsLetterAreaTwo />
    </Layout>
  );
};

export default BlogPage;
