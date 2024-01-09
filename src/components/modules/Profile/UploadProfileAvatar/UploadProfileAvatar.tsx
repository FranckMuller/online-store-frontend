import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setAvatarMini } from "@/store/auth/auth.slice";
import CropperImage from "@/components/modules/CropperImage/CropperImage";

import { IoMdClose } from "react-icons/io";

import { getCroppedImg } from "@/utils/canvas.utils";
import { getBlobImageUrl } from "@/utils/images.utils";

import * as Api from "@/api";

import type { Area } from "react-easy-crop";

import styles from "./UploadProfileAvatar.module.scss";

const CROP_AREA_ASPECT = 4 / 4;

const Output = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className={styles["output"]}>
      <img src={imageSrc as string} alt="" />
    </div>
  );
};

const UploadProfileAvatar = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { mutate: updateAvatar, isLoading } = useMutation({
    mutationFn: (data: FormData) => Api.users.updateAvatar(data),
    onSuccess: (avatar) => {
      console.log(avatar);
      reset();
      queryClient.invalidateQueries(["profile"]);
      dispatch(setAvatarMini(avatar));
    },
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [image, setImage] = useState<Blob | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageSrc = getBlobImageUrl(file);
      console.log(imageSrc);
      setImageSrc(imageSrc);
    }
  };

  const showCroppedImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (croppedImage) {
          setImage(croppedImage.image);
          setCroppedImage(croppedImage.url);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (value: number) => {
    setZoom(value);
  };

  const onAvatarUpdate = async () => {
    if (image) {
      const data = new FormData();
      let img = new File([image], "avatar.jpg", { type: "image/jpg" });
      try {
        data.append("avatar", img);
        updateAvatar(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onFileUpload = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const reset = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setImage(null);
    setCroppedAreaPixels(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const onClose = () => {
    reset();
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
              classes={{ cropAreaClassName: styles["crop-area"] }}
            />
          </div>

          <div className={styles["viewer-wrapper"]}>
            <div className={styles["viewer"]}>
              {croppedImage && <Output imageSrc={croppedImage} />}
            </div>
            <div className={styles["controls"]}>
              <button onClick={onAvatarUpdate} className="btn-primary">
                Save
              </button>
              <button onClick={showCroppedImage} className="btn-secondary">
                Crop
              </button>
            </div>
          </div>
          <button onClick={onClose} className={styles["close-btn"]}>
            <IoMdClose />
          </button>
        </div>
      )}

      <button
        onClick={onFileUpload}
        className={`${styles["upload-btn"]} btn-outline-theme`}
      >
        Upload photo
      </button>
      <input
        className={styles["file-input"]}
        ref={inputFileRef}
        type="file"
        onChange={onFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default UploadProfileAvatar;
