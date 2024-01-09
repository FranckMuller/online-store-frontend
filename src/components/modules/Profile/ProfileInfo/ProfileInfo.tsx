import { useState } from "react";
import type { IFullestUser } from "@/interfaces/users.interface";

import styles from "./ProfileInfo.module.scss";

type Props = {
  profile: IFullestUser;
};

const ProfileInfo = ({ profile }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState();

  const onEditClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const onSubmit = () => {};

  return (
    <div className={styles["profile-info"]}>
      <form className={styles["form"]} onSubmit={onSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            readOnly={!isEditMode}
            type="text"
            value={profile.username}
            placeholder="Enter your name"
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            readOnly={!isEditMode}
            type="text"
            value={profile.email}
            placeholder="Enter your email"
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            readOnly={!isEditMode}
            type="text"
            value={profile.phone || ""}
            placeholder={isEditMode ? "Enter your phone number" : ""}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            readOnly={!isEditMode}
            type="text"
            value={profile.address || ""}
            placeholder={isEditMode ? "Enter your address" : ""}
          />
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className={`${styles["edit-button"]} btn-primary`}
        >
          edit
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
