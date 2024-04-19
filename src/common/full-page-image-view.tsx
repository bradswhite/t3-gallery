import { getImage } from '~/server/queries';
import { clerkClient } from '@clerk/nextjs/server';

export default async function FullPageImageView(props: { id: string }) {
  const idAsNumber = Number(props.id);
  if(Number.isNaN(idAsNumber)) throw new Error('Invalid photo ID');

  const image = await getImage(idAsNumber);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className='flex w-full h-full min-w-0'>
      <div className='flex-shrink flex justify-center items-center'>
        <img src={image.url} className='flex-shrink object-contain' />
      </div>

      <div className='flex w-48 flex-col flex-shrink-0'>
        <div className='text-xl font-bold'>{image.name}</div>
      </div>

      <div className='flex flex-col p-2'>
        <span>Uploaded by:</span>
        <span>{uploaderInfo.fullName}</span>
        <img
          src={uploaderInfo.imageUrl}
          className='w-10 h-10 rounded-full'
        />
      </div>
      <div className='flex flex-col p-2'>
        <span>Created on:</span>
        <span>{new Date(image.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
