import ProductForm from "@/components/modules/Products/ProductForm/ProductForm";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./AddProductModal.module.scss";

type Props = {
  showed: boolean;
  toggleModal: () => void;
};

const AddProductModal = ({ showed, toggleModal }: Props) => {
  // TODO make with portal

  return (
    <div className={`${styles["modal"]} theme-bg`}>
      <div className={styles["content"]}>
        <h3 className={styles["title"]}>Fill product fields</h3>
        <ProductForm successCallback={toggleModal} />
        <button onClick={toggleModal} className={styles["close-button"]}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;
