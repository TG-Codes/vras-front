import { toast } from "react-toastify";

class Utility {
  static toastNotifications = (
    message,
    title,
    type,
    autoclose = true,
    companyLogo = "",
    component = <></>
  ) => {
    let errorToastId = "";
    let warningToastId = "";
    let callbackToastId = "";
    if (type === "success") {
      var _autoclose = 5000;
      if (autoclose == false) {
        _autoclose = autoclose;
      }
      toast.success(
        <div className="tostify-inner-box">
          <div className="iconbox">
            <div className="alert_img">&nbsp;</div>
          </div>
          <div className="titleanddescriptionbox">
            <h1>{title}</h1>
            <div className="alert_box">
              <div className="message_dec">{message}</div>
            </div>
          </div>
        </div>,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: _autoclose,
          transition: toast.slide,
          hideProgressBar: false,
        }
      );
    } else if (type === "reminder") {
      var _autoclose = 5000;
      if (autoclose == false) {
        _autoclose = autoclose;
      }
      toast.success(
        <div>
          <h1>{title}</h1>
          <div className="alert_box">
            <div className="alert_img_reminder">&nbsp;</div>
            <div className="message_dec">{message}</div>
          </div>
        </div>,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: _autoclose,
          transition: toast.slide,
          hideProgressBar: false,
        }
      );
    } else if (type === "info") {
      var _autoclose = 5000;
      if (autoclose == false) {
        _autoclose = autoclose;
      }
      toast.success(
        <div>
          <h1 className="info_title_text">{title}</h1>
          <div className="alert_box">
            <div className="alert_img_info">
              <img src={companyLogo} alt="No image" />
            </div>
            <div className="message_dec">{message}</div>
          </div>
        </div>,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: _autoclose,
          transition: toast.slide,
          hideProgressBar: false,
        }
      );
    } else if (type === "error") {
      errorToastId = message;
      if (!toast.isActive(errorToastId)) {
        toast.error(
          // <div className="warning_message_box">
          //     <h1 className="error_title">{title}</h1>
          //     <div className="message_descriptipn error_title_dec">{message}</div>
          // </div>, {
          <div className="tostify-inner-box">
            <div className="iconbox">
              <div className="alert_img_warning">&nbsp;</div>
            </div>
            <div className="titleanddescriptionbox">
              <h1>{title}</h1>
              <div className="alert_box">
                <div className="message_dec">{message}</div>
              </div>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: false,
            transition: toast.slide,
            hideProgressBar: true,
            toastId: errorToastId,
          }
        );
      }
    } else if (type === "warning") {
      warningToastId = message;
      var _autoclose = 3000;
      if (autoclose === false) {
        _autoclose = autoclose;
      }
      if (!toast.isActive(warningToastId)) {
        toast.warning(
          // <div>
          //     <h1 className="warning_title">{title}</h1>
          //     <div className="message_descriptipn">{message}</div>
          // </div>, {
          <div className="tostify-inner-box">
            <div className="iconbox">
              <div className="alert_img_warning">&nbsp;</div>
            </div>
            <div className="titleanddescriptionbox">
              <h1>{title}</h1>
              <div className="alert_box">
                <div className="message_dec">{message}</div>
              </div>
            </div>
          </div>,
          {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: _autoclose,
            transition: toast.slide,
            hideProgressBar: false,
            toastId: warningToastId,
          }
        );
      }
    } else if (type === "longError") {
      errorToastId = message;
      if (!toast.isActive(errorToastId)) {
        toast.error(
          <div className="warning_message_box_long">
            <h1 className="error_title">{title}</h1>
            <div className="message_descriptipn error_title_dec">
              {message}
            </div>
          </div>,
          {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: false,
            transition: toast.slide,
            hideProgressBar: true,
            toastId: errorToastId,
          }
        );
      }
    } else if (type === "callback") {
      callbackToastId = message;
      if (!toast.isActive(callbackToastId)) {
        toast(component, {
          position: toast.POSITION.TOP_LEFT,
          transition: toast.slide,
          toastId: callbackToastId,
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          closeButton: false,
        });
      }
    }
  };

  static closeAllNotifications = () => {
    toast.dismiss();
  };
}

export default Utility;





























// import { toast } from "react-toastify";

