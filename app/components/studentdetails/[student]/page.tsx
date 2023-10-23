'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Student {
    id: number;
    name: string;
    email: string;
    address: string;
    zipcode: string;
    course: string;
    image: File | null;

}

// const studentProfileImageURL = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const studentDetails: React.FC = () => {

    const params = useParams()
    const studentId = params?.student
    const [student, setStudent] = useState<Student | null>(null);
    const router = useRouter()
    console.log(studentId);
    useEffect(() => {
        // Fetch data from the API using the studentId

        fetch(`/api/studentDetails/${studentId}`)

            .then(response => response.json())
            .then(student => {
                setStudent(student)
            })
            .catch(error => {
                // Handle the error
            });
    }, [studentId]);

    console.log(student);
    // Function to handle "Edit" button click
    const handleEditButtonClick = () => {

    };

    return (
        <div>
            <h1>Student Details</h1>
            {student && (
                <div className="container mx-auto p-4 mt-20 relative">
                    <h1 className="text-4xl mb-6 text-center font-bold hover:text-red-500 text-purple-800">Student<span className="bg-gradient-to-r font-black from-sky-400 via-purple-600 to-red-500 text-transparent bg-clip-text"> Detail</span></h1>
                    <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-blue-500">
                        {student.image && (
                            <img
                                src={URL.createObjectURL(student.image)}
                                alt="Student Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        )}
                    </div>

                    <table className="w-full table-auto border-collapse border border-blue-500" style={{ tableLayout: 'fixed', height: '150px' }}>
                        <thead>
                            <tr>
                                <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-left heading-name">Name</th>
                                <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-left heading-email">Email</th>
                                <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-left heading-address">Address</th>
                                <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-left heading-address">Zipcode</th>
                                <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-left heading-course">Course</th>
                                {/* <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-left heading-image">Image</th> */}
                                <th className="border border-blue-500 bg-blue-200 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-blue-500 px-4 py-2 text-left">{student.name}</td>
                                <td className="border border-blue-500 px-4 py-2 text-left">{student.email}</td>
                                <td className="border border-blue-500 px-4 py-2 text-left">{student.address}</td>
                                <td className="border border-blue-500 px-4 py-2 text-left">{student.zipcode}</td>
                                <td className="border border-blue-500 px-4 py-2 text-left">{student.course}</td>
                                <td className="text-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => router.push(`/components/editstudent/${studentId}`)}>
                                        Edit
                                    </button>

                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            )
            }
        </div >
    );
};

export default studentDetails;