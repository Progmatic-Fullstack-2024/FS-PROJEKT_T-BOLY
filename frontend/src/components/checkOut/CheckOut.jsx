import DeliveryInfo from './DeliveryInfo';
import OrderTable from './OrderTable';

export default function CheckOut() {
  
  return (
    <div className="mr-40 ml-40 mt-28 mb-28">
      <h1 className="text-primary mb-20 text-3xl font-medium">Check out</h1>
      <div className="flex gap-32">
        <div className="flex flex-col gap-32 w-3/5">
          <DeliveryInfo />
        </div>
        <OrderTable />
      </div>
    </div>
  );
}
