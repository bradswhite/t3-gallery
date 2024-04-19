import { SignedIn, SignedOut } from '@clerk/nextjs';
import { getMyImages } from '~/server/queries';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image) => (
        <div key={image.id} className='w-48 h-48 flex flex-col'>
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: 'contain' }}
              width={480}
              height={480}
              alt={image.name}
            />
            <div>{image.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className='h-full w-full text-center text-2xl'>
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  )
}
