'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
export default function Realdata() {
    const [totalContractors, setTotalContractors] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalMess, setTotalMess] = useState(0);
    const [totalCharity, setTotalCharity] = useState(0);

    // useEffect(() => {
    //     const fetchData = () => {
    //         setTotalContractors(Math.floor(Math.random() * 100));
    //         setTotalStudents(Math.floor(Math.random() * 200));
    //         setTotalMess(Math.floor(Math.random() * 50));
    //         setTotalCharity(Math.floor(Math.random() * 30));
    //     };
    //     fetchData();
    //     const interval = setInterval(fetchData, 5000); 
    //     return () => clearInterval(interval);
    // }, []);

    const fetchData=async ()=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/home/getData`);
            const data = response.data;
            setTotalContractors(data.totalContractorsAssociated);
            setTotalStudents(data.totalStudentsAssociated);
            setTotalMess(data.totalMessAssociated);
            setTotalCharity(data.totalNgoAssociated);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(
        ()=>{
            fetchData();
        }
    )

    return (
        <>
        <Toaster />
            <div className="flex flex-wrap justify-center mb-3">
                {/* Total Contractors Box */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-6">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg">
                        <div className="p-10 flex flex-col justify-center items-center shadow-2xl hover:shadow-gray-400">
                            <h2 className="text-5xl font-bold text-center text-white mb-2">{totalContractors}</h2>
                            <h3 className="text-xl font-semibold text-center text-white">Total Contractors</h3>
                        </div>
                    </div>
                </div>

                {/* Total Students Box */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg">
                        <div className="p-10 flex flex-col justify-center items-center shadow-2xl hover:shadow-gray-400">
                            <h2 className="text-5xl font-bold text-center text-white mb-2">{totalStudents}</h2>
                            <h3 className="text-xl font-semibold text-center text-white">Total Students</h3>
                        </div>
                    </div>
                </div>

                {/* Total Mess Box */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-6">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg">
                        <div className="p-10 flex flex-col justify-center items-center shadow-2xl hover:shadow-gray-400">
                            <h2 className="text-5xl font-bold text-center text-white mb-2">{totalMess}</h2>
                            <h3 className="text-xl font-semibold text-center text-white">Total Mess</h3>
                        </div>
                    </div>
                </div>

                {/* Total Charity Box */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative shadow-lg">
                        <div className="p-10 flex flex-col justify-center items-center shadow-2xl hover:shadow-gray-400">
                            <h2 className="text-5xl font-bold text-center text-white mb-2">{totalCharity}</h2>
                            <h3 className="text-xl font-semibold text-center text-white">NGO&apos;s
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
