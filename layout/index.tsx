import Navbar from "components/common/navbar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { commomSettings } from "service/landing-page";
import { useEffect, useState } from "react";
import { GetUserInfoByTokenAction } from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "state/store";
import useTranslation from "next-translate/useTranslation";
import CookieAccept from "components/common/cookie-accept";
import Head from "next/head";
import { setLogo } from "state/reducer/user";
const Index = ({ children }: any) => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [showterms, setShowTerms] = useState(false);
  const [metaData, setMetaData] = useState({
    app_title: "",
    copyright_text: "",
    exchange_url: "TradexPro Exchange",
    favicon: "",
    login_logo: "",
    logo: "",
    maintenance_mode: "no",
  });
  const { isLoading, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const getCommonSettings = async () => {
    const response = await commomSettings();
    dispatch(setLogo(response.data.logo));
    setMetaData(response.data);
  };
  useEffect(() => {
    getCommonSettings();
  }, []);
  useEffect(() => {
    const path = router.pathname;
    if (
      path === "/authentication/signup" ||
      path === "/authentication/signin" ||
      path === "/exchange/dashboard" ||
      path === "/authentication/forgot-password" ||
      path === "/authentication/reset-password" ||
      path === "/authentication/g2f-verify" ||
      path === "/" ||
      path === "/authentication/verify-email" ||
      path === "user/notification"
    ) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }
  }, [router.pathname]);
  const iUnderStand = () => {
    Cookies.set("terms", "yes");
    setShowTerms(false);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    const terms = Cookies.get("terms");
    if (terms === "yes") {
      setShowTerms(false);
    } else {
      setShowTerms(true);
    }
    if (token) {
      dispatch(GetUserInfoByTokenAction());
    }
  }, [isLoggedIn]);
  return navbarVisible ? (
    <div>
      {isLoading && (
        <div className="preloder-area">
          <span
            className="spinner-border spinner-border-md"
            role="status"
            aria-hidden="true"
          ></span>
          <span>{t("Please wait")}</span>
        </div>
      )}
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="cp-user-main-wrapper">{children}</div>
      {showterms && <CookieAccept iUnderStand={iUnderStand} />}
    </div>
  ) : (
    <>
      <Head>
        <title>{metaData?.app_title || t("TradexPro Exchange")}</title>
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>{children}</div>
      {showterms && <CookieAccept iUnderStand={iUnderStand} />}
    </>
  );
};

export default Index;
