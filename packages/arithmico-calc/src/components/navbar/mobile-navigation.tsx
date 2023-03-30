import { MenuIcon } from "@arithmico/frontend-components";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NavigationProps } from "./types";

interface DisclosureContentProps {
  children: ReactNode;
  close: () => void;
}

function DisclosureContent({ children, close }: DisclosureContentProps) {
  const location = useLocation();
  const [t] = useTranslation();

  useEffect(() => {
    close();
  }, [close, location]);

  return (
    <>
      <Disclosure.Button
        className={classNames(
          "h-full",
          "outline-none",
          "flex",
          "items-center",
          "-mr-4",
          "px-2"
        )}
      >
        <MenuIcon
          className={classNames(
            "theme-light:fill-black",
            "theme-dark:fill-white",
            "w-8",
            "h-8"
          )}
        />
        <span className="sr-only">{t("nav.menu")}</span>
      </Disclosure.Button>
      <Disclosure.Panel>
        <nav
          className={classNames(
            "absolute",
            "left-0",
            "right-0",
            "[&_li]:border-b",
            "[&_li]:border-b-neutral-600",
            "theme-light:bg-neutral-300",
            "theme-dark:bg-neutral-800"
          )}
        >
          <ul>{children}</ul>
        </nav>
      </Disclosure.Panel>
    </>
  );
}

export function MobileNavigation({ children }: NavigationProps) {
  return (
    <div
      className={classNames(
        "ml-auto",
        "md:hidden",
        "h-full",
        "flex",
        "flex-col",
        "justify-center"
      )}
    >
      <Disclosure>
        {({ close }) => (
          <DisclosureContent close={close}>{children}</DisclosureContent>
        )}
      </Disclosure>
    </div>
  );
}