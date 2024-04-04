import React from "react";
import InnerEventBlogArea from "../../components/Events/AllEvents/InnerEventBlogArea";
import EventBreadcrumbArea from "../../components/Events/AllEvents/EventBreadcrumbArea";
import EventsAreaThree from "../../components/Events/AllEvents/InnerEventArea2";


import Layout from "../../layouts/Layout";

function EventsPage() {
  return (
    <Layout header={4} footer={1}>
      <EventsAreaThree />
      <EventBreadcrumbArea />
      <InnerEventBlogArea />
     
    </Layout>
  )
}

export default EventsPage