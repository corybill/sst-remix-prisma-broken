import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const meta = () => {
  return [
    { title: "SST Remix Prisma Broken" },
    { name: "description", content: "Welcome to Broken!" },
  ];
};

export async function loader() {
  try {
    const params = { where: { userId: "1" } };
    return await prisma.Users.findUnique(params);
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

export default function Index() {
  return (
    <div>
      Check logs for error
    </div>
  );
}
