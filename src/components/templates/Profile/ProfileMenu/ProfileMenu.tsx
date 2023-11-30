import GeneralMenu from "./GeneralMenu/GeneralMenu";
import SettingsMenu from "./SettingsMenu/SettingsMenu";

import styles from './ProfileMenu.module.scss'

const ProfileMenu = () => {
  return (
    <>
    <div className={styles['general']}>
    
      <GeneralMenu />
    </div>
    <div className={styles['settings']}>
    
      <SettingsMenu />
    </div>
    </>
  );
};

export default ProfileMenu;
