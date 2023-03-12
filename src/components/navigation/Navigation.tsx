import Link from "next/link";
import { useState, useRef, Ref, forwardRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import Drawer from "../drawer/Drawer";

type Sublink = {
  label: string;
  href?: string;
  icon?: string;
  description?: string;
};

export type NavLink = {
  label: string;
  href?: string;
  sublinks?: Sublink[];
};

const NavigationItem = forwardRef(
  ({ label, href, sublinks = [] }: NavLink, ref: Ref<HTMLButtonElement>) => {
    const hasSubLinks = sublinks.length > 0;

    if (!hasSubLinks && !href) {
      throw new Error("NavigationItem must have either a href or sublinks");
    }

    if (!hasSubLinks) {
      return (
        <button className="py-1 px-2 group inline-flex items-center rounded text-base font-medium hover:text-opacity-100 hover:opacity-70 transition-all outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-50">
          {label}
        </button>
      );
    }

    return (
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                mx-12
                py-1 px-2
                focus:outline-none focus-visible:ring outline-none focus-visible:ring-rose-500 focus-visible:ring-opacity-50
                group inline-flex items-center rounded text-base font-medium hover:text-opacity-100 hover:opacity-70 transition-all`}
              //   onClick={() => setIsHovered(!isHovered)}
              //   onKeyDown={(e) => {
              //     if (e.key === "Enter") {
              //       setIsHovered(!isHovered);
              //     }
              //   }}
            >
              <span>{label}</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-1 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 pt-4 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative pt-3 grid gap-8 bg-white p-7">
                    {/* <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2"> */}

                    {sublinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href || "#"}
                        className="flex items-center rounded p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-50"
                      >
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-slate-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-slate-800">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-slate-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  }
);

NavigationItem.displayName = "NavigationItem";

type NavigationProps = {
  links: any[];
};
const Navigation = ({ links }: NavigationProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav className="w-full justify-center">
      <div className="hidden lg:flex">
        <Popover.Group className="p-4 flex w-full max-w-7xl justify-center">
          {links.map((item) => (
            <NavigationItem
              key={item.label}
              href={item.href}
              label={item.label}
              sublinks={item.sublinks || []}
            />
          ))}
        </Popover.Group>
      </div>

      <div className="flex lg:hidden">
        <Bars3Icon
          className="absolute top-4 right-4 h-8 w-8"
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        Drawer content here
        <div className="my-40">more 1 </div>
        <div className="my-40">more 2 </div>
        <div className="my-40">more 3 </div>
      </Drawer>
    </nav>
  );
};

export default Navigation;
