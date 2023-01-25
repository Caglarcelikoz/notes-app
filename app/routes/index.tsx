import { Link } from "@remix-run/react";
import styles from "~/styles/home.css";

export default function Index() {
  return (
    <main id="content">
      <h1>Notes App</h1>

      <h2>Documentation</h2>
      <p>
        <a href="https://remix.run/" target="_blank">
          Remix.run
        </a>
      </p>
      <p>
        <a href="https://remix.run/blog/remix-vs-next" target="_blank">
          Remix vs Next.js
        </a>
      </p>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
