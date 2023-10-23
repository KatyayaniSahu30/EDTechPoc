// Import the necessary dependencies
'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
//import { useRouter } from 'next/router';
import { NextPage } from 'next';


interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  zipcode: string;
  course: string;
}

interface Props {
  onUpdateStudent: (student: Student) => void;
}

const EditStudent: NextPage<Props> = ({ onUpdateStudent }) => {
  const params = useParams();
  const router = useRouter();
  // const  studentId  = 9;
  const studentId = params?.student;

  const [student, setStudent] = useState<Student>({
    id: 0,
    name: '',
    email: '',
    address: '',
    zipcode: '',
    course: '',
  });

  console.log('params:', params);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/studentDetails/${studentId}`);
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  // const context = params?.context;
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateEndpoint = `/api/studentUpdate`;

    try {
      const response = await fetch(updateEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: student.id,
          name: student.name,
          address: student.address,
          zipcode: student.zipcode,
          course: student.course,
        }),
      });

      if (response.ok) {
      window.alert('Student updated successfully!');
      router.back();

      debugger;
        // Navigate to the appropriate page based on the current URL
        // if (window.location.pathname.includes('/components/admindashboard/student')) {
        //   router.push(`/components/admindashboard/student`);
        // } else {
        //   router.push(`/components/studentdetails/${student.id}`);
        // }

      } else {
        window.alert('Failed to update student');
        // console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen background-color: #fff5e6;">
      <h1 className="text-4xl mb-6 text-center font-bold hover:text-red-500 text-purple-800">Edit Student</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg bg-gradient-to-r from-sky-300 via-purple-400 to-red-400 w-4/12" onSubmit={handleUpdate} style={{ padding: '1rem' }}>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={student.name}
            onChange={(event) => setStudent({ ...student, name: event.target.value })}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={student.email}
            readOnly
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="address" className="mb-2">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            value={student.address}
            onChange={(event) => setStudent({ ...student, address: event.target.value })}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="zipCode" className="mb-2">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            placeholder="Enter your zip code"
            value={student.zipcode}
            onChange={(event) => setStudent({ ...student, zipcode: event.target.value })}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="course" className="mb-2">Course:</label>
          <input
            type="text"
            id="course"
            placeholder="Enter your course"
            value={student.course}
            onChange={(event) => setStudent({ ...student, course: event.target.value })}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          />
        </div>
        <div className="text-center col-span-2">
          <button
            type="submit"
            onClick={handleUpdate}
            className="bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 w-32"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;


