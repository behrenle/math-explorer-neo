import { Listbox as HeadlessuiListbox } from "@headlessui/react";
import classNames from "classnames";
import { ExpandMore } from "ui-components";
import { useTranslation } from "react-i18next";

interface DecimalPlacesListboxProps {
  value: string | number;
  onChange: ((value: number) => void) | ((value: string) => void);
}

export default function DecimalPlacesListbox({
  value,
  onChange,
}: DecimalPlacesListboxProps) {
  const [t] = useTranslation();

  return (
    <li
      className={classNames(
        "flex",
        "items-center",
        "h-16",
        "bold-font:font-bold",
        "text-base",
        "sm:text-lg",
        "md:text-xl",
        "lg:text-2xl",
      )}
    >
      <HeadlessuiListbox value={value} onChange={onChange}>
        <HeadlessuiListbox.Label>
          {t("settings.significantDecimalPlaces")}
        </HeadlessuiListbox.Label>
        <div
          className={classNames(
            "ml-auto",
            "relative",
            "flex",
            "flex-col",
            "[&:hover>li]:outline-none",
            "[&:hover>div>ul>li]:outline-none",
          )}
        >
          <HeadlessuiListbox.Button
            className={classNames(
              "flex",
              "items-center",
              "w-40",
              "theme-dark:bg-neutral-700",
              "theme-light:bg-neutral-300",
              "theme-dark:hover:bg-neutral-600",
              "theme-light:hover:bg-neutral-400",
              "p-2",
              "rounded-md",
              "ui-focus-visible:outline",
              "outline-2",
              "outline-offset-2",
              "theme-light:outline-black",
              "theme-dark:outline-white",
            )}
          >
            {value}
            <ExpandMore
              className={classNames(
                "ml-auto",
                "w-6",
                "h-6",
                "theme-dark:fill-white/50",
                "theme-light:fill-black/50",
              )}
            />
          </HeadlessuiListbox.Button>
          <div>
            <HeadlessuiListbox.Options
              className={classNames(
                "absolute",
                "w-40",
                "z-20",
                "mt-2",
                "grid",
                "grid-cols-5",
                "outline-none",
                "theme-dark:bg-neutral-700",
                "theme-light:bg-neutral-300",
                "rounded-md",
                "[&>*:nth-child(1)]:rounded-tl-md",
                "[&>*:nth-child(5)]:rounded-tr-md",
                "[&>*:nth-child(11)]:rounded-bl-md",
                "[&>*:nth-child(15)]:rounded-br-md",
                "[&>*:nth-child(11)]:rounded-bl-md",
                "[&>*:nth-child(5n)]:border-l-0",
              )}
            >
              {new Array(15).fill(0).map((_, index) => (
                <HeadlessuiListbox.Option
                  key={index}
                  value={index}
                  className={classNames(
                    "flex",
                    "items-center",
                    "justify-center",
                    "p-2",
                    "m-0.5",
                    "theme-dark:hover:bg-neutral-600",
                    "theme-light:hover:bg-neutral-400",
                    "ui-active:outline",
                    "ui-selected:theme-dark:bg-neutral-600",
                    "ui-selected:theme-light:bg-neutral-400",
                  )}
                >
                  {index}
                </HeadlessuiListbox.Option>
              ))}
            </HeadlessuiListbox.Options>
          </div>
        </div>
      </HeadlessuiListbox>
    </li>
  );
}
