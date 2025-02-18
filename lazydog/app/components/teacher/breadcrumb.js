import Link from "next/link";
import styles from "../../product/list/list.module.css";

const Breadcrumbs = ({ links }) => {
  return (
    <div className={styles.Breadcrumbs}>
      {links.map((link, index) => (
        <span key={index}>
          <Link
            href={link.href}
            className={link.active ? styles.BreadcrumbsActive : ""}
          >
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <img src="/product/font/right.png" alt="" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
