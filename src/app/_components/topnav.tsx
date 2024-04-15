import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between w-full border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}

