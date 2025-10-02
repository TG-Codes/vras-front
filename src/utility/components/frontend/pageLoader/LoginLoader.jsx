import React from 'react'

const LoginLoader = () => {
  return (
    <div className="placeholder-glow">
        {/* <header className="header_wrapper ">
        <div className="container hdr_container">
           <a className="navbar-brand logo placeholder" href="index.html" style={{minHeight: "65px", backgroundColor: "#bababa"}}>
           </a>
           <nav className="navbar navbar-expand-lg nav_menu">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navHeader" aria-controls="navHeader" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navHeader">
                 <ul className="navbar-nav navbar-left">
                    <li className="nav-item active"><a className="nav-link placeholder" href="javascript:void(0);">Home</a></li>
                    <li className="nav-item"><a className="nav-link placeholder" href="javascript:void(0);">About Us</a></li>
                    <li className="nav-item"><a className="nav-link placeholder" href="javascript:void(0);">Our Team </a></li>
                    <li className="nav-item"><a className="nav-link placeholder" href="javascript:void(0);">News</a></li>
                    <li className="nav-item"><a className="nav-link placeholder" href="javascript:void(0);">Pricing</a></li>
                    <li className="nav-item"><a className="nav-link placeholder" href="javascript:void(0);">Contact Us</a></li>
                 </ul>
              </div>
           </nav>
           <div className="header_log_in">
              <ul>
                 <li><a href="javascript:void(0);" className="placeholder"><span><i className="fa-solid fa-arrow-right-to-bracket"></i></span>Log in</a></li>
              </ul>
           </div>
        </div>
     </header> */}
     <section className="banner_main about_ban" style={{overflow: "hidden", width: "100%"}}>
        <div className="inner_banner_img" style={{width: "100%", backgroundColor: "#bababa", display: "block"}}>
        </div>
        <div className="banner_txt">
           <h1  className="placeholder">About Our Premium Security Service</h1>
        </div>
     </section>
        <section className="login_sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="login_form">
                            <h2 className="placeholder">Login to your account</h2>
                            <p className="placeholder">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum dummy text of the printing and typesetting industry</p>
                            <form>
                                <div className="login_input">
                                    <label className="placeholder">Username</label>
                                    <input type="text" className="form-control placeholder" placeholder=""/>
                                </div>
                                <div className="login_input">
                                    <label className="placeholder">Username</label>
                                    <input type="password" className="form-control placeholder" placeholder=""/>
                                </div>
                                <div className="login_form_row">
                                    <div className="login_checkbox">
                                        <label className="checkbox_area placeholder" style={{pointerEvents: "none"}}>Remember me 
                                            <input type="checkbox" className="placeholder"/>
                                            <span className="login_checkmark placeholder"></span>
                                        </label>
                                    </div>
                                    <div className="login_lost_password">
                                        <a href="javascript:void(0);" className="placeholder">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="login_submit">
                                    <input type="submit" value="" className="black_btn placeholder" style={{backgroundColor: "#fff", pointerEvents: "none"}}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      {/* <footer className="footer_outer">
        <div className="footer_top">
           <div className="container">
              <div className="row">
                 <div className="col-lg-4 col-md-12">
                    <div className="footer_logo">
                       <a href="#" className="placeholder" style={{width: "100%", height: "95px", color: "#fff"}}>
                       </a>
                    </div>
                    <div className="footer_content">
                       <p className="placeholder">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    </div>
                    <div className="footer_social">
                       <p className="placeholder">Share with Us</p>
                       <ul>
                          <li><a href="javascript:void(0);" className="placeholder"><i className="fa-brands fa-linkedin-in"></i></a></li>
                          <li><a href="javascript:void(0);" className="placeholder"><i className="fa-brands fa-youtube"></i></a></li>
                       </ul>
                    </div>
                 </div>
                 <div className="col-lg-3 col-md-4">
                    <div className="ftr_list">
                       <div className="ftr_hdng">
                          <h6 className="placeholder">Office</h6>
                       </div>
                       <div className="footer_address">
                          <ul>
                             <li className="placeholder" style={{color: "#fff"}}>
                                <span><i className="fa-solid fa-location-dot"></i></span>
                                <p></p>
                             </li>
                             <li className="placeholder" style={{color: "#fff"}}><span><i className="fa-solid fa-envelope"></i></span><a href="mailto:info@empg.com"></a></li>
                             <li className="placeholder" style={{color: "#fff"}}><span><i className="fa-solid fa-phone"></i></span><a href="tel:+ 966 212-226-3126"></a></li>
                          </ul>
                       </div>
                    </div>
                 </div>
                 <div className="col-lg-2 col-md-3">
                    <div className="ftr_list">
                       <div className="ftr_hdng">
                          <h6 className="placeholder">Link</h6>
                       </div>
                       <ul>
                          <li><a href="javascript:void(0);" className="placeholder" style={{color: "#fff"}}>Home</a></li>
                          <li><a href="javascript:void(0);" className="placeholder" style={{color: "#fff"}}>About Us</a></li>
                          <li><a href="javascript:void(0);" className="placeholder" style={{color: "#fff"}}>Our Team</a></li>
                          <li><a href="javascript:void(0);" className="placeholder" style={{color: "#fff"}}>News</a></li>
                          <li><a href="javascript:void(0);" className="placeholder" style={{color: "#fff"}}>Contact Us</a></li>
                       </ul>
                    </div>
                 </div>
                 <div className="col-lg-3 col-md-5">
                    <div className="ftr_list">
                       <div className="ftr_hdng">
                          <h6 className="placeholder">Newslatter</h6>
                       </div>
                       <div className="ftr_news_form">
                          <form>
                             <input type="text" className="form-control placeholder" placeholder=""  style={{backgroundColor: "#fff"}}/>
                             <input type="submit" value="Submit" className="frm_submit placeholder"  style={{color: "#fff"}}/>
                          </form>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div className="ftr_btm">
           <div className="container">
              <div className="copyright">
                 <p className="placeholder">VRAS® 2024 All rights reserved.</p>
              </div>
           </div>
        </div>
     </footer> */}
    </div>
  )
}

export default LoginLoader