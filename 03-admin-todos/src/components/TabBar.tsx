"use client";

// import { getCookie } from "cookies-next";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import {  useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}
export const TabBar = ({
  tabOptions = [1, 2, 3, 4, 5],
  currentTab = 1,
}: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const router = useRouter();

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString(), {});
    router.refresh();
  };

  // useEffect(() => {
  //   const tab = getCookie("selectedTab");
  //   if (!tab) return;
  //   setSelected(+tab);
  // }, []);

  return (
    <div
      className={`grid ${
        "grid-cols-" + tabOptions.length
      } w-full space-x-2 rounded-xl bg-gray-200 p-2 `}
    >
      {tabOptions.map((option) => (
        <div key={option}>
          <input
            checked={selected === option}
            type="radio"
            id={tabOptions.toString()}
            className="peer hidden"
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(option)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
