import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';

export default function SharingButtons() {
  return (
    <div className="flex space-x-4 items-center md:mb-8 md:justify-center">
      <div className="md:text-xl md:font-semibold ">Share this: </div>
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
