import i18n from "../../../../i18n.js";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import about_us from '../../../../utility/assets/images/about-us.jpg';
import about_service_back from '../../../../utility/assets/images/about_service_back.jpg';
import stratigy from '../../../../utility/assets/images/stratigy.jpg';
import hunting from '../../../../utility/assets/images/hunting.png';
import training from '../../../../utility/assets/images/training.png';
import shooting from '../../../../utility/assets/images/shooting.png';

import accessible from "../../../../utility/assets/images/accessible.png";
import custom from "../../../../utility/assets/images/custom.png";
import lowCost from "../../../../utility/assets/images/lowCost.png";
import secure from "../../../../utility/assets/images/secure.png";

import we_provide from '../../../../utility/assets/images/we_provide.jpg';
import video1 from "../../../../utility/assets/images/video1.jpg";
import video2 from "../../../../utility/assets/images/video2.jpg";
import video3 from "../../../../utility/assets/images/video3.jpg";
import play_button from "../../../../utility/assets/images/play-button.png";
import axios from 'axios';
import { connect } from "react-redux";
import { P, HeaderOne, HeaderTwo, HeaderThree, HeaderFour, HeaderFive } from '../../../../utility/components/Typography';
import { withNamespaces } from "react-i18next";
const baseURL = process.env.REACT_APP_BASE_URL;
const AboutUs = (props) => {
   const {t}=props;
   const language = i18n.language;
   const [strategyOne, setStrategyOne]=useState([])
   const [strategyTwo, setStrategyTwo]=useState([])
   const [strategyThree, setStrategyThree]=useState([])
   const [middleTextOne, setMiddleTextOne]=useState([])
   const [middleTextTwo, setMiddleTextTwo]=useState([])
   const [middletextThree, setMiddleTextThree]=useState([])
   const [weProvideOne, setWeProvideOne]=useState([])
   const [weProvideTwo, setWeProvideTwo]=useState([])
   const [weProvideThree, setWeProvideThree]=useState([])
   const [weProvideFour, setWeProvideFour]=useState([])
   const [weProvideFive, setWeProvideFive]=useState([])
   const [whoAreWeOne, setWhoAreWeOne]=useState([])
   const [whoAreWeTwo, setWhoAreWeTwo]=useState([])

   useEffect(()=>{
      getStrategyData()
      getStrategyDataTwo()
      getStrategyDataThree()
      getinnerAboutUSOne()
      getinnerAboutUSTwo()
      getinnerAboutUSThree()
      getWhatWeProvide()
      getWhatWeProvideTwo()
      getWhatWeProvideThree()
      getWhatWeProvideFour()
      getWhatWeProvideFive()
      getWhoAreWeData()
      getWhoAreWeDataTwo()
   },[])
   const getStrategyData = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/about-our-strategy-one`)
         setStrategyOne(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getStrategyDataTwo = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/about-our-strategy-two`)
         setStrategyTwo(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getStrategyDataThree = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/about-our-strategy-three`)
         setStrategyThree(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   
   const getWhoAreWeData = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/who-are-we-one`)
         setWhoAreWeOne(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getWhoAreWeDataTwo = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/who-are-we-two`)
         setWhoAreWeTwo(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }

   const getinnerAboutUSOne = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/inner-about-us-one`)
         setMiddleTextOne(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getinnerAboutUSTwo = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/inner-about-us-two`)
         setMiddleTextTwo(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getinnerAboutUSThree = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/inner-about-us-three`)
         setMiddleTextThree(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getWhatWeProvide = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/what-we-provide-one`)
         setWeProvideOne(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getWhatWeProvideTwo = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/what-we-provide-two`)
         setWeProvideTwo(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getWhatWeProvideThree = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/what-we-provide-three`)
         setWeProvideThree(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getWhatWeProvideFour = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/what-we-provide-four`)
         setWeProvideFour(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
   const getWhatWeProvideFive = async ()=>{
      try{
         const response = await axios.get(`${baseURL}/cms/what-we-provide-five`)
         setWeProvideFive(response.data.data)
         return response
      }catch (error){
         console.log(error)
      }
   }
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
  return (
   <>
         <section className="banner_main about_ban">
         <div className="inner_banner_img">
            <img src={about_us} alt=""/>
         </div>
         <div className="banner_txt">
            <HeaderOne>{t("aboutUsTitle")}</HeaderOne>
         </div>
      </section>
      
      <section className="who_we_sec strategy_sec">
         <div className="container">
            <div className="row">
               <div className="col-lg-6">
                  <div className="who_we_img">
                     <img src={stratigy} alt=""/>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="who_we_txt">
                     <div className="common_txt">
                        <HeaderTwo>{t("whoAreWe")}</HeaderTwo>
                     </div>
                     <P>{whoAreWeOne[language]}</P>
                     <P>{whoAreWeTwo[language]}</P>
                     {/* <P>{strategyThree[language]}</P> */}
                  </div>
               </div>
            </div>
         </div>
      </section>
   
      <section className="service_sec" style={{backgroundImage: `url(${about_service_back})`}}>
         <div className="container">
            <div className="service_list">
               <ul>
                  <li>
                     <figure><img src={custom} alt=""/></figure>
                     <a href="javascript:void(0);">{t("homePageCustomizable")}</a>
                  </li>
                  <li>
                     <figure><img src={lowCost} alt=""/></figure>
                     <a href="javascript:void(0);">{t("homePageLowCost")}</a>
                  </li>
                  <li>
                     <figure><img src={secure} alt=""/></figure>
                     <a href="javascript:void(0);">{t("homePageSecure")}</a>
                  </li>
                  <li>
                     <figure><img src={accessible} alt=""/></figure>
                     <a href="javascript:void(0);">{t("homePageAccessible")}</a>
                  </li>
               </ul>
            </div>
         </div>
      </section>
    
      <section className="we_do_sec we_provide">
         <div className="container">
            <div className="we_provide_text">
               <div className="who_we_txt">
                  <P>{middleTextOne[language]}</P>
                  <P>{middleTextTwo[language]}</P>
                  <P>{middletextThree[language]}</P>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-5">
                  <div className="we_do_img">
                     <figure>
                        <img src={we_provide} alt=""/>
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
                     <P>{weProvideOne[language]}</P>
                     <P>{weProvideTwo[language]}</P>
                     <P>{weProvideThree[language]}</P>
                     {/* <ul>
                        <li>{weProvideFour[language]}</li>
                        <li>{weProvideFive[language]}</li>
                     </ul> */}
                  </div>
               </div>
            </div>
         </div>
      </section>
     
      <section className="video_slide_sec about_video">
         <div className="video_slider">
         <Slider {...videoSettings}> 
            <div className="video_slide_itm">
               <figure>
                  <img src={video1} alt=""/>
                  <a className="play_btn" href="javascript:void(0)"><img src={play_button} alt=""/></a>
               </figure>
            </div>
            <div className="video_slide_itm">
               <figure>
                  <img src={video2} alt=""/>
                  <a className="play_btn" href="javascript:void(0)"><img src={play_button} alt=""/></a>
               </figure>
            </div>
            <div className="video_slide_itm">
               <figure>
                  <img src={video3} alt=""/>
                  <a className="play_btn" href="javascript:void(0)"><img src={play_button} alt=""/></a>
               </figure>
            </div>
            </Slider>
         </div>
      </section>
   </>
  )
}
const mapStateToProps = (globalState) => {
   console.log("globalState", globalState);
   return { userData: globalState.mainReducerData.userData };
 };
 export default connect(mapStateToProps, {})(
   withNamespaces()(AboutUs)
 );
// export default AboutUs