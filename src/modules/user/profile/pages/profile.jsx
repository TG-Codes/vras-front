import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import testImg from '../../../../utility/assets/images/jadon-kelly-Qo_2hhoqC3k-unsplash.jpg'

const baseUrL = process.env.REACT_APP_BASE_URL;
const Profile = (props) => {
  const { userData } = props;
  const authToken = userData.token;
  const [data, setData] = useState([]);
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
      setData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };
//   return (
//     <div className="profile-card">
//       <img src={data.avatar} alt={data.fullName} className="avatar" />
//       <div className="details">
//         <h2>{data.fullName}</h2>
//         <p>{data.role}</p>
//       </div>
//     </div>
//   );
return (
    <div style={{ backgroundColor: '#9de2ff' }}>
      {/* <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Danny McLoan</MDBCardTitle>
                    <MDBCardText>Senior Journalist</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                      <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}
    </div>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};
export default connect(mapStateToProps, {})(Profile);
// export default Profile
