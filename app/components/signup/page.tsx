// components/signup/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import React, { FC, FormEvent, useState, useRef } from 'react';
import { useEffect } from 'react';

interface StudentSignupProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    address: string;
    zipcode: string;
    course: string;
    //image: File | null;
  }) => void;
}

const StudentSignup: FC<StudentSignupProps> = ({ onSubmit = () => {} }) => {
  
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    zipcode: '',
    course: '',
    //image: null as File | null,

  });



  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    zipcode: '',
    course: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let newValue = value;

    switch (id) {
      case 'name':
        newValue = value.replace(/[^a-zA-Z ]/g, '');
        break;
      case 'email':
        newValue = value;
        break;
      case 'password':
        // Update the password in the formData
        setFormData({ ...formData, password: value });
        newValue = value.slice(0, 5);
        break;
      case 'zipcode':
        newValue = value.slice(0, 6);
        break;
      default:
        break;
    }

    setFormData({ ...formData, [id]: newValue });

   
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { id, value } = e.target as HTMLInputElement;

    switch (id) {
      case 'password':
        if (value.length >= 5) {
          e.preventDefault();
        }
        break;
      case 'zipcode':
        if (value.length >= 6) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  
  //const [image, setImage] = useState<File | null>(null);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
    
  //   console.log('File:', file?.name);
    
  //   if (file) {
  //     console.log('Setting Image');
  //     setImage(file);
  //     setFormData(prevFormData => ({ ...prevFormData, image: file }));
  //   }
  // };
  

  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{1,5}$/;
    const zipcodeRegex = /^\d{6}$/;

    const newErrors = {
      name: '',
      email: '',
      password: '',
      address: '',
      zipcode: '',
      course: '',
    };

    if (!formData.name.match(nameRegex)) {
      newErrors.name = 'Name should only contain alphabets and spaces';
    }

    if (!formData.email.match(emailRegex)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.match(passwordRegex)) {
      newErrors.password = 'Password should be at most 5 characters long';
    }

    if (!formData.zipcode.match(zipcodeRegex)) {
      newErrors.zipcode = 'Zip code should be exactly 6 digits long';
    }

    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => error === '');

    if (isFormValid) {
      try {
        debugger;

        // Check if an image is selected
        // if (formData.image) {

        //   const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
        //   // Check image size (in bytes)
        //   if (formData.image.size > MAX_IMAGE_SIZE) {
        //     alert('Image size exceeds the limit.');
        //     return;  // Abort the submission if image size exceeds the limit
        //   }

        //   // Check image type
        //   if (!formData.image.type.startsWith('image/')) {
        //     alert('Invalid image type.');
        //     return;  // Abort the submission if image type is invalid
        //   }
      
        // }

        setFormData({...formData});
       // setFormData({...formData, image:image});
        console.log('FormData check:', formData);
        const response = await fetch('/api/studentRegistration', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
         
        });

        if (response.ok) {
          alert('Registration successful!');
          onSubmit(formData);
          router.push('/components/login');
        } else {
          const data = await response.json();
          alert(`Registration failed: ${data.error}`);
        }
      } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please try again later.');
      }
    } else {
      alert('Form contains errors. Please fix them.');
    }
  };


  return (
    <div className="flex flex-row mt-20 items-start justify-center min-h-screen background-color: #fff5e6;">
      <div
        className="container mx-auto p-6 border rounded-lg shadow-lg bg-gradient-to-r from-sky-300 via-purple-400 to-red-400 max-w-xl mb-6 mt-0"
        style={{ height: '550px', overflowY: 'scroll', scrollbarWidth: 'thin', scrollbarColor: 'purple red' }}
      >
        <h1 className="text-3xl mb-6 font-bold hover:text-red-600 text-purple-900">Signup</h1>
        <div style={{ height: '100%' }}>
          <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="name" className="mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={formData.name}
                onChange={handleInputChange}
              />
              <span className="text-red-500 text-sm">{errors.name}</span>
            </div>
            <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="email" className="mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className="text-red-500 text-sm">{errors.email}</span>
            </div>
            <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="password" className="mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <span className="text-red-500 text-sm">{errors.password}</span>
            </div>
            <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="address" className="mb-2">
                Address:
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="zipcode" className="mb-2">
                Zip Code:
              </label>
              <input
                type="text"
                id="zipcode"
                placeholder="Enter your zip code"
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                value={formData.zipcode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <span className="text-red-500 text-sm">{errors.zipcode}</span>
            </div>
            <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="course" className="mb-2">
                Course:
              </label>
              <select
                id="course"
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                required
                value={formData.course}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="C#">C#</option>
                <option value="ASP.NET">ASP.NET</option>
              </select>
              <span className="text-red-500 text-sm">{errors.course}</span>
            </div>
            {/* <div className="flex flex-col mb-4 col-span-1">
              <label htmlFor="image" className="mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange} // Ensure this is set to handleImageChange
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                ref={inputFileRef}
                style={{ width: '200%' }}
              />
            </div> */}
            <div className="text-center col-span-3">
              <button
                type="submit"
                className="bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 hover:text-white w-32 rounded-xl hover:shadow-halo transition-all"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
