import Link from "next/link";
import { db } from "~/server/db"

export consst dynamic = 'force-dynamic';

const mockUrls = [
  'https://utfs.io/f/b261ea48-014d-4269-87cd-bd984bbf0389-ea5y60.jpg',
  'https://utfs.io/f/78f60c94-280b-464f-8936-2a9bb90ec2db-67pd54.jpg',
  'https://utfs.io/f/832e28d1-0232-44a4-a3c1-a1807433da32-sdlqix.png',
  'https://utfs.io/f/5554a4f6-97b2-43b8-baf1-1627b788413b-4fe5gm.jpg',
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>
            {post.name}
          </div>
        ))}
        {[...mockImages,...mockImages,...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
