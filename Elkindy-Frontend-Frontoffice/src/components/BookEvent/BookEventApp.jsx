
import Layout from '../../layouts/Layout';
import './indexStyle.css';
import RightPanel from './RightPanel';
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  return (

    <Layout header={4} footer={1}>
      
        <div className="book">
          
          <RightPanel />
        </div>
      
    </Layout>
  );
}

export default App;
