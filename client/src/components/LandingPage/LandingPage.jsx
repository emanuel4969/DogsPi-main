import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingSection}>
      <div className={styles.landingBox}>
        <h1 className={styles.landingHeading}>
          Welcome to Henry Dogs!
        </h1>
        <p className={styles.p}>Join the Henry dog community and learn all about our canine friends!</p>
        <Link to="/Home">
          <button className={styles.landingButton}>Get In</button>
        </Link>
      </div>
    </div>
  );
}
