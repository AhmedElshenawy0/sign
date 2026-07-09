import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AboutText = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="text-black bg-white px-6 md:px-[230px] py-14 md:py-24"
    >
      <p className="pb-4 text-[16px] md:text-lg  leading-8 tracking-wider">
        {t("about.text.description")}
      </p>
    </div>
  );
};

export default AboutText;
