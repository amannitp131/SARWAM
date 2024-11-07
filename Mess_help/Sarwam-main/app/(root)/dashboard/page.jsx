'use client';
import React, { useEffect, useState, useContext } from 'react';
import ProtectedRoute from '../../components/protectedRoute';
import { UserContext } from '../context/user.context';
import Navbar from '../../components/navbar';
import Modal from './modal';
import { useRouter } from 'next/navigation';
import Studash from './components/studash'
const Dashboard = () => {
  const [authenticated] = useContext(UserContext);
  const [isVerified, setIsVerified] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState();
  const router = useRouter();

  const [id,setid]=useState(authenticated?.user?.id ||'');
  const [username,setusername]=useState(authenticated?.user?.username||'');
  const [hostel, setHostel] = useState(authenticated?.user?.hostelName || '');
  const [roomNo, setRoomNo] = useState(authenticated?.user?.roomNo || '');
  const [rollNo, setRollNo] = useState(authenticated?.user?.rollNo || '');
  // const [isVerified,setIsVerified]=useState(authenticated?.user?.isVerified||'');
  const [email,setemail]=useState(authenticated?.user?.email||'');
  const [college,setcollege]=useState(authenticated?.user?.college||'');
  const [coupon, setCoupon] = useState('');
const userdetails={}
  useEffect(() => {
    setType(authenticated?.user?.type);
    setIsVerified(authenticated?.user?.isVerified);
  }, [authenticated]);

  useEffect(() => {
    if (authenticated?.user?.username) {
      if (authenticated?.user?.isVerified) {
        setModalMessage(`${authenticated?.user?.username}, your account is verified!`);
      } else {
        setModalMessage(`After Registration ${authenticated?.user?.username},You need to wait for some time ,and after verification, The dashboard will be similar to this one having all the functionality.`);
      }
      setShowModal(true);
    }
  }, [authenticated?.user]);

  const handleClose = () => {
    setShowModal(false);
    // router.push('/'); 
  };
  useEffect(() => {
    // document.body.style.backdropFilter = 'blur(10px)';
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 1)'; 
    document.body.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
    return () => {
      document.body.style.backdropFilter = '';
      document.body.style.backgroundColor = '';
      document.body.style.boxShadow = "";
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="glass-dashboard-background bg-slate-300">
        <Navbar />
        {showModal && <Modal message={modalMessage} onClose={handleClose} isVerified={isVerified} />}
        <Studash id={id} username={username} hostel={hostel} rollNo={rollNo} isVerified={isVerified} email={email} college={college} coupon={coupon} />
        {/* {
          console.log(id,username,hostel,roomNo,rollNo,email,college,coupon)
        } */}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
