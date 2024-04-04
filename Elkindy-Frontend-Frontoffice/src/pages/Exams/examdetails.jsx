import React, { useState, useEffect } from 'react';
import BlogDetails from "../../components/Blog/BlogDetails/BlogDetails";
import NewsLetterAreaTwo from "../../components/NewsLetter/NewsLetterAreaTwo";
import Layout from "../../layouts/Layout";
import ExamDet from "../../components/ExamsArea/ExamDet";
import { useParams } from 'react-router-dom';

const ExamDetailsPage = () => {

  return (
      <Layout header={4} footer={3} className="" mainClassName="">
          <ExamDet />
          
      </Layout>
  );
};

export default ExamDetailsPage;
