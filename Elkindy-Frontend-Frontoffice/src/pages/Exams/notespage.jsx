import React from "react";
import Layout from "../../layouts/Layout";
import NotesArea from "../../components/ExamsArea/DisplayNotes";

const NotesPage = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br /><br /><br />
            <NotesArea />
            <br /><br /><br /><br /><br /><br />
        </Layout>
    );
};

export default NotesPage;