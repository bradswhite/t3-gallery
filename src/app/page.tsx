import { getMyImages } from '~/server/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  //var images: any[] = [];
  //try {
  const images = await getMyImages();
  //} catch (error) {}

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className='w-48'>
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
