import React from "react";

import Layout from "../../layouts/Layout";

import TeacherCreateMeeting from "../../components/TeacherCreateMeeting/TeacherCreateMeeting";

const TeacherCreateMeetings = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br />
            <br /><br />
            <TeacherCreateMeeting />
            <br /><br />
        </Layout>
    );
};

export default TeacherCreateMeetings;