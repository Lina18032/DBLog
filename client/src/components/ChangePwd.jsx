import React, { useState } from "react";
import "../App.css";
import "./ChangePwd.css"
import { useEffect } from "react";
import {IconButton, InputAdornment , TextField} from '@mui/material';
import { GrFormViewHide, GrFormView } from "react-icons/gr";



const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const toggleOldPasswordVisibility = () => {
  setShowOldPassword(prev => !prev);
};

const toggleNewPasswordVisibility = () => {
  setShowNewPassword(prev => !prev);
};

const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(prev => !prev);
};


  // ✅ Always call hooks at the top level
  useEffect(() => {
    if (isOpen) {
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword
        }),
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Failed to change password.");
      } else {
        setSuccessMessage("Password changed successfully.");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while changing the password.");
    }
  };

  if (!isOpen) return null;


  return (
   <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contentt" onClick={(e) => e.stopPropagation()}>
       
        
<form onSubmit={handleSubmit}>
     <h2 className="text-xl font-bold mb-4 text-[#0058a1]">Change Password</h2>
<TextField
  type={showOldPassword ? "text" : "password"}
  name="oldPassword"
  size="small"
  placeholder="Old Password"
  variant="outlined"
  fullWidth
  margin="normal"
  value={formData.oldPassword}
  onChange={handleChange}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={toggleOldPasswordVisibility} edge="end">
          {showOldPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>

<TextField
  type={showNewPassword ? "text" : "password"}
  name="newPassword"
  placeholder="New Password"
  variant="outlined"
  fullWidth
  size="small"
  margin="normal"
  value={formData.newPassword}
  onChange={handleChange}
  required
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={toggleNewPasswordVisibility} edge="end">
          {showNewPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
        </IconButton>
      </InputAdornment>
    )
  }}
  className="input-fieldd"
/>

<TextField
  type={showConfirmPassword ? "text" : "password"}
  name="confirmPassword"
  size="small"
  placeholder="Confirm New Password"
  variant="outlined"
  fullWidth
  margin="normal"
  value={formData.confirmPassword}
  onChange={handleChange}
  required
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={setShowConfirmPassword} edge="end">
          {showConfirmPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
        </IconButton>
      </InputAdornment>
    )
  }}
  className="input-fieldd"
/>

  <br />
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
    <button
      type="button"
      className="form-button cancel"
      onClick={onClose}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="form-button save"
    >
      Save
    </button>
  </div>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
</form>

      </div>
    </div>  );
};

export default ChangePasswordModal;
