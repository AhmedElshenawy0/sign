import "dotenv/config";
import { PrismaClient, type ProjectType, type StorageDriver } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const galleries: Array<{
  title: string;
  src: string;
  poster?: string;
  type: ProjectType;
}> = [
  { title: "Brand Story – 2024", src: "/videos/intro.mp4", poster: "/images/sign3.jpg", type: "videos" },
  { title: "Behind The Scenes", src: "/videos/intro.mp4", poster: "/images/sign1.jpg", type: "videos" },
  { title: "Client Testimonial", src: "/videos/intro.mp4", poster: "/images/sign7.jpg", type: "videos" },
  { title: "Promo Video", src: "/videos/intro.mp4", poster: "/images/sign2.jpg", type: "videos" },
  { title: "Music Visual", src: "/images/designs/design1.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design2.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design3.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design4.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design5.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design6.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design7.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design8.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design9.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design10.webp", type: "designs" },
  { title: "Music Visual", src: "/images/designs/design11.webp", type: "designs" },
  { title: "Music Visual", src: "/images/logos/logo1.webp", type: "logos" },
  { title: "Music Visual", src: "/images/logos/logo2.webp", type: "logos" },
  { title: "Music Visual", src: "/images/logos/logo3.webp", type: "logos" },
  { title: "Music Visual", src: "/images/logos/logo4.webp", type: "logos" },
  { title: "Music Visual", src: "/images/logos/logo5.webp", type: "logos" },
  { title: "Music Visual", src: "/images/logos/logo6.webp", type: "logos" },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@signup.local";
  const password = process.env.ADMIN_PASSWORD ?? "admin123456";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  const existing = await prisma.project.count();
  if (existing === 0) {
    await prisma.project.createMany({
      data: galleries.map((item, index) => ({
        title: item.title,
        type: item.type,
        mediaUrl: item.src,
        posterUrl: item.poster ?? null,
        sortOrder: index + 1,
        storageDriver: "public_asset" as StorageDriver,
      })),
    });
  }

  await prisma.siteSetting.upsert({
    where: { key: "intro_video" },
    update: {},
    create: {
      key: "intro_video",
      mediaUrl: "/videos/intro.mp4",
      storageDriver: "public_asset",
    },
  });

  console.log(`Seeded admin ${email} and ${galleries.length} gallery rows (if empty).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
