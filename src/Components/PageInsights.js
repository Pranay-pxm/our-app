import { useEffect, useState } from "react";

const getPageInsightsData = async ({ pixelMarkObj, setPageData }) => {
  const { access_token: accessToken = "", id } = pixelMarkObj;

  console.log(
    `${id}/insights?metric=page_engaged_users&access_token=${accessToken}&period=day&&period=day&since=2020-11-26&until=2020-12-18`
  );

  await FB.api(
    `${id}/insights?metric=page_engaged_users&access_token=${accessToken}&period=day&&period=day&since=2020-11-26&until=2020-12-18`,
    function (response) {
      console.log("page response", response);

      if (response && !response.error) {
        /* handle the result */
        setPageData(response);
      }
    }
  );
};

const PageInsights = ({ pageObj }) => {
  console.log("pageObj", pageObj);
  const [pageData, setPageData] = useState({});
  const { data = [] } = pageObj;

  const pixelMarkObj = data.find((obj) => obj.name === "Pixel Mark");

  console.log("pixelMarkObj", pixelMarkObj);

  useEffect(() => {
    getPageInsightsData({ pixelMarkObj, setPageData });
  }, [pixelMarkObj]);

  return <div className="App">{pageObj.toString()}</div>;
};

export default PageInsights;
