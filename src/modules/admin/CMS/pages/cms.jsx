// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { loaderStateFalse, loaderStateTrue } from "../../../../actions/allActions";
// import axios from "axios";
// import TextInput from "../../../../utility/components/TextInput";
// // import Button from "../../../../utility/components/Button";
// import {Button} from 'react-bootstrap'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faTrash,
//   faPlus,
//   faCheckCircle,
//   faTimesCircle,
//   faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// const baseUrL = process.env.REACT_APP_BASE_URL;
// const Cms = (props) => {
//   const {userData}=props;
//   const authToken = userData.token;
//   const [cmsData, setCmsData]= useState([])
//   console.log("cmsData-> ",cmsData)
//   const [formData, setFormData] = useState({
//     en: "",
//     he: ""
//   })
//   console.log("formData-> ",formData)
//   const [formDataError, setFormDataError] = useState({
//     en: "",
//     he: ""
//   })

//   useEffect(()=>{
//     getCmsData()
//   }, [])

//   const getCmsData = async ()=>{
//     try{
//       const response = await axios.get(`${baseUrL}/admin/cms`,
//       {headers: {
//         Authorization: authToken
//       }}
//       )
//       setCmsData(response.data.data.cms)
//       setFormData(response.data.data.cms)
//     } catch (error){
//       console.log(error)
//     }
//   }
//   const handleInputChange = (e) => {
//     let { name, value } = e.target;
//     let formDataTemp = Object.assign({}, formData);
//     let formDataErrorTemp = Object.assign({}, formDataError);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     formDataTemp[name] = value;
//     if (name === "en") {
//       if (value == "") {
//         formDataErrorTemp.en = "English value is required";
//       }else if (/[^a-zA-Z0-9\s]/.test(value)) {
//         formDataErrorTemp.en = "English value should not contain special characters";
//       } else {
//         // formDataTemp.slug = generateSlug(value);
//         formDataErrorTemp.en = "";
//         // formDataErrorTemp.slug = "";
//       }
//     }
//     if (name === "he") {
//       if (value == "") {
//         formDataErrorTemp.he = "Hebrew value is required";
//       }else if (/[^a-zA-Z0-9\s]/.test(value)) {
//         formDataErrorTemp.he = "Hebrew value should not contain special characters";
//       } else {
//         // formDataTemp.slug = generateSlug(value);
//         formDataErrorTemp.he = "";
//         // formDataErrorTemp.slug = "";
//       }
//     }

//     setFormData(formDataTemp);
//     setFormDataError(formDataErrorTemp);
//   };
//   const handleSubmit =()=>{
//     alert("hello")
//   }

//   return (
//     <div>
//       <h1>CMS</h1>
//       <TextInput
//       name="en"
//       label="English:*"
//       value={formData.en}
//       onChange={handleInputChange}
//       error={formDataError.en}
//       placeholder=""
//       />
//       <TextInput
//       name="he"
//       label="Hebrew:*"
//       value={formData.he}
//       onChange={handleInputChange}
//       error={formDataError.he}
//       placeholder=""
//       />
//       <Button onClick={handleSubmit}>
//         Click
//       </Button>
//     </div>
//   );
// };
// const mapStateToProps = (globalState) => {
//   return {
//     userData: globalState.mainReducerData.userData,
//   };
// }
// export default connect(mapStateToProps, {
//   loaderStateTrue,
//   loaderStateFalse,
// })(Cms);import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import {
  loaderStateFalse,
  loaderStateTrue,
} from "../../../../actions/allActions";
import axios from "axios";
import TextInput from "../../../../utility/components/TextInput";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";

const baseURL = process.env.REACT_APP_BASE_URL;

