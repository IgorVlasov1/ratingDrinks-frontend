import React from "react";
import styles from "./footer.module.css";
import githubImg from "../assets/github.svg";
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <a className={styles.footerText}>
        © Администрация Сайта не несет ответственности за размещаемые
        Пользователями материалы, их содержание и качество.
      </a>
      <a href="https://github.com/IgorVlasov1" target="_blank">
        <img src={githubImg} alt="123" />
      </a>
    </div>
  );
};

export default Footer;
