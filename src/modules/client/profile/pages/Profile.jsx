import { React, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  loaderStateFalse,
  loaderStateTrue,
} from "../../../../actions/allActions";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Utility from "../../../../utility/utility";
import { toast, Bounce } from "react-toastify";
import ProfileAddEdit from "../../../../utility/components/clients/ProfileAddEdit";
const baseUrL = process.env.REACT_APP_BASE_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;
const Profile = (props) => {
  const { loaderStateTrue, loaderStateFalse, userData } = props;
  const authToken = userData.token;
  const [profileData, setProfileData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    mobile: "",
    email: "",
    userName: "",
    gender: "",
    primaryHand: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    emergencyContactPhone: "",
    medicalConditions: "",
    allergies: "",
    avatar: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    lastName: "",
    mobile: "",
    email: "",
    userName: "",
    gender: "",
    primaryHand: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    emergencyContactPhone: "",
    medicalConditions: "",
    allergies: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/profile`, {
        headers: {
          Authorization: authToken,
        },
      });
      setFormData({
        name: response.data.data.name,
        lastName: response.data.data.lastName,
        mobile: response.data.data.mobile,
        email: response.data.data.email,
        userName: response.data.data.username,
        gender: response.data.data.gender,
        primaryHand: response.data.data.primaryHand,
        address: response.data.data.address,
        city: response.data.data.city,
        country: response.data.data.country,
        postalCode: response.data.data.postalCode,
        emergencyContactPhone: response.data.data.emergencyContactPhone,
        medicalConditions: response.data.data.medicalConditions,
        allergies: response.data.data.allergies,
        avatar: `${imageUrl}/${response.data.data.avatar}`
      })
      setProfileData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };


  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "name is required";
    }
    if (formData.lastName === "") {
      isValid = false;
      formDataErrorTemp.lastName = "lastName is required";
    }
    if (formData.mobile === "") {
      isValid = false;
      formDataErrorTemp.mobile = "mobile is required";
    }
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }
    if (formData.userName === "") {
      isValid = false;
      formDataErrorTemp.userName = "userName is required";
    }
    if (formData.address === "") {
      isValid = false;
      formDataErrorTemp.address = "address is required";
    }
    if (formData.city === "") {
      isValid = false;
      formDataErrorTemp.city = "city is required";
    }
    if (formData.country === "") {
      isValid = false;
      formDataErrorTemp.country = "country is required";
    }
    if (formData.postalCode === "") {
      isValid = false;
      formDataErrorTemp.postalCode = "postalCode is required";
    }
    if (formData.emergencyContactPhone === "") {
      isValid = false;
      formDataErrorTemp.emergencyContactPhone =
        "emergencyContactPhone is required";
    }
    if (formData.medicalConditions === "") {
      isValid = false;
      formDataErrorTemp.medicalConditions = "medicalConditions is required";
    }
    if (formData.allergies === "") {
      isValid = false;
      formDataErrorTemp.allergies = "allergies is required";
    }
    setFormDataError(formDataErrorTemp);
    return isValid;
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    formDataTemp[name] = value;
    if (name === "name") {
      if (value === "") {
        formDataErrorTemp.name = "name is required";
        formDataErrorTemp.name = "";
      }
    }
    if (name === "lastName") {
      if (value === "") {
        formDataErrorTemp.lastName = "lastName is required";
        formDataErrorTemp.lastName = "";
      }
    }
    if (name === "mobile") {
      if (value === "") {
        formDataErrorTemp.mobile = "mobile is required";
        formDataErrorTemp.mobile = "";
      }
    }
    if (name === "email") {
      if (value === "") {
        formDataErrorTemp.email = "Email is required";
        // } else if (!emailRegex.test(value)) {
        //   formDataErrorTemp.email = "Invalid email address";
        // } else {
        formDataErrorTemp.email = "";
      }
    }
    if (name === "userName") {
      if (value === "") {
        formDataErrorTemp.userName = "userName is required";
      } else {
        formDataErrorTemp.userName = "";
      }
    }
    if (name === "address") {
      if (value === "") {
        formDataErrorTemp.address = "address is required";
      } else {
        formDataErrorTemp.address = "";
      }
    }
    if (name === "city") {
      if (value === "") {
        formDataErrorTemp.city = "city is required";
      } else {
        formDataErrorTemp.city = "";
      }
    }
    if (name === "country") {
      if (value === "") {
        formDataErrorTemp.country = "country is required";
      } else {
        formDataErrorTemp.country = "";
      }
    }
    if (name === "postalCode") {
      if (value === "") {
        formDataErrorTemp.postalCode = "postalCode is required";
      } else {
        formDataErrorTemp.postalCode = "";
      }
    }
    if (name === "emergencyContactPhone") {
      if (value === "") {
        formDataErrorTemp.emergencyContactPhone =
          "emergencyContactPhone is required";
      } else {
        formDataErrorTemp.emergencyContactPhone = "";
      }
    }
    if (name === "medicalConditions") {
      if (value === "") {
        formDataErrorTemp.medicalConditions = "medicalConditions is required";
      } else {
        formDataErrorTemp.medicalConditions = "";
      }
    }
    if (name === "allergies") {
      if (value === "") {
        formDataErrorTemp.allergies = "allergies is required";
      } else {
        formDataErrorTemp.allergies = "";
      }
    }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  const [startDate, setStartDate] = useState(new Date());

  // Format the date as yyyy-mm-dd
  const startDateString = startDate.toISOString().split("T")[0];
  const [selectedGender, setSelectedGender] = useState("male");
  const genderValue = ["male", "female"];
  const [selectedHand, setSelectedHand]=useState("left")
  const handValue = ["right", "left"];

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLabel, setImageLabel] = useState("Choose Image");
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener('change', handleImageChange);
    }

    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.removeEventListener('change', handleImageChange);
      }
    };
  }, []);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
     setSelectedImage(URL.createObjectURL(imageFile));
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageLabel("Choose Image");
  };
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const formatData = () => {
    let allFormData = new FormData();
    allFormData.append("name", formData.name);
    allFormData.append("lastName", formData.lastName);
    allFormData.append("mobile", formData.mobile);
    allFormData.append("email", formData.email);
    allFormData.append("userName", formData.userName);
    allFormData.append("dateOfBirth", startDateString);
    allFormData.append("gender", selectedGender);
    allFormData.append("primaryHand", selectedHand);
    allFormData.append("address", formData.address);
    allFormData.append("city", formData.city);
    allFormData.append("country", formData.country);
    allFormData.append("postalCode", formData.postalCode);
    allFormData.append("emergencyContactPhone", formData.emergencyContactPhone);
    allFormData.append("medicalConditions", formData.medicalConditions);
    allFormData.append("allergies", formData.allergies);
    allFormData.append("avatar", selectedImage); 
    return allFormData;
};

  const handleSubmit = async () => {
    if (validateForm()) {
      // console.log(formatData());
      loaderStateTrue();
      try {
        let data = formatData();
        let url = `${baseUrL}/profile`;
        // console.log(data,"formatDatainTry")
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authToken,
          },
        });
        loaderStateFalse();
        closeModal();
        toast(`${response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchData()
      } catch (userResponse) {
        loaderStateFalse();
        console.log("errorCheck", userResponse.response.data.message);
        // Utility.toastNotifications(
        //   userResponse.response.data.message,
        //   "Error",
        //   "error"
        // );
        toast(`${userResponse.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };
  return (
    <div className="profile_holder_outer">
    <div className="profile_holder">
      <div className="profile_holder_name">
         <h3>{profileData.fullName}</h3>
      </div>
            <div className="card">
              <div className="card-body">
                  <div className="pro_pic">
                    <img
                      src={`${imageUrl}/${profileData.avatar}`}
                      alt="no image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="prof_details_part">
                    <div className="id_holder">
                    <div className="id_block">
                        <p className="small">Username</p>
                        <p className="profdt">{profileData.username}</p>
                      </div>
                      <div className="id_block">
                        <p className="small">Id</p>
                        <p className="profdt">{profileData.id}</p>
                      </div>
                      <div className="id_block">
                        <p className="small">Code</p>
                        <p className="profdt">{profileData.code}</p>
                      </div>
                      <div className="id_block">
                        <p className="small">Experience</p>
                        <p className="profdt">{profileData.experienceLevel}</p>
                      </div>
                    </div>
                    <div className="pro_btn_holder">
                      <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
               
              </div>
            </div>
        <ProfileAddEdit
          showModal={showModal}
          closeModal={closeModal}
          startDate={startDate}
          setStartDate={setStartDate}
          selectedHand={selectedHand}
          setSelectedHand={setSelectedHand}
          handValue={handValue}
          // selectedHand={selectedHand}
          // setSelectedHand={setSelectedHand}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          genderValue={genderValue}
          genderValue1={"male"}
          genderValue2={"female"}
          handValue1={"left"}
          handValue2={"right"}
          formData={formData}
          formDataError={formDataError}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          headerText={"Edit Profile"}
          submitButtonText={"Edit"}
          selectedImage={selectedImage}
          imageLabel={imageLabel}
          handleImageChange={handleImageChange}
          removeImage={removeImage}
          handleImageClick={handleImageClick}
        />

    </div>
    </div>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};
export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  Profile
);
// export default Profile
