import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import CropperImage from "@/components/modules/CropperImage/CropperImage";
import ProfileAvatar from "@/components/templates/Profile/ProfileAvatar/ProfileAvatar";

import { getCroppedImg } from "@/utils/canvasUtils";

import type { Area } from "react-easy-crop";

import styles from "./UploadProfileAvatar.module.scss";

const CROP_AREA_ASPECT = 4 / 4;

const readFile = async (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const Output = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className={styles["output"]}>
      <img src={imageSrc as string} alt="" />
    </div>
  );
};

const UploadProfileAvatar = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [rotation, setRotation] = useState(0);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
    }
  };

  const showCroppedImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        );
        setCroppedImage(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (value: number) => {
    setZoom(value);
  };

  return (
    <div className={styles["upload-avatar"]}>
      {imageSrc && (
        <div className={styles["cropper-wrapper"]}>
          <div className={styles["cropper"]}>
            <CropperImage
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={CROP_AREA_ASPECT}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className={styles["viewer-wrapper"]}>
            <div className={styles["viewer"]}>
              {croppedImage && <Output imageSrc={croppedImage} />}
            </div>
            <div className={styles["controls"]}>
              <button
                onClick={showCroppedImage}
                className={`${styles["crop-button"]} btn-primary`}
              >
                Save
              </button>
              <button
                onClick={showCroppedImage}
                className={`${styles["crop-button"]} btn-secondary`}
              >
                Crop
              </button>
            </div>
          </div>
        </div>
      )}
      <input type="file" onChange={onFileChange} accept="image/*" />
    </div>
  );
};

export default UploadProfileAvatar;
