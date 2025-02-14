import { useContext, useState } from 'react';

import DeliveryInfo from './DeliveryInfo';
import OrderTable from './OrderTable';
import Payment from './Payment';
import AuthContext from '../../contexts/AuthContext';

export default function CheckOut() {
  const { user } = useContext(AuthContext);

  const [sameAddresses, setSameAddresses] = useState(true);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    street: user.adress?.split(', ')[3] || '',
    houseNumber: user.adress?.split(', ')[4] || '',
    country: user.adress?.split(', ')[0] || '',
    city: user.adress?.split(', ')[1] || '',
    postalCode: user.adress?.split(', ')[2] || '',
    phoneNumber: 'soon',
    email: user.email,
    orderNotes: '',
    billingStreet: user.billingAdress?.split(', ')[3] || '',
    billingHouseNumber: user.billingAdress?.split(', ')[4] || '',
    billingCountry: user.billingAdress?.split(', ')[0] || '',
    billingCity: user.billingAdress?.split(', ')[1] || '',
    billingPostalCode: user.billingAdress?.split(', ')[2] || '',
  });

  return (
    <div className="mr-40 ml-40 mt-28 mb-28">
      <h1 className="text-primary mb-20 text-3xl font-medium">Check out</h1>
      <div className="flex gap-32">
        <div className="flex flex-col gap-32 w-3/5">
          <DeliveryInfo
            sameAddresses={sameAddresses}
            setSameAddresses={setSameAddresses}
            formData={formData}
            setFormData={setFormData}
          />
          <Payment formData={formData}/>
        </div>
        <OrderTable />
      </div>
    </div>
  );
}
