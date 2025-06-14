"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch("/api/blog/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.errno === 0) {
          setBlogList(data.data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <header>
        <h1>个人博客</h1>
      </header>

      <main>
        <ul>
          {blogList.map((blog: any) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </main>

      <footer>
        <p>Copyright 2025</p>
      </footer>
    </div>
  );
}
