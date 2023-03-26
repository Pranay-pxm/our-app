import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PageInsights from "./Components/PageInsights";

const getLoginStatus = async () => {
  let loginStatus = false;
  await FB.getLoginStatus(function (response) {
    console.log("response", response);
    if (response.status === "connected") {
      loginStatus = true;
    }
  });
  return loginStatus;
};

const fbLogin = async ({ setLoginResponse }) => {
  const isUserLoggedIn = await getLoginStatus();
  console.log("getLoginStatus", isUserLoggedIn);
  if (!isUserLoggedIn) {
    await FB.login(
      function (response) {
        console.log(response);
        setLoginResponse(response);
        if (response.status === "connected") {
          // Logged into your webpage and Facebook.
        } else {
          // The person is not logged into your webpage or we are unable to tell.
        }
      },
      {
        scope:
          "user_birthday,user_hometown,user_location,user_likes,user_events,user_photos,user_videos,user_friends,user_posts,user_gender,user_link,user_age_range,email,read_insights,publish_video,catalog_management,user_managed_groups,groups_show_list,pages_manage_cta,pages_manage_instant_articles,pages_show_list,read_page_mailboxes,ads_management,ads_read,business_management,pages_messaging,pages_messaging_phone_number,pages_messaging_subscriptions,instagram_basic,instagram_manage_comments,instagram_manage_insights,publish_to_groups,groups_access_member_info,leads_retrieval,whatsapp_business_management,attribution_read,pages_read_engagement,pages_manage_metadata,pages_read_user_content,pages_manage_ads,pages_manage_posts,pages_manage_engagement,public_profile",
      }
    );
  }
};

const getPageListAccessToken = async ({ loginResponse, setPageObj }) => {
  const { authResponse = {} } = loginResponse;
  console.log(
    `${authResponse.userID}/accounts?fields=name,access_token&access_token=${authResponse.accessToken}`
  );
  await FB.api(
    `${authResponse.userID}/accounts?fields=name,access_token&access_token=${authResponse.accessToken}`,
    function (response) {
      setPageObj(response);
    }
  );
};

const test = () => {
  function testAPI() {
    // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me", function (response) {
      // document.getElementById("status").innerHTML =
      //   "Thanks for logging in, " + response.name + "!";
    });
  }
};

function App() {
  const [loginResponse, setLoginResponse] = useState({});
  const [pageObj, setPageObj] = useState({});
  useEffect(() => {
    fbLogin({ setLoginResponse });
  }, []);

  useEffect(() => {
    async function tempFunc() {
      const isLoggedIn = await getLoginStatus();
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn) {
        await getPageListAccessToken({ loginResponse, setPageObj });
      }
    }
    tempFunc();
  }, [loginResponse]);

  console.log("loginResponse", loginResponse);

  // return <PageInsights/>

  return (
    <div className="App">
      <PageInsights pageObj={pageObj} />
    </div>
  );
}

export default App;
