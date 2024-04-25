import PaymentPlansPage from './paymentPlans';
import Link from 'next/link';
import { Button } from 'antd'; // Assuming you're using Ant Design
import { EyeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Import icons from Ant Design

export default function Page() {
  return (
    <div>
      <div style={{ marginBottom: '50px', marginTop: '5px', marginLeft: '60px' }}> {/* Adjusted marginBottom */}
        <Link href="../client/invoice">
          <Button type="primary" icon={<EyeOutlined />} style={{ marginRight: '10px' }}>
            Invoices
          </Button>
        </Link>        
        <Button type="primary" icon={<UnorderedListOutlined />} style={{ width: '100px' }}>
          Previous Invoices
        </Button>
      </div>
      <div style={{ padding: '20px' }}> {/* Added padding */}
        <PaymentPlansPage />
      </div>
    </div>
  );
}
