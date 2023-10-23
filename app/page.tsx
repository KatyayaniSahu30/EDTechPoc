import React from 'react';
import './components/home/home_page.css';  // Import your CSS file

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <main className="main-content">
      <h2 className=" section-heading text-4xl mb-6  font-bold hover:text-red-500 text-purple-800">Welcome to the Edtech Platform!</h2>       
        <div className="text-content">
          <p>Here, administrators have the ability to oversee all student records, perform essential CRUD (Create, Read, Update, Delete) operations, and manage student data seamlessly.</p>
          <p>For administrators, the platform provides a comprehensive dashboard that allows them to view, add, modify, and remove student information. It's a centralized hub to streamline administrative tasks and ensure efficient management of student records.</p>
          <p>On the other hand, students can access their personalized profiles upon login. This profile displays their individual details, course information. It's a convenient way for students to keep track of their educational journey.</p>
        </div>
      </main>
     
    </div>
  );
};

export default HomePage;
