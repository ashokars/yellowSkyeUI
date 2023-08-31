"use client";
import { usePathname } from "next/navigation";
import { Disclosure} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Images", href: "#" },
  { name: "Videos", href: "#" },
  { name: "Panaromas", href: "#" },
  { name: "Virtual tours", href: "#" },
  { name: "Live videos", href: "#" },
  { name: "CMR", href: "/projects/cmr" },
  { name: "Share", href: "#" },
  { name: "Order details", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FloatNav() {
  const pathname = usePathname();

  return (
    <div className="z-10 w-11/12 items-center justify-between font-primary text-md mx-4">
      <Disclosure as="nav" className="bg-[#228DBB] rounded-md shadow-sm">
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 justify-between">
                <div className="flex">
                  <div className="hidden lg:-my-px lg:ml-6 lg:flex lg:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "text-white"
                            : "border-transparent text-[#B0DFF4] hover:text-white hover:border-[#FFF205]",
                          "inline-flex items-center px-1 pt-1 border-b-4 border-[#FFF205] text-md font-medium"
                        )}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="lg:invisible inline-flex items-center px-1 pt-1 border-b-4 text-md font-medium text-white border-[#FFF205]">
                  CMR
                </div>
                <div className="-mr-2 flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-[#228DBB] p-2 text-white-400">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-slate-50 border-slate-500 text-slate-700"
                        : "border-transparent text-[#B0DFF4]",
                      "block pl-3 pr-4 py-2 text-base font-medium"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3"></div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
