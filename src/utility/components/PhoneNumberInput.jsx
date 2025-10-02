import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({value, onChange, error, className}) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [error, setError] = useState("");

//   const handlePhoneNumberChange = (value) => {
//     console.log("Phone number with country code:", value);
//     setPhoneNumber(value);

//     const digitsOnly = value.replace(/[^0-9]/g, "");
//     if (digitsOnly.length === 0) {
//       setError("Phone number is required");
//     } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
//       setError("Please enter a valid phone number (10-15 digits)");
//     } else {
//       setError("");
//     }
//   };

  return (
    <div className="inp_block">
      <PhoneInput
        country={"il"} // Default country: Israel (+972)
        value={value}
        onChange={onChange}
        placeholder="Enter phone number"
        inputStyle={{
          width: "100%",
        //   padding: "10px",
          paddingLeft: "45px",
        //   border: error ? "1px solid red" : "1px solid #ccc",
        }}
        className={`${className} text-input ${
            error && error !== "" ? "errorborder" : ""
          }`}
        countryCodeEditable={false} // Prevent users from changing country code manually
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
};

export default PhoneNumberInput;
