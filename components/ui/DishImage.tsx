import Image from "next/image";

interface DishImageProps {
  src: string;
  alt: string;
  /** Aspect ratio of the editorial crop. */
  ratio?: "portrait" | "landscape" | "square";
  sizes: string;
  priority?: boolean;
  className?: string;
}

const ratios: Record<NonNullable<DishImageProps["ratio"]>, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

/**
 * Square-cornered, shadow-free editorial image crop.
 * Hover scales the photograph to 1.02 over 500ms — nothing else moves.
 */
export default function DishImage({
  src,
  alt,
  ratio = "portrait",
  sizes,
  priority = false,
  className = "",
}: DishImageProps) {
  return (
    <div className={`group/img relative overflow-hidden bg-ink ${ratios[ratio]} ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
      />
    </div>
  );
}
