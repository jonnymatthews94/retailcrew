interface AvatarGroupProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export function AvatarGroup({ images }: AvatarGroupProps) {
  // Only show first 4 images
  const visibleImages = images.slice(0, 4);

  return (
    <div className="flex -space-x-4">
      {visibleImages.map((image, i) => (
        <div
          key={i}
          className="relative h-12 w-12 rounded-full border-2 border-white ring-2 ring-white"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}