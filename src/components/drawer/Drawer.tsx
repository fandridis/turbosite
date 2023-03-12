import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Ref, forwardRef, useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
} from "~/libs/body-scroll-lock/bodyScrollLock";

export type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
};

const Drawer = forwardRef(
  ({ children, open, onClose }: DrawerProps, ref: Ref<HTMLDivElement>) => {
    useEffect(() => {
      if (open) {
        disableBodyScroll(document.body);
      } else {
        enableBodyScroll(document.body);
      }
    }, [open]);

    return (
      <div
        aria-hidden={!open}
        className={`fixed right-0 top-0 w-full h-full bg-slate-50 z-50 transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        ref={ref}
      >
        <XMarkIcon
          className="absolute top-4 right-4 h-8 w-8"
          onClick={onClose}
        />
        {children}
      </div>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