const Cms = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse, t } = props;
  const authToken = userData.token;
  const [cmsData, setCmsData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the item being edited
  const [formDataError, setFormDataError] = useState({});
  const [pageNumber, setpageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalFetched, setTotalFetched] = useState(0);
  useEffect(() => {
    getCmsData();
  }, []);

  const getCmsData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/cms?page=${pageNumber}&length=10`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setTotalCount(response.data.data.total);
      const newTotalFetched = totalFetched + response.data.data.cms.length;
      setTotalFetched(newTotalFetched);
      if (pageNumber === 1) {
        setCmsData(response.data.data.cms);
        // Initialize formData with the response data
        const initialFormData = response.data.data.cms.reduce((acc, item) => {
          acc[item.id] = {
            en: item.en,
            he: item.he,
            name: item.name,
            slug: item.slug,
          };
          return acc;
        }, {});
        setFormData(initialFormData);
      } else {
        setCmsData((prevData) => [...prevData, ...response.data.data.cms]);
        // Merge the new data with the previous data in formData
        const newFormData = { ...formData };
        response.data.data.cms.forEach((item) => {
          newFormData[item.id] = {
            en: item.en,
            he: item.he,
            name: item.name,
            slug: item.slug,
          };
        });
        setFormData(newFormData);
      }
      setpageNumber(pageNumber + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));

    setFormDataError((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: validateField(name, value),
      },
    }));
  };

  const validateField = (name, value) => {
    if (value === "") {
      return `${name === "en" ? "English" : "Hebrew"} value is required`;
    }
    // else if (/[^a-zA-Z0-9\s]/.test(value)) {
    //   return `${
    //     name === "en" ? "English" : "Hebrew"
    //   } value should not contain special characters`;
    // }
    else {
      return "";
    }
  };

  const validateForm = (id) => {
    const itemWithIform = formData[id];
    const itemWithIdcms = cmsData.find((item) => item.id === id);
    let isValid = true;
    let formDataErrorTemp = {};

    if (formData[id].en === "") {
      formDataErrorTemp.en = "English value is required";
      isValid = false;
    }
    // if (itemWithIform.en === itemWithIdcms.en) {
    //   formDataErrorTemp.en = "The Values cannot be the same";
    //   isValid = false;
    // }
    if (formData[id].he === "") {
      formDataErrorTemp.he = "Hebrew value is required";
      isValid = false;
    }
    // if (itemWithIform.he === itemWithIdcms.he) {
    //   formDataErrorTemp.he = "The Values cannot be the same";
    //   isValid = false;
    // }

    setFormDataError((prev) => ({
      ...prev,
      [id]: formDataErrorTemp,
    }));

    return isValid;
  };

  const handleSubmit = (id) => {
    const dataToSubmit = formData[id];
    if (validateForm(id)) {
      loaderStateTrue();
      let url = `${baseURL}/admin/cms/update/${id}`;
      let method = "put";

      editData(url, dataToSubmit, method);
    }
  };

  const editData = async (url, data, method) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: authToken,
        },
      });
      getCmsData();
      loaderStateFalse();
      setEditingId(null); // Reset the editing ID after update
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
      return response;
    } catch (error) {
      loaderStateFalse();
      console.log(error);
      toast(`Something went wrong`, {
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
  };
  const handleLoadMore = () => {
    getCmsData();
  };
  return (
    <div className="globaltable_holder cms_holder">
      <h1>CMS</h1>
      <div className="cms_body">
        {cmsData.length > 0
          ? cmsData.map((item) => (
              <div key={item.id} className="cms-container">
                <label>{item.name}</label>
                <div className="cms_input_block">
                  <TextInput
                    name="en"
                    label="English:*"
                    value={formData[item.id]?.en || ""}
                    onChange={(e) => handleInputChange(e, item.id)}
                    error={formDataError[item.id]?.en || ""}
                    placeholder=""
                    isDisabled={editingId !== item.id}
                  />
                  <TextInput
                    name="he"
                    label="Hebrew:*"
                    value={formData[item.id]?.he || ""}
                    onChange={(e) => handleInputChange(e, item.id)}
                    error={formDataError[item.id]?.he || ""}
                    placeholder=""
                    isDisabled={editingId !== item.id}
                  />
                  <div className="cms_btn_block">
                    <Button
                      onClick={() =>
                        editingId === item.id
                          ? handleSubmit(item.id)
                          : setEditingId(item.id)
                      }
                    >
                      {editingId === item.id ? t("update") : t("edit")}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : null}
        {totalFetched < totalCount && (
          <div className="cms_button">
            <Button onClick={handleLoadMore}>{t("loadMore")}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
})(withNamespaces()(Cms));
