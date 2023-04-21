import React, { useState } from "react";
import "./adminPage.scss";
import { AnnouncementApi } from "../../api/api";
import Popup from "../../components/Popup/Popup";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [messageHeader, setMessageHeader] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    const form = document.getElementById("announcement-form");
    const token = localStorage.getItem("token");
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(form);
    AnnouncementApi.newAnnouncement(formData, token)
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
        setMessageHeader(res.data.header);
        setTimeout(() => {
          setMessage("");
        }, 6000);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="admin_page">
      {message && <p>{message}</p>}
      <Popup
        hidden={!message}
        header={messageHeader}
        content={message}
        setMessage={setMessage}
      />
      {loading && (
        <div className="overlay-loading">
          <div className="spinner"></div>
        </div>
      )}
      <form id="announcement-form" onSubmit={submitHandler} method="POST">
        <h3>New announcement form</h3>
        <div className="form--group">
          <label htmlFor="title">Title:</label>
          <input required type="text" id="title" name="title" />
        </div>
        <div className="form--group">
          <label htmlFor="location">Location:</label>
          <input required type="text" id="location" name="location" />
        </div>
        <div className="form--group">
          <label htmlFor="slaapkamers">Slaapkamers:</label>
          <input required type="number" id="slaapkamers" name="slaapkamers" />
        </div>
        <div className="form--group">
          <label htmlFor="badkamers">Badkamers:</label>
          <input required type="number" id="badkamers" name="badkamers" />
        </div>
        <div className="form--group">
          <label htmlFor="price">Price:</label>
          <input required type="number" id="price" name="price" />
        </div>
        <div className="form--group">
          <label htmlFor="photo">Photo:</label>
          <input
            required
            className="custom-file-input"
            type="file"
            id="photo"
            name="photo"
          />
        </div>

        <div className="form--group">
          <label htmlFor="type">Type:</label>
          <select name="type" id="type">
            <option value="TOWNHOUSE">TownHouse</option>
            <option value="VILLA">Villa</option>
            <option value="APPARTMENT">Appartment</option>
          </select>
        </div>

        <button type="submit">Create Announcement</button>
      </form>
    </div>
  );
};

export default AdminPage;
