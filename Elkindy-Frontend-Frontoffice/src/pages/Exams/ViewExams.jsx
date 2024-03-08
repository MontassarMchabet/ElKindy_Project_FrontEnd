
import Layout from "../../layouts/Layout";

import BlogSectors from "../../components/Blog/BlogSidebar/BlogSectors";
import ExamArea from "../../components/Exam/ExamArea";
import ExamBody from "../../components/Exam/ExamBody";


const ViewExam = () => {
  return (
    <Layout header={1} footer={1} className="" mainClassName="">
      <ExamBody />
    </Layout>
  );
};

export default ViewExam;