import { useState } from "react";

import Cropper from "react-easy-crop";

import type { Area } from "react-easy-crop";

type Props = {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  classes?: {
    containerClassName?: string;
    mediaClassName?: string;
    cropAreaClassName?: string;
  };
  onZoomChange: (value: number) => void;
  onCropChange: (crop: { x: number; y: number }) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
};

const CropperImage = (props: Props) => {
  if (!props.image) return null;

  return <Cropper {...props} />;
};

export default CropperImage;
