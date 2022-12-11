import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useTransition as useNavigation,
} from "@remix-run/react";
import styles from "~/styles/note-details.css";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const note = await db.note.findUnique({
    where: { id: params.noteId },
  });

  if (!note) {
    throw json(
      { message: "Could not find note for id " + params.noteId },
      { status: 404 }
    );
  }

  const data = { note };
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const button = form.get("button");
  if (button === "delete") {
    const note = await db.note.findUnique({
      where: { id: params.noteId },
    });

    if (!note) {
      throw json(
        { message: "Could not find note for id " + params.noteId },
        { status: 404 }
      );
    }
    await db.note.delete({ where: { id: params.noteId } });
    return redirect("/notes");
  }
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export function meta({ data }) {
  return {
    title: data.note.title,
    description: "Manage your notes with ease.",
  };
}

export default function NoteDetailsPage() {
  const { note } = useLoaderData();
  const navigation = useNavigation();
  const isDeleting = navigation.submission?.formData.get("button") === "delete";

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
      <div className="form-actions">
        <Form method="post">
          <button
            className="btn btn-delete"
            name="button"
            value="delete"
            disabled={isDeleting}
          >
            {" "}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </Form>
      </div>
    </main>
  );
}
