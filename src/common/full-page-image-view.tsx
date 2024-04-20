import { getImage, deleteImage } from '~/server/queries';
import { clerkClient } from '@clerk/nextjs/server';
import { Button } from '~/components/ui/button';

export default async function FullPageImageView(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error('Invalid photo ID');

  const image = await getImage(idAsNumber);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className='flex w-screen h-full min-w-0 items-center justify-center text-white'>
      <div className='flex-shrink flex-grow'>
        <img src={image.url} className='object-contain' />
      </div>

      <div className='flex w-56 border-l h-full flex-col flex-shrink-0'>
        <div className='border-b p-2 text-xl font-center'>{image.name}</div>

        <div className='p-2'>
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
          <img
            src={uploaderInfo.imageUrl}
            className='w-10 h-10 rounded-full'
          />
        </div>
        
        <div className='p-2'>
          <span>Created on:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className='p-2'>
          <form
            action={async () => {
              'use server';

              await deleteImage(iAsNumber);
            }}
          >
            <Button type='submit' variant='destructive'>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
