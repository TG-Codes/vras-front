import i18n from "../../../i18n.js";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { P, HeaderOne } from "../../../utility/components/Typography.jsx";
import team_ban from "../../../utility/assets/images/team_ban.jpg";
import team1 from "../../../utility/assets/images/team1.jpg";
import team2 from "../../../utility/assets/images/team2.jpg";
import team3 from "../../../utility/assets/images/team3.jpg";
import team4 from "../../../utility/assets/images/team4.jpg";
import team5 from "../../../utility/assets/images/team5.jpg";
import team6 from "../../../utility/assets/images/team6.jpg";
import { withNamespaces } from "react-i18next";

const OurTeam = (props) => {
    const {t}=props;
  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
            <img src={team_ban} alt=""/>
        </div>
        <div className="banner_txt">
            <HeaderOne>{t("ourTeamTitle")}</HeaderOne>
        </div>
    </section>

    <section className="our_team_sec">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="team_member">
                        <figure><img src={team1} alt=""/></figure>
                        <div className="member_details">
                            <h2>Andrew Walker<span>Security Agent</span></h2>
                            <p>Adipiscing elit, sed do eid tempor incididunt ut labore et</p>
                            <ul>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-instagram"></i></a></li>
                            </ul>
                            <a className="black_btn" href="javascript:void(0)">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="team_member">
                        <figure><img src={team2} alt=""/></figure>
                        <div className="member_details">
                            <h2>Sam Kyle<span>Security Agent</span></h2>
                            <p>Adipiscing elit, sed do eid tempor incididunt ut labore et</p>
                            <ul>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-instagram"></i></a></li>
                            </ul>
                            <a className="black_btn" href="javascript:void(0)">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="team_member">
                        <figure><img src={team3} alt=""/></figure>
                        <div className="member_details">
                            <h2>Tim Jones<span>Security Agent</span></h2>
                            <p>Adipiscing elit, sed do eid tempor incididunt ut labore et</p>
                            <ul>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-instagram"></i></a></li>
                            </ul>
                            <a className="black_btn" href="javascript:void(0)">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="team_member">
                        <figure><img src={team4} alt=""/></figure>
                        <div className="member_details">
                            <h2>Paul Simonds<span>Security Agent</span></h2>
                            <p>Adipiscing elit, sed do eid tempor incididunt ut labore et</p>
                            <ul>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-instagram"></i></a></li>
                            </ul>
                            <a className="black_btn" href="javascript:void(0)">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="team_member">
                        <figure><img src={team5} alt=""/></figure>
                        <div className="member_details">
                            <h2>Ron Jameson<span>Security Agent</span></h2>
                            <p>Adipiscing elit, sed do eid tempor incididunt ut labore et</p>
                            <ul>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-instagram"></i></a></li>
                            </ul>
                            <a className="black_btn" href="javascript:void(0)">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="team_member">
                        <figure><img src={team6} alt=""/></figure>
                        <div className="member_details">
                            <h2>David Warner<span>Security Agent</span></h2>
                            <p>Adipiscing elit, sed do eid tempor incididunt ut labore et</p>
                            <ul>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="javascript:void(0)"><i className="fa-brands fa-instagram"></i></a></li>
                            </ul>
                            <a className="black_btn" href="javascript:void(0)">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="load_more_holder text-center">
                <a className="black_btn" href="javascript:void(0)">Load More</a>
            </div>
        </div>
    </section>
    </>
  );
};
const mapStateToProps = (globalState) => {
    return { userData: globalState.mainReducerData.userData };
  };
  export default connect(mapStateToProps, {})(
    withNamespaces()(OurTeam)
  );
// export default OurTeam;
