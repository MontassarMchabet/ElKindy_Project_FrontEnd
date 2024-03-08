import React from "react";
import BrandAreaThree from "../../components/Brand/BrandAreaThree";
import BreadcrumbArea from "../../components/BreadcrumbArea/BreadcrumbArea";
import CommunityArea from "../../components/CommunityArea/CommunityArea";
import NewsLetterAreaTwo from "../../components/NewsLetter/NewsLetterAreaTwo";
import TeamAreaThree from "../../components/Team/TeamAreaThree";
import Layout from "../../layouts/Layout";

const TeamPage = () => {
  return (
    <Layout header={1} footer={3} className="" mainClassName="">
      <BreadcrumbArea
        title={"Our Team Members"}
        subtitle={"Team"}
        showShape={false}
        className={" breadcrumb-area-two pt-175"}
      />
      <CommunityArea />
      <TeamAreaThree />
      <NewsLetterAreaTwo />
      <BrandAreaThree />
    </Layout>
  );
};

export default TeamPage;
