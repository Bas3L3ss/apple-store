import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { cn } from "@/src/lib/utils";

const cld = new Cloudinary({ cloud: { cloudName: "dz1d1qgk2" } });

const CloudinaryImage = ({
  publicId,
  //@ts-expect-error:no problem
  width = 500,
  //@ts-expect-error:no problem
  height = 500,
  className,
  alt,
}: {
  width?: number;
  height?: number;
  publicId: string;
  className?: string;
  alt?: string;
}) => {
  const img = cld.image(publicId).format("auto").quality("auto");

  return (
    <AdvancedImage
      className={cn(className, "select-none")}
      alt={alt ?? ""}
      cldImg={img ?? ""}
    />
  );
};

export default CloudinaryImage;
