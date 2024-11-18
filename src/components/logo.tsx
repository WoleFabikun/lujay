import Link from "next/link";
import Image from "next/image";
import styles from "../styles/logo.module.css";

const Logo = () => {
  return (
    <Link href={"/"}>
      <span className={styles.logo}>
        <Image src="/lubot.png" alt="Wole Fabikun" width={30} height={45} />
      </span>
    </Link>
  );
};

export default Logo;