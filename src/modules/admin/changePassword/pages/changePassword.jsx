// import React, { useState } from "react";
// import axios from "axios";
// import {
//   loaderStateTrue,
//   loaderStateFalse,
// } from "../../../../actions/allActions";
// import { connect } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Utility from "../../../../utility/utility";
// import TextInput from "../../../../utility/components/TextInput";
// import Button from "../../../../utility/components/Button";
// import x_twitter from "../../../../utility/assets/images/x_twitter.png";

// const baseUrL = process.env.REACT_APP_BASE_URL;
// console.log(baseUrL);

// const ChangePassword = (props) => {
//     const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcxMDI5OTA2Nn0.ajjuiYg18vdqattcL3Dfq0CpybF-w0Kx9RwiBJkUZAE`;
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     // email: "",
//     currentPassword:"",
//     password: "",
//     confirmPassword:""
//   });

//   const [formDataError, setFormDataError] = useState({
//     // email: "",
//     currentPassword:"",
//     password: "",
//     confirmPassword:""
//   });

//   const { loaderStateFalse } = props;

//   const validateForm = () => {
//     let isValid = true;
//     let formDataErrorTemp = Object.assign({}, formDataError);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     console.log("check function");
//     // if (formData.email === "") {
//     //   isValid = false;
//     //   formDataErrorTemp.email = "Email is required";
//     // }
//     if (formData.password === "") {
//         isValid = false;
//         formDataErrorTemp.password = "Password is required";
//       }
//       if (formData.currentPassword === "") {
//         isValid = false;
//         formDataErrorTemp.currentPassword = "Password is required";
//       }
//       if (formData.confirmPassword === "") {
//         isValid = false;
//         formDataErrorTemp.confirmPassword = "Password is required";
//       }
//     setFormDataError(formDataErrorTemp);
//     return isValid;
//   };

//   const handleInputChange = (e) => {
//     console.log("e--------------->", e.target);
//     let { name, value } = e.target;
//     let formDataTemp = Object.assign({}, formData);
//     let formDataErrorTemp = Object.assign({}, formDataError);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     formDataTemp[name] = value;
//     // if (name === "email") {
//     //   if (value === "") {
//     //     formDataErrorTemp.email = "Email is required";
//     //     // } else if (!emailRegex.test(value)) {
//     //     //   formDataErrorTemp.email = "Invalid email address";
//     //     // } else {
//     //     formDataErrorTemp.email = "";
//     //   }
//     // }
//     if (name === "password") {
//       if (value === "") {
//         formDataErrorTemp.password = "Password is required";
//       } else {
//         formDataErrorTemp.password = "";
//       }
//     }
//     if (name === "currentPassword") {
//         if (value === "") {
//           formDataErrorTemp.password = "currentPassword is required";
//         } else {
//           formDataErrorTemp.password = "";
//         }
//       }
//       if (name === "confirmPassword") {
//         if (value === "") {
//           formDataErrorTemp.password = "confirmPassword is required";
//         } else {
//           formDataErrorTemp.password = "";
//         }
//       }
//     console.log("formdata===>", formData);
//     setFormData(formDataTemp);
//     setFormDataError(formDataErrorTemp);
//   };

//   const formatData = () => {
//     let data = {};
//     // data["email"] = formData.email;
//     data["password"] = formData.password;
//     data["currentPassword"] = formData.currentPassword;
//     data["confirmPassword"] = formData.confirmPassword;
//     return data;
//   };
//   //const formString = JSON.stringify(formatData)

// //   const handleSubmit = async () => {
// //     const { loaderStateTrue, loaderStateFalse } = props;
// //     if (validateForm()) {
// //       console.log(formatData());
// //       loaderStateTrue();
// //       try {
// //         let data = formatData();
// //         const response = await axios({
// //           method: "post",
// //           url: `${baseUrL}/admin/change-password`,
// //           data: data,
// //         });
// //         setFormData({
// //         //   email: "",
// //           password: "",
// //           currentPassword: "",
// //           confirmPassword:""
// //         });
// //         loaderStateFalse();
// //         navigate("/login");
// //         localStorage.setItem("login", true);
// //         console.log(`response check ${response}`);
// //       } catch (userResponse) {
// //         console.log(
// //           "error in post",
// //           userResponse.response.data.data.email.message
// //         );
// //         loaderStateFalse();
// //         Utility.toastNotifications(
// //           userResponse.response.data.data.email.message,
// //           "Error",
// //           "error"
// //         );
// //       }
// //     }
// //   };
// const handleSubmit = async () => {
//     const { loaderStateTrue, loaderStateFalse } = props;
//     if (validateForm()) {
//       console.log(formatData());
//       loaderStateTrue();
//       try {
//         let data = formatData();
//         const response = await axios.post(
//           `${baseUrL}/admin/change-password`,
//           data,
//           {
//             headers: {
//               Authorization: authToken,
//             },
//           }
//         );
//         setFormData({
//           password: "",
//           currentPassword: "",
//           confirmPassword: "",
//         });
//         loaderStateFalse();
//         console.log(`response check`, response);
//         navigate('/admin/dashboard');
//       } catch (userResponse) {
//         loaderStateFalse();
//         Utility.toastNotifications(
//           userResponse.response.data.data.message,
//           "Error",
//           "error"
//         );
//       }
//     }
//   };
  

//   return (
//     <>
//       <section className="login_sec padding_100">
//         <div className="container">
//           <div className="login_innr">
//             {/* <div className="login_tab_list">
//               <ul>
//                 <li>
//                   <a
//                     href="javascript:void(0);"
//                     className="active"
//                     data-id="loginTab1"
//                   >
//                     Login
//                   </a>
//                 </li>
//               </ul>
//             </div> */}
//             <div className="login_tab_panel">
//               <div className="login_tab_box show" id="loginTab1">
//                 <div className="login_form">
//                   {/* <div className="login_input">
//                     <TextInput
//                       type="text"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       label="Email:"
//                       error={formDataError.email}
//                     />
//                   </div> */}
//                   <div className="login_input">
//                       <TextInput
//                         type="Password"
//                         name="currentPassword"
//                         value={formData.currentPassword}
//                         onChange={handleInputChange}
//                         label="Current Password:"
//                         error={formDataError.currentPassword}
//                       />
//                     </div>
//                   <div className="login_input">
//                       <TextInput
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         label="New Password:"
//                         error={formDataError.password}
//                       />
//                     </div>
//                     <div className="login_input">
//                       <TextInput
//                         type="Password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         label="Confirm Password:"
//                         error={formDataError.confirmPassword}
//                       />
//                     </div>
//                   <div className="login_form_row">
//                   </div>
//                   <div
//                     className="login_submit"
//                     style={{ display: "flex", justifyContent: "center" }}
//                   >
//                     {/* <input onClick={handleSubmit} type="submit" value="Login" /> */}
//                     <Button onClick={handleSubmit}>Submit</Button>
//                   </div>

                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// const mapStateToProps = (globalState) => {
//   return {};
// };

// export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
//   ChangePassword
// );
