import React from "react";
import Layout from "../../layouts/Layout";
import ExamsArea from "../../components/ExamsArea/ExamsArea";
import FormQuiz from "../../components/ExamsArea/AddQuiz";
const AddQuizsComponent = () => {
    return (
        
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Content */}
                <div style={{ marginTop: '290px', flex: 1 }}> {/* Adjust marginTop to match your header height */}
                    <FormQuiz />
                </div>

               
            </div>
       
    );
};

export default AddQuizsComponent;