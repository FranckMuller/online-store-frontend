import clsx from "clsx";
import Image from "next/image";
import { CiCircleRemove } from "react-icons/ci";
import type { IProductPreviewImage } from "@/interfaces/products.interface";

import styles from "./PreviewImages.module.scss";

type Props = {
  images: Array<IProductPreviewImage>;
  setMainImage: (id: string) => void;
  deleteImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
};

const PreviewImages = ({ images, setMainImage, deleteImage }: Props) => {
  const content = images.map((i, idx) => {
    const mainClass = styles["main"];
    return (
      <div
        key={i.id}
        onClick={() => setMainImage(i.id)}
        className={clsx(styles["preview"], i.isMain && mainClass)}
      >
        <Image src={i.path} width={70} height={70} alt={i.path} />
        <button
          onClick={(e) => deleteImage(e, i.id)}
          className={styles["delete-button"]}
          type="button"
        >
          <CiCircleRemove />
        </button>
      </div>
    );
  });

  return <div className={styles["preview-images"]}>{content}</div>;
};

export default PreviewImages;
