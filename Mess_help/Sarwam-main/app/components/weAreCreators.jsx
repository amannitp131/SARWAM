import React from 'react';
import Image from 'next/image';
import aman from '../images/aman.jpg';
import akash from '../images/akash.jpg';
import Aashish from '../images/Aashish.jpg'
const CreatorCard = ({ imgSrc, name, Link,Linkedin }) => {
  return (
    <div className="creator-card">
      
      <Image src={imgSrc} alt={name} className="creator-img hover:scale-105" width={100} height={100} />
      <div className="card-content">
        <h3>{name}</h3>
        <a id='view' href={Linkedin} target='_blank'>{Link}</a>
      </div>
    </div>
  );
};

const Creator = () => {
  return (
    <div>
    {/* <h1 id='creator'>We Are Creators</h1> */}
    <div className="card-container flex flex-col md:flex-row justify-center items-center">
        
      <CreatorCard
        imgSrc={aman}
        name="Aman Mishra"
        Link="View Profile"
        Linkedin="https://www.linkedin.com/in/aman-mishra-837b9a27b"
      />
      <CreatorCard
        imgSrc={Aashish}
        name="Aashish Kumar Singh"
        Link="View Profile"
        Linkedin="https://www.linkedin.com/in/aashish-kumar-singh-7110b02a9"
      />
      <CreatorCard
        imgSrc={akash}
        name="Akash Chandra"
        Link="View Profile"
        Linkedin="https://www.linkedin.com/in/akash-chandra-98b194320/"
      /> 
    </div>
    </div>
  );
};

export default Creator;