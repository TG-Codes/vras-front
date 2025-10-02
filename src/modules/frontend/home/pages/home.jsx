import i18n from "../../../../i18n.js";
import banner from "../../../../utility/assets/images/banner.jpg";
import service_back from "../../../../utility/assets/images/service_back.jpg";
import hunting from "../../../../utility/assets/images/hunting.png";
import training from "../../../../utility/assets/images/training.png";
import shooting from "../../../../utility/assets/images/shooting.png";
import about_comp from "../../../../utility/assets/images/about_comp.jpg";
// 
import accessible from "../../../../utility/assets/images/accessible.png";
import custom from "../../../../utility/assets/images/custom.png";
import lowCost from "../../../../utility/assets/images/lowCost.png";
import secure from "../../../../utility/assets/images/secure.png";

import logo_img1 from "../../../../utility/assets/images/logo_img1.png";
import logo_img2 from "../../../../utility/assets/images/logo_img2.png";
import logo_img3 from "../../../../utility/assets/images/logo_img3.png";
import logo_img4 from "../../../../utility/assets/images/logo_img4.png";
import logo_img5 from "../../../../utility/assets/images/logo_img5.png";
import logo_img6 from "../../../../utility/assets/images/logo_img6.png";
import our_service from "../../../../utility/assets/images/our_service.jpg";
import gun_man from "../../../../utility/assets/images/gun_man.png";
import trans from "../../../../utility/assets/images/trans.png";
import video1 from "../../../../utility/assets/images/video1.jpg";
import video2 from "../../../../utility/assets/images/video2.jpg";
import video3 from "../../../../utility/assets/images/video3.jpg";
import play_button from "../../../../utility/assets/images/play-button.png";
import gun from "../../../../utility/assets/images/gun.png";
import black_cote from "../../../../utility/assets/images/black_cote.jpg";
import thumb1 from "../../../../utility/assets/images/thumb1.png";
import thumb2 from "../../../../utility/assets/images/thumb2.png";
import blog1 from "../../../../utility/assets/images/blog1.jpg";
import blog2 from "../../../../utility/assets/images/blog2.jpg";
import blog3 from "../../../../utility/assets/images/blog3.jpg";
import ReactPlayer from "react-player";
import React, { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState } from "react";
import ClientAddEdit from "../../../../utility/components/ClientAddEdit";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import Button from "../../../../utility/components/Button";
import { Link } from "react-router-dom";
import {
  P,
  HeaderOne,
  HeaderTwo,
  HeaderThree,
  HeaderFour,
  HeaderFive,
} from "../../../../utility/components/Typography";
import { withNamespaces } from "react-i18next";
const baseURL = process.env.REACT_APP_BASE_URL;
const imageUrL = process.env.REACT_APP_IMAGE_URL;

