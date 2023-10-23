'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  zipcode: string;
  course: string;
  image: File | null;
}

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API using a GET request
    fetch('/api/studentAdminDetails')
      .then(response => response.json())
      .then((data: Student[]) => {
        console.log('Fetched student data:', data);
        setStudents(data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);
  
  const handleCreate = () => {
    router.push('../signup');
  };

  const handleUpdate = (id: number) => {
    router.push(`/components/editstudent/${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Do you want to delete data?');

    if (confirmDelete) {
      fetch(`/api/studentDelete/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
          } else {
            console.error('Failed to delete student');
          }
        })
        .catch(error => {
          console.error('Error deleting student:', error);
        });
    }
  };

  if (!Array.isArray(students)) {
    return null; 
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl hover:shadow-halo transition-all mb-4 mt-10"
      >
        Add Student
      </button>
      <table className="w-full table-auto border-collapse border border-green-800">
        <thead>
          <tr>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-left">ID</th>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-left">Name</th>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-left">Email</th>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-left">Address</th>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-left">Zip Code</th>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-left">Course</th>
            <th className="border border-green-800 bg-green-200 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="hover:bg-green-100">
              <td className="border border-green-800 px-4 py-2 text-left">{student.id}</td>
              <td className="border border-green-800 px-4 py-2 text-left">{student.name}</td>
              <td className="border border-green-800 px-4 py-2 text-left">{student.email}</td>
              <td className="border border-green-800 px-4 py-2 text-left">{student.address}</td>
              <td className="border border-green-800 px-4 py-2 text-left">{student.zipcode}</td>
              <td className="border border-green-800 px-4 py-2 text-left">{student.course}</td>
              <td className="border border-green-800 px-4 py-2 text-center">
                <button
                  onClick={() => handleUpdate(student.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-xl hover:shadow-halo transition-all mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-xl hover:shadow-halo transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
