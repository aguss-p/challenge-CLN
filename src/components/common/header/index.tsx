import Bell from "@/components/icons/Bell";
import Club from "@/components/icons/Club";
import Hamburger from "@/components/icons/Hamburger";
import Heart from "@/components/icons/Heart";
import Search from "@/components/icons/Search";
import SmileFace from "@/components/icons/SmileFace";
import React from "react";
type Props = {
  onChangeNameInput: (val: string) => void;
  nameInputValue: string;
  onClickSearch: () => void;
};
const Header = (props: Props) => {
  const { onChangeNameInput, nameInputValue, onClickSearch } = props;
  const internalNameOnChange = (e: any) => {
    console.log(e.target.value, "target");

    onChangeNameInput(e.target.value);
  };
  return (
    <header className="z-50 fixed bg-[rgba(27,28,29,0.8)]  w-full flex justify-between items-center px-4 py-3">
      <div className="w-[80px] flex items-center gap-3 mr-3">
        <Hamburger fill="#fff" />
        <Club fill="#fff" />
      </div>
      <div className="w-full max-w-[540px] lg:max-w-[700px] xl:max-w-[840px] flex items-center">
        <div className="w-[calc(100%-15px)] flex flex-col items-center gap-1 sm:flex-row sm:gap-0 ">
          <input
            value={nameInputValue}
            onChange={internalNameOnChange}
            className="w-[100%] text-sm p-1 pl-2 bg-inherit text-white border-solid border-[1px] border-[#fffff] rounded-2xl sm:rounded-l-2xl sm:rounded-r-none placeholder:text-[rgba(255,255,255,0.6)]"
            placeholder="Busca un comercio..."
            type="text"
          />
          <input
            className="w-[100%] text-sm p-1 pl-2 bg-inherit text-white border-solid border-[1px] border-[#fffff] rounded-2xl sm:rounded-r-2xl sm:rounded-l-none placeholder:text-[rgba(255,255,255,0.6)]"
            placeholder="Ingresa una ubicación..."
            type="text"
          />
        </div>
        <div
          onClick={onClickSearch}
          className="ml-1 flex justify-center items-center bg-blue-500 w-[30px] h-[30px] rounded-full"
        >
          <Search fill="white" />
        </div>
      </div>
      <div className="w-[50px] flex flex-col justify-end items-end gap-3 sm:flex-row sm:gap-2 sm:w-[80px]">
        <Bell fill="white" />
        <Heart fill="white" />
        <SmileFace fill="white" />
      </div>
    </header>
  );
};

export default Header;
