import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdHome, MdEmail, MdPhone, MdPrint } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
        <div className="flex flex-wrap justify-around m-4">
          {/* Brand Section */}
          <div className="w-full md:w-1/4 mb-8">
            <h2 className="text-3xl font-bold mb-4">SARWAM</h2>
            <p className="mb-4">Connecting people with opportunities.</p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF size={20} />, link: "#" },
                // { icon: <FaTwitter size={20} />, link: "#" },
                { icon: <FaGoogle size={20} />, link: "#" },
                { icon: <FaInstagram size={20} />, link: "#" },
                { icon: <FaLinkedin size={20} />, link: "#" },
                { icon: <FaGithub size={20} />, link: "#" },
              ].map((item, index) => (
                <a key={index} href={item.link} className="text-gray-400 hover:text-gray-300 transition duration-200">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="w-full md:w-1/4 mb-8">
            <h6 className="text-lg font-semibold mb-4">Useful Links</h6>
            <ul className="space-y-2">
              {["Home", "Login", "Signup", "Help", "Dashboard"].map((link, index) => (
                <li key={index}>
                  <a href={`/${link.toLowerCase()}`} className="hover:text-orange-400 transition duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4 mb-8">
            <h6 className="text-lg font-semibold mb-4">Contact</h6>
            <div className="flex items-center mb-2">
              <MdHome className="mr-2" size={20} /> 
              <span>National Institute of Technology, Patna, Bihar</span>
            </div>
            <div className="flex items-center mb-2">
              <MdEmail className="mr-2" size={20} /> 
              <span>hellocollege143@gmail.com</span>
            </div>
            <div className="flex items-center mb-2">
              <MdPhone className="mr-2" size={20} /> 
              <span>+91 82942522xx</span>
            </div>
            <div className="flex items-center">
              <MdPrint className="mr-2" size={20} /> 
              <span>WhatsApp: +91 82942522xx</span>
            </div>
          </div>
   
      </div>
              <hr className='mx-7' />
      <div className="text-center py-4">
        <p className="text-sm">© 2024 Copyright: 
          <a href="" className="text-orange-400 font-bold hover:text-orange-300 transition duration-200"> Team Unity Squad</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