// class Utility {
//   static toastNotifications = (
//     message,
//     title,
//     type,
//     autoclose = true,
//     companyLogo = "",
//     component = <></>
//   ) => {
//     let errorToastId = "";
//     let warningToastId = "";
//     let callbackToastId = "";
//     if (type === "success") {
//       var _autoclose = 5000;
//       if (autoclose == false) {
//         _autoclose = autoclose;
//       }
//       toast.success(
//         <div className="tostify-inner-box">
//           <div className="iconbox">
//             <div className="alert_img">&nbsp;</div>
//           </div>
//           <div className="titleanddescriptionbox">
//             <h1>{title}</h1>
//             <div className="alert_box">
//               <div className="message_dec">{message}</div>
//             </div>
//           </div>
//         </div>,
//         {
//           position: toast.POSITION.BOTTOM_LEFT,
//           autoClose: _autoclose,
//           transition: toast.slide,
//           hideProgressBar: false,
//         }
//       );
//     } else if (type === "reminder") {
//       var _autoclose = 5000;
//       if (autoclose == false) {
//         _autoclose = autoclose;
//       }
//       toast.success(
//         <div>
//           <h1>{title}</h1>
//           <div className="alert_box">
//             <div className="alert_img_reminder">&nbsp;</div>
//             <div className="message_dec">{message}</div>
//           </div>
//         </div>,
//         {
//           position: toast.POSITION.BOTTOM_LEFT,
//           autoClose: _autoclose,
//           transition: toast.slide,
//           hideProgressBar: false,
//         }
//       );
//     } else if (type === "info") {
//       var _autoclose = 5000;
//       if (autoclose == false) {
//         _autoclose = autoclose;
//       }
//       toast.success(
//         <div>
//           <h1 className="info_title_text">{title}</h1>
//           <div className="alert_box">
//             <div className="alert_img_info">
//               <img src={companyLogo} alt="No image" />
//             </div>
//             <div className="message_dec">{message}</div>
//           </div>
//         </div>,
//         {
//           position: toast.POSITION.BOTTOM_LEFT,
//           autoClose: _autoclose,
//           transition: toast.slide,
//           hideProgressBar: false,
//         }
//       );
//     } else if (type === "error") {
//       errorToastId = message;
//       if (!toast.isActive(errorToastId)) {
//         toast.error(
//           // <div className="warning_message_box">
//           //     <h1 className="error_title">{title}</h1>
//           //     <div className="message_descriptipn error_title_dec">{message}</div>
//           // </div>, {
//           <div className="tostify-inner-box">
//             <div className="iconbox">
//               <div className="alert_img_warning">&nbsp;</div>
//             </div>
//             <div className="titleanddescriptionbox">
//               <h1>{title}</h1>
//               <div className="alert_box">
//                 <div className="message_dec">{message}</div>
//               </div>
//             </div>
//           </div>,
//           {
//             position: "bottom-left",
//             autoClose: false,
//             transition: toast.slide,
//             hideProgressBar: true,
//             toastId: errorToastId,
//           }
//         );
//       }
//     } else if (type === "warning") {
//       warningToastId = message;
//       var _autoclose = 3000;
//       if (autoclose === false) {
//         _autoclose = autoclose;
//       }
//       if (!toast.isActive(warningToastId)) {
//         toast.warning(
//           // <div>
//           //     <h1 className="warning_title">{title}</h1>
//           //     <div className="message_descriptipn">{message}</div>
//           // </div>, {
//           <div className="tostify-inner-box">
//             <div className="iconbox">
//               <div className="alert_img_warning">&nbsp;</div>
//             </div>
//             <div className="titleanddescriptionbox">
//               <h1>{title}</h1>
//               <div className="alert_box">
//                 <div className="message_dec">{message}</div>
//               </div>
//             </div>
//           </div>,
//           {
//             position: toast.POSITION.BOTTOM_LEFT,
//             autoClose: _autoclose,
//             transition: toast.slide,
//             hideProgressBar: false,
//             toastId: warningToastId,
//           }
//         );
//       }
//     } else if (type === "longError") {
//       errorToastId = message;
//       if (!toast.isActive(errorToastId)) {
//         toast.error(
//           <div className="warning_message_box_long">
//             <h1 className="error_title">{title}</h1>
//             <div className="message_descriptipn error_title_dec">
//               {message}
//             </div>
//           </div>,
//           {
//             position: toast.POSITION.BOTTOM_LEFT,
//             autoClose: false,
//             transition: toast.slide,
//             hideProgressBar: true,
//             toastId: errorToastId,
//           }
//         );
//       }
//     } else if (type === "callback") {
//       callbackToastId = message;
//       if (!toast.isActive(callbackToastId)) {
//         toast(component, {
//           position: toast.POSITION.TOP_LEFT,
//           transition: toast.slide,
//           toastId: callbackToastId,
//           autoClose: false,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: false,
//           progress: undefined,
//           closeButton: false,
//         });
//       }
//     }
//   };
// }

// export default Utility;

