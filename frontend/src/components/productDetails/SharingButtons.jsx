import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';

export default function SharingButtons() {
  return (
    <div className="flex space-x-4 items-center ">
      <div className="md:font-semibold ">Share this: </div>
      <div className="text-gray-500 hover:text-primary">
        <FaInstagram size={24} />
      </div>
      <div className="text-gray-500 hover:text-primary">
        <FaTwitter size={24} />
      </div>
      <div className="text-gray-500 hover:text-primary">
        <FaFacebook size={24} />
      </div>
      <div className="text-gray-500 hover:text-primary">
        <FaPinterest size={24} />
      </div>
    </div>
  );
}
