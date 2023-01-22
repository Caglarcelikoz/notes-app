const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getNotes().map((note) => {
      return db.note.create({ data: note });
    }),
  );
}

seed();

function getNotes() {
  return [
    {
      title: "JavaScript Performance Tips",
      content: `We will look at 10 simple tips and tricks to increase the speed of your code when writing JS`,
    },
    {
      title: "Tailwind vs. Bootstrap",
      content: `Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them`,
    }
  ];
}
