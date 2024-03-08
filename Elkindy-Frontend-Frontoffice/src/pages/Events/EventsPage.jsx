import React from "react";
import InnerEventBlogArea from "../../components/Events/AllEvents/InnerEventBlogArea";
import EventBreadcrumbArea from "../../components/Events/AllEvents/BlogBreadcrumbArea";
import NewsLetterAreaTwo from "../../components/NewsLetter/NewsLetterAreaTwo";
import Layout from "../../layouts/Layout";
function EventsPage() {
  return (
    <Layout header={1} footer={3} className="" mainClassName="">
      <EventBreadcrumbArea />
      <InnerEventBlogArea />
      <NewsLetterAreaTwo />
    </Layout>
  )
}

export default EventsPage