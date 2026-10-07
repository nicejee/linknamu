import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  image?: string;
};

export default function ProfileHeader({ name, bio, image }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          priority
          className="size-24 rounded-full object-cover shadow-md ring-4 ring-white sm:size-28"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-24 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-white shadow-md ring-4 ring-white sm:size-28"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-1 text-sm text-gray-600 sm:text-base">{bio}</p>
    </header>
  );
}
