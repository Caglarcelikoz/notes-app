import {
  Form,
  useTransition as useNavigation,
  useActionData,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import styles from "./NewNote.css";

export default function NewNote() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  let formRef = useRef<HTMLFormElement>(null);
  let titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      titleRef.current?.focus();
    }
  }, [isSubmitting]);
  return (
    <Form ref={formRef} method="post" id="note-form">
      {data?.message && <p className="error-message">{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input ref={titleRef} type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows={3} />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
