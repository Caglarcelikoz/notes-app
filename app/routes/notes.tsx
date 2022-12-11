import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import NewNote, { links as newNoteLinks } from "~/components/note/NewNote";
import NoteList, { links as noteListLinks } from "~/components/note/NoteList";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    notes: await db.note.findMany({
      take: 20,
      select: { id: true, title: true, content: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  
  if (!data.notes || data.notes?.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }
  return data;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if(noteData.title.trim().length < 5) {
    return {message: 'invalid title - must be at least 5 chars long'}
  }
  

  await db.note.create({ data: noteData });
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
  return redirect("/notes");
};

export function meta() {
  return {
    title: 'All Notes',
    description: 'Manage your notes with ease.',
  };
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || 'Data not found.';

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export default function NotesPage() {
  const { notes } = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}
