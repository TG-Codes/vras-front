import React, { useEffect, useState } from "react";
import news_ban from "../../../../utility/assets/images/news_ban.jpg";
import news_dtls from "../../../../utility/assets/images/news_dtls.jpg";
import dtls1 from "../../../../utility/assets/images/dtls1.jpg";
import dtls2 from "../../../../utility/assets/images/dtls2.jpg";
import dtls3 from "../../../../utility/assets/images/dtls3.jpg";
import news5 from "../../../../utility/assets/images/news5.jpg";
import news6 from "../../../../utility/assets/images/news6.jpg";
import { Link, useNavigate, useParams, redirect } from "react-router-dom";
import axios from "axios";
import { P, HeaderOne, HeaderTwo, HeaderThree, HeaderFour, HeaderFive, HeaderSix } from "../../../../utility/components/Typography";
import Button from "../../../../utility/components/Button";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
const baseUrL = process.env.REACT_APP_BASE_URL;
const imageUrL = process.env.REACT_APP_IMAGE_URL;
const NewsDetails = (props) => {
  const { t } = props;
  const { slug } = useParams();
  const [blogDetailsData, setBlogDetailsData] = useState("");
  useEffect(() => {
    fetchNewsDetails();
    fetchBlogData();
  }, [slug]);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const filteredData = blogData.filter((item) => {
    return item.slug !== slug;
  });
  console.log("filtered data", filteredData);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalFetched, setTotalFetched] = useState(0);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        `${baseUrL}/blogs?page=${pageNumber}&length=3`
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
    fetchBlogData();
  };
  const fetchNewsDetails = async () => {
    if (slug) {
      const response = await axios.get(`${baseUrL}/blogs/show/${slug}`);
      setBlogDetailsData(response.data.data);
    } else {
      redirect("/latestnews");
    }
  };
  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={news_ban} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne>
            Lorem Ipsum is simply dummy text of the printing{" "}
          </HeaderOne>
        </div>
      </section>

      <section className="news_blog">
        <div className="container">
          <div className="news_dtls_top">
            <div className="trainning_price_innr">
              <div className="blog_box">
                <figure>
                  <img src={`${imageUrL}/${blogDetailsData.image}`} alt="" />
                </figure>
                <ul>
                  <li>
                    <a href="javascript:void(0);">Creative</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">Technology</a>
                  </li>
                </ul>
                <h2>
                  <a href="javascript:void(0);">
                    Lorem Ipsum is simply dummy text
                  </a>
                </h2>
                <div className="news_details_para">
                  <P>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum{" "}
                  </P>
                  <P>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem
                    Ipsum
                  </P>

                  <ul className="listing_news">
                    <li>
                      <P>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                        dummy text of the printing and typesetting industry.
                      </P>
                    </li>
                    <li>
                      <P>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                        dummy text of the printing and typesetting industry.
                      </P>
                    </li>
                    <li>
                      <P>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum Lorem Ipsum is simply
                        dummy text of the printing and typesetting industry.
                      </P>
                    </li>
                  </ul>
                </div>
                <div className="tags_holder">
                  <a className="black_btn" href="javascript:void(0)">
                    Police
                  </a>
                  <a className="black_btn" href="javascript:void(0)">
                    Security
                  </a>
                  <a className="black_btn" href="javascript:void(0)">
                    Armed Forces
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="related_news">
            <div className="related_news_text">
              <P>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </P>
            </div>
            <h2>Related News & Articles</h2>
            <div className="row">
              {filteredData
                ? filteredData.map((post) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={post.id}>
                        <Link to={`/newsDetails/${post.slug}`}>
                          <div className="blog_box">
                            <figure>
                              <img src={`${imageUrL}/${post.image}`} alt="" />
                            </figure>
                            <ul>
                              <li>
                                <a href="javascript:void(0);">Creative</a>
                              </li>
                              <li>
                                <a href="javascript:void(0);">Technology</a>
                              </li>
                            </ul>
                            <HeaderTwo variant="small-plus">
                              <a href="javascript:void(0);">{post.name}</a>
                            </HeaderTwo>
                            <P
                              dangerouslySetInnerHTML={{
                                __html: post.description,
                              }}
                            ></P>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="load_more_holder text-center">
              {totalFetched < totalCount && (
                <Button className="black_btn" onClick={handleLoadMore}>
                  {t("loadMore")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};

export default connect(mapStateToProps, {})(withNamespaces()(NewsDetails));
// export default NewsDetails;
