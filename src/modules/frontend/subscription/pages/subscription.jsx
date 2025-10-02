import i18n from "../../../../i18n.js";
import React, { useEffect } from "react";
import { useState } from "react";
import Utility from "../../../../utility/utility";
import { toast, Bounce } from "react-toastify";
import ClientAddEdit from "../../../../utility/components/ClientAddEdit";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import pricing_ban from "../../../../utility/assets/images/pricing_ban.jpg";
import { withNamespaces } from "react-i18next";
import { P, HeaderOne, HeaderTwo, HeaderThree, HeaderFour, HeaderFive, HeaderSix } from "../../../../utility/components/Typography.jsx";
const baseUrL = process.env.REACT_APP_BASE_URL;

const Subscription = (props) => {
  const { loaderStateTrue, loaderStateFalse, t } = props;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      email: "",
      subscriptionId: {},
      name: "",
      numberOfUsers: "",
      numberOfProUsers: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      username: "",
      slug: "",
      password: "",
      confirmPassword: "",
      allegies: "",
      notes: ""
    });
    setFormDataError({
      name: "",
      email: "",
      subscriptionId: {},
      numberOfUsers: "",
      numberOfProUsers: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      username: "",
      slug: "",
      password: "",
      confirmPassword: "",
      allegies: "",
      notes: ""
    });
  };

  const [clientAddEditModalProps, setClientAddEditModalProps] = useState({});
  const addSubscription = (res) => {
    // let passowrd = generateRandomPassword(12);
    // formData.password = passowrd;
    // formData.confirmPassword = passowrd;
    let formDataTemp = { ...formData };
    if (res) {
      let signleSubscription = {
        label: res.name,
        value: res.id,
        numberOfUsers: res.numberOfUsers,
        price: res.price,
      };
      formDataTemp["subscriptionId"] = signleSubscription;
    }
    setFormData(formDataTemp);
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "register";
    clientAddEditModalPropsTemp["headerText"] = `Subscription:${res?.name}`;
    clientAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setShowModal(true);
  };

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [pricingData, setPricingData] = useState([]);
  useEffect(() => {
    getSubscriptionData();
  }, []);
  const getSubscriptionData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/subscriptions`);
      setSubscriptionData(response.data.data);
      if (response.data.success) {
        if (response.data.data.length > 0) {
          let subscriptionArr = [];
          response.data.data.map((item, index) => {
            let _hash = {};
            _hash["label"] = item.name;
            _hash["value"] = item.id;
            _hash["numberOfUsers"] = item.numberOfUsers;
            subscriptionArr.push(_hash);
          });
          setPricingData(subscriptionArr);
        }
      }
    } catch (error) {
      console.error("Error fetching data:");
    }
  };

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    subscriptionId: {},
    name: "",
    numberOfUsers: "",
    numberOfProUsers: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    username: "",
    slug: "",
    password: "",
    confirmPassword: "",
    allegies: "",
    notes: ""
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    email: "",
    subscriptionId: {},
    numberOfUsers: "",
    numberOfProUsers: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    username: "",
    slug: "",
    password: "",
    confirmPassword: "",
    allegies: "",
    notes: ""
  });

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }

    // if (formData.subscriptionId === "") {
    //   isValid = false;
    //   formDataErrorTemp.subscriptionId = "Subscription is required";
    // }

    // if (formData.slug === "") {
    //   isValid = false;
    //   formDataErrorTemp.slug = "Slug is required";
    // }

    if (formData.username === "") {
      isValid = false;
      formDataErrorTemp.username = "Username is required";
    }

    if (formData.password === "") {
      isValid = false;
      formDataErrorTemp.password = "Password is required";
    } else if (formData.password.length < 8) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain more than 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one capital letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one special character";
    } else if (!/[0-9]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one numeric value";
    } else {
      formDataErrorTemp.password = "";
    }

    if (formData.confirmPassword === "") {
      isValid = false;
      formDataErrorTemp.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      isValid = false;
      formDataErrorTemp.confirmPassword = "Passwords do not match";
    } else {
      formDataErrorTemp.confirmPassword = "";
    }

    if (formData.phoneNumber === "") {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Please provide valid Phone Number";
    }

    // if (formData.address === "") {
    //   isValid = false;
    //   formDataErrorTemp.address = "address is required";
    // }

    // if (formData.city === "") {
    //   isValid = false;
    //   formDataErrorTemp.city = "city is required";
    // }

    if (formData.postalCode === null || formData.postalCode === "") {
      // If postal code is null or an empty string, clear the error
      formDataErrorTemp.postalCode = "";
    } else {
      // Check if the postal code is numeric
      if (!/^\d+$/.test(formData.postalCode)) {
        isValid = false;
        formDataErrorTemp.postalCode = "Postal Code must be numeric";
      }
      // Check if the postal code consists of exactly 7 digits
      else if (formData.postalCode.length !== 7) {
        isValid = false;
        formDataErrorTemp.postalCode = "Postal Code must consist of exactly 7 digits";
      }
      // If everything is valid
      else {
        formDataErrorTemp.postalCode = "";
      }
    }
    // if (formData.country === "") {
    //   isValid = false;
    //   formDataErrorTemp.country = "country is required";
    // }
    if (formData.numberOfUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfUsers = "Number of Parallel user is required";
    } else if (!/^[1-9]\d*$/.test(formData.numberOfUsers)) {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Please provide valid  Parrelel User Name";
    }

    if (formData.numberOfProUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfProUsers = "Number of Pro user is required";
    } else if (!/^[1-9]\d*$/.test(formData.numberOfProUsers)) {
      isValid = false;
      formDataErrorTemp.numberOfProUsers =
        "Please provide valid  Pro User Name";
    }
    if (/[0-9\W_]/.test(formData.city)) {
      isValid = false;
      formDataErrorTemp.city = "City name is invalid";
    } else {
      formDataErrorTemp.city = "";
    }

    if (/[0-9\W_]/.test(formData.country)) {
      isValid = false;
      formDataErrorTemp.country = "Country name is invalid";
    } else {
      formDataErrorTemp.country = "";
    }

    // if (
    //   !/^\d{10}$/.test(formData.emergencyContactPhone) &&
    //   formData.emergencyContactPhone !== ""
    // ) {
    //   isValid = false;
    //   console.log("emergencyContactPhone")
    //   formDataErrorTemp.emergencyContactPhone =
    //     "Please provide valid Emergency Contact Number";
    // } else {
    //   formDataErrorTemp.emergencyContactPhone = "";
    // }
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
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else {
        formDataTemp.slug = generateSlug(value);
        formDataErrorTemp.name = "";
        formDataErrorTemp.slug = "";
      }
    }

    if (name === "email") {
      if (value == "") {
        formDataErrorTemp.email = "Email is required";
      } else if (!emailRegex.test(value)) {
        formDataErrorTemp.email = "Invalid email address";
      } else {
        formDataErrorTemp.email = "";
      }
    }
    if (name === "subscriptionId") {
      if (value == "") {
        formDataErrorTemp.subscriptionId = "subscriptionId is required";
      } else {
        formDataErrorTemp.subscriptionId = "";
      }
    }

    if (name === "username") {
      if (value == "") {
        formDataErrorTemp.username = "username is required";
      } else {
        formDataErrorTemp.username = "";
      }
    }

    /* if (name === "slug") {
      if (value == "") {
        formDataErrorTemp.slug = "slug is required";
      } else {
        formDataErrorTemp.slug = "";
      }
    }*/

    if (name === "password") {
      if (value === "") {
        formDataErrorTemp.password = "Password is required";
      } else if (!/[A-Z]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one capital letter";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one special character";
      } else if (!/[0-9]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one numeric value";
      } else {
        formDataErrorTemp.password = "";
        // Check if confirmPassword is filled and validate matching passwords
        if (formData.confirmPassword && formData.confirmPassword !== value) {
          formDataErrorTemp.confirmPassword = "Passwords do not match";
        } else {
          formDataErrorTemp.confirmPassword = "";
        }
      }
    }

    if (name === "confirmPassword") {
      if (value === "") {
        formDataErrorTemp.confirmPassword = "Confirm Password is required";
      } else {
        formDataErrorTemp.confirmPassword = "";
        // Check if password is filled and validate matching passwords
        if (formData.password && formData.password !== value) {
          formDataErrorTemp.confirmPassword = "Passwords do not match";
        }
      }
    }

    if (name === "numberOfUsers") {
      if (value === "") {
        formDataErrorTemp.numberOfUsers = "Parallel user is required";
      } else if (!/^[1-9]\d*$/.test(value)) {
        formDataErrorTemp.numberOfUsers =
          "Please provide a valid number of users";
      } else {
        formDataErrorTemp.numberOfUsers = "";
      }
    }

    if (name === "numberOfProUsers") {
      if (value === "") {
        formDataErrorTemp.numberOfProUsers = "Pro user is required";
      } else if (!/^[1-9]\d*$/.test(value)) {
        formDataErrorTemp.numberOfProUsers =
          "Please provide a valid number of pro users";
      } else {
        formDataErrorTemp.numberOfProUsers = "";
      }
    }
    if (name === "emergencyContactPhone") {
      if (!/^\d{10}$/.test(value) && value !== "") {
        formDataErrorTemp.emergencyContactPhone =
          "Please provide valid Emergency Contact Number";
      } else {
        formDataErrorTemp.emergencyContactPhone = "";
      }
    }
    if (name === "phoneNumber") {
      if (value === "") {
        formDataErrorTemp.phoneNumber = "Phone Number is required";
      } else if (!/^\d{10}$/.test(value)) {
        formDataErrorTemp.phoneNumber = "Please provide valid Phone Number";
      } else {
        formDataErrorTemp.phoneNumber = "";
      }
    }

    // if (name === "postalCode") {
    //   if (value !== "") {
    //     if (!/^[a-zA-Z0-9]+$/.test(value)) {
    //       formDataErrorTemp.postalCode = "Postal Code is invalid";
    //     } else {
    //       formDataErrorTemp.postalCode = "";
    //     }
    //   }
    // }

    if (name === "postalCode") {
      if (!value) {
        // If no value is provided, set the error to an empty string.
        formDataErrorTemp.postalCode = "";
      } else if (!/^\d+$/.test(value)) {
        // If the value contains any non-digit characters, set the error message accordingly.
        formDataErrorTemp.postalCode = "Postal code must be a number";
      } else if (value.length !== 7) {
        // If the length of the value is not exactly 5 digits, set the error message.
        formDataErrorTemp.postalCode = "Postal code must be exactly 7 digits.";
      } else {
        // If all conditions are met, clear the error.
        formDataErrorTemp.postalCode = "";
      }
    }

    if (name === "city") {
      if (/[0-9\W_]/.test(value)) {
        formDataErrorTemp.city = "City name is invalid";
      } else {
        formDataErrorTemp.city = "";
      }
    }
    if (name === "country") {
      if (/[0-9\W_]/.test(value)) {
        formDataErrorTemp.country = "Country name is invalid";
      } else {
        formDataErrorTemp.country = "";
      }
    }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const [selectedGender, setSelectedGender] = useState("male");
  const genderValue = ["male", "female"];
  const [selectedPrimaryHand, setSelectedPrimaryHand] = useState("right");
  const handValue = ["right", "left"];
  // const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month
      }-${year}`;
  };
  // const formattedDateOfBirth = formatDate(dateOfBirth);

  const formatData = () => {
    let data = {};
    data["email"] = formData.email;
    data["subscriptionId"] = formData.subscriptionId.value;
    data["name"] = formData.name;
    data["numberOfUsers"] = formData.numberOfUsers;
    data["numberOfProUsers"] = formData.numberOfProUsers;
    data["mobile"] = formData.phoneNumber;
    data["address"] = formData.address;
    data["city"] = formData.city;
    data["postalCode"] = formData.postalCode;
    data["country"] = formData.country;
    data["slug"] = formData.slug;
    data["username"] = formData.username;
    data["password"] = formData.password;
    data["confirmPassword"] = formData.confirmPassword;
    data["gender"] = selectedGender;
    data["primaryHand"] = selectedPrimaryHand;
    // data["dateOfBirth"] = formattedDateOfBirth;
    data["allegies"] = formData.allegies;
    data["notes"] = formData.notes;
    return data;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/register`,
          data: data,
        });
        // setShowModal(false);
        closeModal();
        loaderStateFalse();
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
      } catch (error) {
        loaderStateFalse();
        if (error.response) {
          if (error.response.status == 422) {
            let resData = error.response.data;
            if (resData.success === false) {
              let formDataErrorTemp = { ...formDataError };
              let responseData = resData.data;
              if (responseData.mobile) {
                if (responseData.mobile.rule == "unique") {
                  responseData.phoneNumber = {};
                  responseData.phoneNumber.message =
                    "Phone Number already exists.";
                }
              }
              if (responseData.email) {
                if (responseData.email.rule == "unique") {
                  responseData.email = {};
                  responseData.email.message = "Email already exists.";
                }
              }

              let obj = Object.keys(responseData);
              if (obj.length > 0) {
                obj.map((item, index) => {
                  if (responseData[item]) {
                    // if (item == "username") {
                    //   formDataErrorTemp.name = responseData[item].message;
                    // } else {
                    formDataErrorTemp[item] = responseData[item].message;
                    // }
                  }
                });

                setFormDataError(formDataErrorTemp);
              }
            }
          }
        } else {
          // Utility.toastNotifications(error.message, "Error", "error");
          toast(`Sorry! Something went wrong.`, {
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
    }
  };
  //const buttonName = "Submit";
  const handleChangeSubscription = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["subscriptionId"] = event;
    setFormData(formDataTemp);
  };
  const generateSlug = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Trim leading/trailing whitespace
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
  };

  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={pricing_ban} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne>{t("pricingTitle")}</HeaderOne>
        </div>
      </section>

      <section className="trainning_price_sec">
        <div className="container">
          <div className="common_txt text-center">
            <span>OUR pricing</span>
            <HeaderTwo>{t("pricingHeader")}</HeaderTwo>
          </div>
          <div className="trainning_price_innr">
            <div className="row">
              {subscriptionData &&
                subscriptionData.map((res) => {
                  return (
                    <div className="col-lg-4">
                      <div className="trainning_price_box">
                        <HeaderTwo variant="medium">{res.name}</HeaderTwo>
                        <div className="pricing_area_outer">
                          <div className="price_area">
                            <div className="price_area_innr">
                              <HeaderFive variant="large">${res.price}</HeaderFive>
                              <HeaderSix variant="small">per month</HeaderSix>
                            </div>
                          </div>
                        </div>
                        <P variant="small-plus">
                          Lorem Ipsum has been the industry's standard dummy
                          text
                        </P>
                        <Link
                          to="#"
                          onClick={() => addSubscription(res)}
                          className="black_btn"
                        >
                          {t("bookNow")}
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* closed the below section because server side pagintaion is not available*/}
            {/* <div className="load_more_holder text-center">
              <a className="black_btn" href="javascript:void(0)">
                Load More
              </a>
            </div> */}
          </div>
        </div>
      </section>
      <ClientAddEdit
        formData={formData}
        formDataError={formDataError}
        showModal={showModal}
        // setShowModal={setShowModal}
        closeModal={closeModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        headerText={clientAddEditModalProps.headerText}
        submitButtonText={clientAddEditModalProps.submitButtonText}
        formType={clientAddEditModalProps.formType}
        subscriptionData={pricingData}
        handleChangeSubscription={handleChangeSubscription}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        value1={"male"}
        value2={"female"}
        genderValue={genderValue}
        selectedPrimaryHand={selectedPrimaryHand}
        setSelectedPrimaryHand={setSelectedPrimaryHand}
        hand1={"right"}
        hand2={"left"}
        handValue={handValue}
      // dateOfBirth={dateOfBirth}
      // setDateOfBirth={setDateOfBirth}
      />
    </>
  );
};

// export default Subscription;
const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  withNamespaces()(Subscription)
);
