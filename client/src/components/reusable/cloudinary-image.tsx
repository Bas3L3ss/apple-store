import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({ cloud: { cloudName: "dz1d1qgk2" } });

const CloudinaryImage = ({
  publicId,
  width = 500,
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
  const img = cld
    .image(publicId)
    .format("auto")
    .quality(2000)
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return (
    <AdvancedImage className={className ?? ""} alt={alt ?? ""} cldImg={img} />
  );
};

export default CloudinaryImage;