const Home = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse, t } = props;
  const [logos, setLogos] = useState([]);
  const [videos, setVideos] = useState([]);
  const language = i18n.language;
  const [aboutCompanyOne, setAboutCompanyOne] = useState([]);
  const [aboutCompanyTwo, setAboutCompanyTwo] = useState([]);
  const [aboutCompanyThree, setAboutCompanyThree] = useState([]);
  const [weProvideOne, setWeProvideOne] = useState([]);
  const [weProvideTwo, setWeProvideTwo] = useState([]);
  const [weProvideThree, setWeProvideThree] = useState([]);
  const [weProvideFour, setWeProvideFour] = useState([]);
  const [weProvideFive, setWeProvideFive] = useState([]);
  const [traineeSay, setTraineeSay] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  useEffect(() => {
    getLogos();
    getVideos();
    getAboutCompanyOne();
    getAboutCompanyTwo();
    getAboutCompanyThree();
    getWhatWeProvide();
    getWhatWeProvideTwo();
    getWhatWeProvideThree();
    getWhatWeProvideFour();
    getWhatWeProvideFive();
    getTraineeSay();
    getTestimonial();
    fetchData();
  }, [language]);
  const getLogos = async () => {
    try {
      const response = await axios.get(`${baseURL}/logos`);
      setLogos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getVideos = async () => {
    try {
      const response = await axios.get(`${baseURL}/videos`);
      const videoUrls = response.data.data.map((video) => {
        // Check if the URL contains an iframe and extract the URL if so
        const iframeMatch = video.url.match(/src="([^"]+)"/);
        return iframeMatch ? iframeMatch[1] : video.url;
      });
      setVideos(videoUrls);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getAboutCompanyOne = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/about-the-company-one`);
      setAboutCompanyOne(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getAboutCompanyTwo = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/about-the-company-two`);
      setAboutCompanyTwo(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getAboutCompanyThree = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/cms/about-the-company-three`
      );
      setAboutCompanyThree(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getWhatWeProvide = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/what-we-provide-one`);
      setWeProvideOne(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getWhatWeProvideTwo = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/what-we-provide-two`);
      setWeProvideTwo(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getWhatWeProvideThree = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/what-we-provide-three`);
      setWeProvideThree(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getWhatWeProvideFour = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/what-we-provide-four`);
      setWeProvideFour(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getWhatWeProvideFive = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/what-we-provide-five`);
      setWeProvideFive(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getTraineeSay = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/what-trainees-say`);
      setTraineeSay(response.data.data[language]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getTestimonial = async () => {
    try {
      const response = await axios.get(`${baseURL}/testimonials`);
      setTestimonialData(response.data.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const sliderSettings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const videoSettings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    speed: 500,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonialSettings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "custom-dots",
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ourNewsSettings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "custom-dots", // Add a custom class for the dots
    arrows: false,
    speed: 500,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const smallLogoSettings = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    speed: 500,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      name: "Jhone Dio",
      image: thumb1,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      text2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Jhone Dio",
      image: thumb2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      text2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Jhone Dio",
      image: thumb2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      text2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Jhone Dio",
      image: thumb2,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      text2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
  const [readMoreIndex, setReadMoreIndex] = useState(-1);
  const toggleReadMore = (index) => {
    if (readMoreIndex === index) {
      setReadMoreIndex(-1);
    } else {
      setReadMoreIndex(index);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [blogData, setBlogData] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalFetched, setTotalFetched] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/blogs?page=${pageNumber}&length=3`
      );
      setTotalCount(response.data.data.total);
      const newTotalFetched = totalFetched + response.data.data.blogs.length;
      setTotalFetched(newTotalFetched);
      if (pageNumber === 1) {
        // For initial fetch, set the response directly
        setBlogData(response.data.data.blogs);
      } else {
        // For subsequent fetches, append to the existing data
        setBlogData((prevData) => [...prevData, ...response.data.data.blogs]);
      }
      setpageNumber(pageNumber + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    fetchData();
  };
  return (
    <>
      <section className="banner_main">
        <div className="banner_img">
          <img src={banner} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne variant="default">{t("homePageTitle")}</HeaderOne>
        </div>
      </section>

      <section
        className="service_sec"
        style={{ backgroundImage: `url(${service_back})` }}
      >
        <div className="container">
          <div className="service_list">
            <ul>
              <li>
                <figure>
                  <img src={custom} alt="" />
                </figure>
                <Link to="#">{t("homePageCustomizable")}</Link>
              </li>
              <li>
                <figure>
                  <img src={lowCost} alt="" />
                </figure>
                <Link to="#">{t("homePageLowCost")}</Link>
              </li>
              <li>
                <figure>
                  <img src={secure} alt="" />
                </figure>
                <Link to="#">{t("homePageSecure")}</Link>
              </li>
              <li>
                <figure>
                  <img src={accessible} alt="" />
                </figure>
                <Link to="#">{t("homePageAccessible")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="who_we_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="who_we_txt">
                <div className="common_txt">
                  <span>Who We Are</span>
                  <HeaderTwo>{t("homePageAboutTheCompany")}</HeaderTwo>
                </div>
                <p>{aboutCompanyOne}</p>
                <P>{aboutCompanyTwo}</P>
                <P>{aboutCompanyThree}</P>
                <Link className="black_btn" to="/aboutUs" onClick={scrollToTop}>
                  {t("readMore")}
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="who_we_img">
                <img src={about_comp} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="logo_sec">
        <div className="container">
          <div className="logo_innr">
            <div className="logo_slider">
              <Slider {...smallLogoSettings}>
                {logos.map((post, index) => {
                  return (
                    <div className="logo_slide_itm" key={index}>
                      <Link to="#">
                        <img src={`${imageUrL}/${post.image}`} alt="" />
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className="we_do_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="we_do_img">
                <figure>
                  <img src={our_service} alt="" />
                </figure>
                <div className="we_do_img_txt">
                  <P variant="large">{t("expertSafetyBanner")}</P>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="we_do_txt">
                <div className="common_txt">
                  <span>OUR services</span>
                  <HeaderTwo>{t("whatWeProvide")}</HeaderTwo>
                </div>
                <P>{weProvideOne}</P>
                <P>{weProvideTwo}</P>
                <P>{weProvideThree}</P>
                {/* <ul>
                  <li>{weProvideFour}</li>
                  <li>{weProvideFive}</li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        <div className="gun_man_pic">
          <img src={gun_man} alt="" />
        </div>
      </section>

      <section className="video_slide_sec">
        <div className="video_slider">
          <Slider {...videoSettings}>
            {videos.map((videoUrl, index) => (
              <div key={index} className="video_slide_itm">
                <ReactPlayer url={videoUrl} controls width="100%" />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* client rec */}

      {/* <section className="testimonial_sec">
        <div className="gun_image">
          <img src={gun} alt="" />
        </div>
        <div className="back_ground_testimonial">
          <div className="left_background_testi"></div>
          <div className="right_background_testi">
            <img src={black_cote} alt="" />
          </div>
        </div>
        <div className="container">
          <div className="innter_testimonial">
            <div className="left_testimonial_part">
              <HeaderFour>{t("testimonial")}</HeaderFour>
              <HeaderTwo>{t("traineeSay")}</HeaderTwo>
              <P>{traineeSay}</P>
            </div>
            <div className="right_testimonial_part">
              <div className="testimonial_slider">
                <Slider {...testimonialSettings}>
                  {testimonialData.map((testimonial, index) => (
                    <div key={index} className="testimonial_box_outer">
                      <div className="testimonial_box">
                        <div className="testi_head">
                          <figure>
                            <img src={thumb1} alt="" />
                          </figure>
                          <HeaderFive>{testimonial.name}</HeaderFive>
                        </div>
                        <div
                          className="testimonial_content"
                          style={
                            readMoreIndex === index
                              ? { maxHeight: "120px", overflowY: "scroll" }
                              : {}
                          }
                        >
                          <P>
                            {readMoreIndex === index
                              ? testimonial.message
                              : testimonial.message
                                  .split(" ")
                                  .slice(0, 12)
                                  .join(" ") + "..."}
                          </P>
                        </div>
                        <Button
                          className="black_btn"
                          // href="javascript:void(0)"
                          onClick={() => toggleReadMore(index)}
                        >
                          {readMoreIndex === index ? "Read Less" : "Read More"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* client rec */}


      {/* <section className="blog_sec">
        <div className="container">
          <div className="common_txt text-center">
            <span>OUR recent blogs</span>
            <HeaderTwo>Our News</HeaderTwo>
          </div>
          <div className="blog_slider">
            <Slider {...ourNewsSettings} afterChange={handleLoadMore}>
              {blogData.length > 0
                ? blogData.map((post) => (
                    <Link to={`/newsDetails/${post.slug}`}>
                      <div className="blog_box_outer">
                        <div className="blog_box">
                          <figure>
                            <img src={`${imageUrL}/${post.image}`} alt="" />
                          </figure>
                          <HeaderTwo variant="small-plus">
                            <Link to="#">Lorem Ipsum is simply dummy text</Link>
                          </HeaderTwo>
                          <P>{post.description}</P>
                          <ul>
                            <li>
                              <Link to="#">April 25 2023</Link>
                            </li>
                            <li>
                              <Link to="#">5 Comments</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  ))
                : null}
            </Slider>
          </div>
        </div>
        <div className="trans_receiver_image">
          <img src={trans} alt="" />
        </div>
      </section> */}

      <style>
        {`
          /* Custom dots styling */
          .custom-dots {
              display: flex !important;
              justify-content: center;
              margin-top: 20px; /* Adjust margin as needed */
          }

          .custom-dots button {
              background: white;
              border: none;
              cursor: pointer;
              margin-right: 5px !important;
              font-size: 0
          }

          .custom-dots span {
              width: 30px; /* Adjust width as needed */
              height: 2px;
              background-color: white;
          }
        `}
      </style>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};
// export default Home;
export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  withNamespaces()(Home)
);
