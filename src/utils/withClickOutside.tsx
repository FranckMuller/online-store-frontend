import { useState, useEffect, useRef } from "react";
import type {
  RefAttributes,
  ForwardRefExoticComponent,
  MutableRefObject,
} from "react";

export type DropdownProps = {
  opened: boolean;
  toggleDropdown: (arg0: boolean) => void;
};

export const withClickOutside = <P,>(
  WrappedComponent: ForwardRefExoticComponent<
    P & DropdownProps & RefAttributes<HTMLDivElement>
  >
) => {
  const Component = (props: P) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;
    const [opened, setOpened] = useState(false);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (!ref.current) return null;
        if (!ref.current.contains(e.target as HTMLDivElement)) {
          setOpened(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
      <WrappedComponent
        opened={opened}
        toggleDropdown={setOpened}
        ref={ref}
        {...props}
      />
    );
  };

  return Component;
};
