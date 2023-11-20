/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import preLoader from "../../../assets/preloader.gif";

const CommonDropDown = ({
  optionData,
  defaultOptionValue,
  defaultOptionLabel,
  setFormData,
  name,
  defaultCreateText,
  required,
}) => {
  const [mainData, setMainData] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [searchInput, setsearchInput] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [primaryText, setPrimaryText] = useState("");

  const outsideClick = useRef(null);

  useEffect(() => {
    if (defaultOptionValue) {
      const findText = optionData?.find(
        (data) => data?.id === defaultOptionValue
      )[defaultOptionLabel];
      setPrimaryText(findText);
    } else {
      setPrimaryText(defaultCreateText);
      setSelectedOption("");
    }
  }, [defaultOptionValue, optionData]);

  useEffect(() => {
    setMainData(optionData);
  }, [optionData]);

  useEffect(() => {
    if (searchInput) {
      const filteredData = optionData?.filter((item) =>
        item[defaultOptionLabel]
          ?.toLowerCase()
          .includes(searchInput?.toLowerCase())
      );
      setMainData(filteredData);
    } else {
      setMainData(optionData);
    }
  }, [searchInput]);

  const handleClick = (e) => {
    setSelectedOption(e[defaultOptionLabel]);
    setFormData((prev) => {
      return {
        ...prev,
        [name]: e.id,
      };
    });
    setShowOption(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  const handleOutsideClick = (e) => {
    if (outsideClick?.current && !outsideClick?.current?.contains(e.target)) {
      setShowOption(false);
    }
  };

  return (
    <div className="w-full text-sm relative" ref={outsideClick}>
      <div
        onClick={() => setShowOption(!showOption)}
        className={`${
          showOption && "border-blue-300"
        } flex justify-between items-center bg-white border border-gray-300 outline-none focus:border-blue-300 text-gray-900 rounded-lg p-2.5`}
      >
        {selectedOption || primaryText !== defaultCreateText ? (
          <div className="w-full flex items-center justify-between mr-3">
            <p>{selectedOption ? selectedOption : primaryText}</p>
            <RxCross2
              className="cursor-pointer"
              size={15}
              onClick={() => {
                setSelectedOption();
                setFormData((prev) => {
                  return {
                    ...prev,
                    [name]: "",
                  };
                });
                setMainData(optionData);
              }}
            />
          </div>
        ) : (
          <input
            placeholder={primaryText}
            required={required}
            id={name}
            onFocus={() => {
              document.getElementById(`${name}`).blur();
            }}
            className={`outline-none bg-white w-full cursor-pointer ${
              defaultOptionValue && "placeholder:text-black"
            }`}
          />
        )}
        <RiArrowDownSLine
          className={`text-gray-400 ${defaultOptionValue && "text-black"}`}
          size={18}
        />
      </div>
      {showOption && (
        <div className="border absolute w-full bg-white z-10 h-[200px] overflow-y-auto pb-2">
          <div className="p-2 bg-white sticky top-0">
            <input
              className="bg-white border border-gray-300 outline-none focus:border-blue-300 text-gray-900 text-sm rounded-sm w-full p-1.5"
              type="text"
              onChange={(e) => setsearchInput(e.target.value)}
              placeholder="Searching..."
            />
          </div>
          {mainData ? (
            mainData?.map((country) => (
              <option
                onClick={() => handleClick(country)}
                className={`hover:bg-gray-300 w-full px-2.5 py-1 cursor-pointer ${
                  defaultOptionValue === country?.id && "bg-gray-300"
                }`}
                name={name}
                value={country?.id}
                key={country?.id}
              >
                {country[defaultOptionLabel]}
              </option>
            ))
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <Image src={preLoader} alt="" height={150} priority />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommonDropDown;
