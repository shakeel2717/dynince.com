import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const CookieAccept = ({ iUnderStand }: any) => {
  const { t } = useTranslation("common");
  return (
    <div className="wrapper">
      <img src="/undraw_warning_re_eoyh.svg" />
      <div className="content">
        <header>{t("Cookies Constent")}</header>
        <p>
          {t("This website use cookies to ensure you get the besr experience")}
        </p>
        <div className="buttons">
          <button
            className="item"
            onClick={() => {
              iUnderStand();
            }}
          >
            {t("I understand")}
          </button>
          <Link href="/page-details/privacy">
            <a href="#" className="item">
              {t("privacy policy")}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieAccept;
