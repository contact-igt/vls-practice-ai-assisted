import { useState } from "react";
import styles from "./styles.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => setIsOpen(false);

  const scrollTo = (id) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header role="banner">
      <div className="container-fluid">
        <nav
          className={`${styles.navbar} navbar navbar-expand-lg px-3`}
          aria-label="Main navigation"
        >
          <div className={styles.navlogo}>
            <a
              className="navbar-logo"
              href="https://www.vlslawacademy.com/"
              aria-label="VLS Law Academy home"
            >
              <img
                src={"/assets/home/vls_logo.png"}
                alt="VLS Law Academy"
              />
            </a>
          </div>

          {/* Toggle Button */}
          <button
            className={`${styles.navbarToggler} ${isOpen ? styles.open : ""}`}
            type="button"
            onClick={toggleNavbar}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="navbarContent"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>

          {/* Collapsible Menu */}
          <div
            className={`collapse navbar-collapse justify-content-between ${styles.submenu} ${isOpen ? "show" : ""}`}
            id="navbarContent"
          >
            <ul
              className={`nav navbar-nav navbar-right w-100 justify-content-center ${styles.pagemenu}`}
              role="list"
            >
              <li role="listitem">
                <button
                  className={styles.navlink}
                  onClick={() => scrollTo("what-learn-outcomes")}
                >
                  What You'll Learn
                </button>
              </li>
              <li role="listitem">
                <button
                  className={styles.navlink}
                  onClick={() => scrollTo("why-course")}
                >
                  Why This Program
                </button>
              </li>
              <li role="listitem">
                <button
                  className={styles.navlink}
                  onClick={() => scrollTo("practice-gap")}
                >
                  Testimonials
                </button>
              </li>
              <li role="listitem">
                <a
                  className={styles.navlink}
                  href="https://www.vlslawacademy.com/"
                  onClick={closeMenu}
                >
                  VLS Academy
                </a>
              </li>
            </ul>

            <div className={styles.nav_social_box}>
              <a
                href="tel:+919500207811"
                target="_blank"
                rel="noopener"
                aria-label="Call VLS Law Academy"
              >
                <i className="fa fa-phone" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.instagram.com/vlslawacademy/"
                target="_blank"
                rel="noopener"
                aria-label="VLS Law Academy on Instagram"
              >
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.youtube.com/@VLSLAWACADEMY"
                target="_blank"
                rel="noopener"
                aria-label="VLS Law Academy on YouTube"
              >
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.facebook.com/vlslawacademy"
                target="_blank"
                rel="noopener"
                aria-label="VLS Law Academy on Facebook"
              >
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
