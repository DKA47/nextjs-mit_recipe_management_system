import PaymentPlansPage from './paymentPlans';
import { Button } from 'antd'; // Assuming you're using Ant Design
import { EyeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Import icons from Ant Design

export default function Page() {
  return (
    <div>
      <div style={{ marginBottom: '50px', marginTop: '5px', marginLeft: '60px' }}> {/* Adjusted marginBottom */}
        <Button type="primary" icon={<EyeOutlined />} style={{ marginRight: '10px' }}>
          Active 
        </Button>
        <Button type="primary" icon={<UnorderedListOutlined />}  style={{ width: '100px' }}>
          All 
        </Button>
      </div>
      <div style={{ padding: '20px' }}> {/* Added padding */}
        <PaymentPlansPage />
      </div>
    </div>
  );
}
