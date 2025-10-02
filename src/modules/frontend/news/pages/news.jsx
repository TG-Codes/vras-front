import i18n from "../../../../i18n.js";
import React, { useEffect, useState } from "react";
import news_ban from "../../../../utility/assets/images/news_ban.jpg";
import news1 from "../../../../utility/assets/images/news1.jpg";
import news2 from "../../../../utility/assets/images/news2.jpg";
import news3 from "../../../../utility/assets/images/news3.jpg";
import news4 from "../../../../utility/assets/images/news4.jpg";
import news5 from "../../../../utility/assets/images/news5.jpg";
import news6 from "../../../../utility/assets/images/news6.jpg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../../../../utility/components/Button";
import { withNamespaces } from "react-i18next";
import { P, HeaderOne,HeaderTwo, HeaderThree, HeaderFour, HeaderFive, HeaderSix } from "../../../../utility/components/Typography.jsx";

const baseUrL = process.env.REACT_APP_BASE_URL;
const imageUrL = process.env.REACT_APP_IMAGE_URL;
const News = (props) => {
  const { t } = props;
  const [blogData, setBlogData] = useState([]);
  // const [displayCount, setDisplayCount] = useState(3);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalFetched, setTotalFetched] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
    fetchData();
  };
  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={news_ban} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne>{t("newsPageTitle")}</HeaderOne>
        </div>
      </section>

      <section className="news_blog">
        <div className="container">
          <div className="common_txt text-center">
            <span>OUR blog</span>
            <HeaderTwo>{t("ourNews")}</HeaderTwo>
          </div>
          <div className="trainning_price_innr">
            <div className="row">
              {blogData.length > 0
                ? blogData.map((post) => (
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
                  ))
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
  return { userData: globalState.mainReducerData.userData };
};
export default connect(mapStateToProps, {})(withNamespaces()(News));
// export default News;
