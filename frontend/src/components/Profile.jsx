import React, { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = "http://localhost:5000" ;
const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    // Fetch user details
    axios.get(`${BACKEND_URL}/api/user/me`).then(res => setUser(res.data.user));
  }, []);

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put("/api/user/edit-profile", user);
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
