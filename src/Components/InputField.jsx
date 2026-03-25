import React, { useState } from "react";
import styles from "../styles.module.css";

const InputField = ({ label, required, type = "text", placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

   return (
    <div className="formContainer">
      {/* Email */}
      <div className="fieldContainer">
        <label className="fieldLabel">
          Email Address <span className="required">*</span>
        </label>
        <input
          type="text"
          value="Ahmed124@Innovative.Com"
          className="field-input"
        />
      </div>

      {/* Password */}
      <div className="fieldContainer">
        <label className="fieldLabel">
          Password <span className="required">*</span>
        </label>

        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            value="********"
            className="fieldInput"
          />
          <span
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputField;
