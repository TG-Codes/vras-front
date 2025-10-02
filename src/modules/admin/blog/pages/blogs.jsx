import i18next from "i18next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import {
  loaderStateFalse,
  loaderStateTrue,
  loginSuccess,
} from "../../../../actions/allActions";
import axios from "axios";
import Button from "../../../../utility/components/Button";
// import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import BlogAddEdit from "../../../../utility/components/BlogAddEdit";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import { withNamespaces } from "react-i18next";
import defaultImg from '../../../../utility/assets/images/select_image.png'
const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Blogs = (props) => {
  const gridRef = useRef(null);
  const { userData, loginSuccess, t } = props;
  const authToken = userData.token;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);

  const rowHeight = 70;
  const headerHeight = 60;

  const [columnDefs, setColumnDefs] = useState([
    // { field: "id", width: '50' },
    { field: "name", minWidth:300, maxWidth:350 },
    { field: "slug", minWidth:150, maxWidth:200 },
    {
      field: "image",
      cellRenderer: (params) => {
        if (params.data) {
          // const { status } = params.data;
          return (
            <div>
              {/* <img src={testImg} alt="failed  to load" style={{ width: '50px', height: '50px' }}/> */}
              <img
                src={`${imageUrl}/${params.data.image}`}
                alt="failed  to load"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          );
        } else {
          return null;
        }
      }, minWidth:150, maxWidth:200
    },
    { field: "categories", minWidth:150, maxWidth:200 },
    { field: "tags", minWidth:150, maxWidth:200 },
    { field: "description", minWidth:400, maxWidth:450 },
    {
      field: "Action",minWidth:150, maxWidth:200,
      cellClass: "table-action-cell",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editBlogs(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteBlogs(e, params)}
                className="action_button del_btn"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ]);
  const [blogData, setBlogData] = useState([]);
  // console.log('blogData', blogData)
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrL}/admin/blogs`, {
  //       headers: {
  //         Authorization: authToken,
  //       },
  //     });
  //     setBlogData(response.data.data.blogs);
  //     console.log("setSubscriptionData", response.data.data.blogs);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const [components, setcomponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/blogs?`;
      const { startRow, endRow, sortModel } = params;

      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        const pageSize = endRow - startRow;
        const pageNumber = Math.floor(startRow / pageSize) + 1;

        url += `page=${pageNumber}&length=${pageSize}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });

        response
          .then((response) => {
            if (response.data.data.blogs.length > 0) {
              params.successCallback(
                response.data.data.blogs,
                parseInt(response.data.data.total)
              );
            }
          })
          .catch((error) => {
            params.failCallback();
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };

  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
    gridRef.current = params.api;
    gridRef.current.sizeColumnsToFit();
  });
  const [blogsAddEditModalProps, setBlogsAddEditModalProps] = useState({});
  const addBlog = () => {
    let blogAddEditModalPropsTemp = { ...blogsAddEditModalProps };
    blogAddEditModalPropsTemp["formType"] = "add";
    blogAddEditModalPropsTemp["headerText"] = "Add Blog";
    blogAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setBlogsAddEditModalProps(blogAddEditModalPropsTemp);
    let formDataTemp = {...formData}
    formDataTemp["avatar"] = defaultImg
    setFormData(formDataTemp)
    setShowAddModal(true);
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const closeModal = () => {
    setShowAddModal(false);
    setFormData({
      name: "",
      description: "",
      slug: "",
      categories: "",
      tags: "",
      avatar: ""
    });
    setFormDataError({
      name: "",
      description: "",
      slug: "",
      categories: "",
      tags: "",
      avatar: ""
    });
  };
  const [content, setContent] = useState("");
  // const [textInput, setTextInput] = useState('');
  const handleContentChange = (value) => {
    setContent(value);
  };

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    slug: "",
    categories: "",
    tags: "",
    avatar: defaultImg,
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    description: "",
    slug: "",
    categories: "",
    tags: "",
    avatar: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
    formDataTemp[name] = value;
    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else {
        formDataTemp.slug = generateSlug(value);
        formDataErrorTemp.name = "";
        formDataErrorTemp.slug = "";
      }
    }
    if (name === "slug") {
      if (value == "") {
        formDataErrorTemp.slug = "Slug is required";
      } else {
        formDataErrorTemp.slug = "";
      }
    }
    if (name === "categories") {
      if (value === "") {
        formDataErrorTemp.categories = "Categories is required";
      } else {
        formDataErrorTemp.categories = "";
      }
    }
    if (name === "tags") {
      if (value === "") {
        formDataErrorTemp.tags = "Tags is required";
      } else {
        formDataErrorTemp.tags = "";
      }
    }
    if (name === "description") {
      if (value === "") {
        formDataErrorTemp.description = "Description is required";
      } else {
        formDataErrorTemp.description = "";
      }
    }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  
  const generateSlug = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Trim leading/trailing whitespace
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
  };
  const validateForm = (params) => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name =
        "Name can only contain alphanumeric characters and spaces";
    }
    if (formData.categories === "") {
      isValid = false;
      formDataErrorTemp.categories = "Categories is required";
    }
    if (formData.tags === "") {
      isValid = false;
      formDataErrorTemp.tags = "Tags is required";
    }
    if (formData.tags === "") {
      isValid = false;
      formDataErrorTemp.tags = "Tags is required";
    }
    if (formData.description === "") {
      isValid = false;
      formDataErrorTemp.description = "Description is required";
    }

    // if (formData.slug === "" && params === "add") {
    //   isValid = false;
    //   formDataErrorTemp.slug = "Slug is required";
    // }
    setFormDataError(formDataErrorTemp);
    return isValid;
  };
  // const handleTextInputChange = (e) => {
  //   setTextInput(e.target.value);
  // };
  const [editObjBlogs, setEditObjBlogs] = useState({});
  const editBlogs = (e, params) => {
    let data = params.data;
    let blogsAddEditModalPropsTemp = { ...blogsAddEditModalProps };
    blogsAddEditModalPropsTemp["formType"] = "edit";
    blogsAddEditModalPropsTemp["headerText"] = "Edit Blog";
    blogsAddEditModalPropsTemp["submitButtonText"] = "Update";
    setBlogsAddEditModalProps(blogsAddEditModalPropsTemp);
    setEditObjBlogs(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["slug"] = data.slug;
    formDataTemp["description"] = data.description;
    formDataTemp["categories"] = data.categories;
    formDataTemp["tags"] = data.tags;
    formDataTemp["avatar"] = `${imageUrl}/${data.image}`;
    setFormData(formDataTemp);
    setShowAddModal(true);
  };
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const closeConfirmationAlert = () => {
    setShowConfirmationModal(false);
  };
  const [blogId, setBlogId] = useState(null);
  const deleteBlogs = (e, params) => {
    setBlogId(params.data.id);
    setShowConfirmationModal(true);
  };
  const confirm = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/blogs/destroy/${blogId}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowConfirmationModal(false);
        resetDataGrid();
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
      }
    } catch (error) {
      if (error.response.status === 401) {
        loginSuccess({});
        const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
        const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
        if (userData.role === "admin") {
          window.location.href = adminLoginURL;
        } else {
          window.location.href = loginURL;
        }
      }
      console.error("Error deleting Blog:", error);
      loaderStateFalse();
    }
  };
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
     let formDataTemp = {...formData}
     formDataTemp["avatar"] = imageFile
     setFormData(formDataTemp)
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
    let data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("slug", formData.slug);
    data.append("categories", formData.categories);
    data.append("tags", formData.tags);
    data.append("image", formData.avatar)
    return data;
  };
  const handleSubmit = async () => {
    if (validateForm(blogsAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (blogsAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/blogs/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/admin/blogs/update/${formData.id}`;
        method = "put";
      }
      addEditPostData(url, data, method);
    }
  };

  const addEditPostData = async (url, data, method) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: authToken,
        },
      });
      loaderStateFalse();
      resetDataGrid();
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
      closeModal();
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
        if (error.response.status === 401) {
          loginSuccess({});
          const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
          const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
          if (userData.role === "admin") {
            window.location.href = adminLoginURL;
          } else {
            window.location.href = loginURL;
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
  };

  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <h3>{t("blogs")}</h3>
        <Button className="tablemodal_btn" onClick={addBlog}>
          <FontAwesomeIcon icon={faUserPlus} /> {t("addBlogs")}
        </Button>
      </div>
      <BlogAddEdit
        showAddModal={showAddModal}
        closeModal={closeModal}
        formData={formData}
        formDataError={formDataError}
        handleInputChange={handleInputChange}
        selectedImage={selectedImage}
        imageLabel={imageLabel}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        handleImageClick={handleImageClick}
        // handleContentChange={handleContentChange}
        // content={content}
        handleSubmit={handleSubmit}
        headerText={blogsAddEditModalProps.headerText}
        submitButtonText={blogsAddEditModalProps.submitButtonText}
      />
      <ConfirmationAlert
        showAdminModal={showConfirmationModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confirm}
        confirmationText={"delete this Blog?"}
        headerText={"Delete!"}
      />

      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 320px)" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowModelType="infinite"
          onGridReady={onGridReady}
          components={components}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          cacheBlockSize={10}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (globalState) => {
  // console.log("globalState", globalState);
  return {
    userData: globalState.mainReducerData.userData,
  };
};
export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(Blogs));
