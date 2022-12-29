import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function About() {
  const Navigation = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
    Navigation("/home")
 }
    }, []);

    return (
      <div>
        <p>Welcome to your Dashboard</p>
      </div>
    );
  };


export default About