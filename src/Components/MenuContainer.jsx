import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useSelector } from "react-redux";
import { categories } from "../Utils/Data";
import {
  GiChickenOven,
  GiFruitBowl,
  GiDoubleFish,
  GiSodaCan,
} from "react-icons/gi";
import { BiBowlHot,BiBowlRice} from "react-icons/bi";
import { FaIceCream } from "react-icons/fa";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  let  foodItems  = useSelector((store) => store.foodItems);
  let  [chicken,setChicken] = useState(true)
  let  [curry,setCurry] = useState(false)
  let  [rice,setRice] = useState(false)
  let  [fruits,setFruits] = useState(false)
  let  [drinks,setDrinks] = useState(false)
  let  [fish,setFish] = useState(false)
  let  [iceCream,setIceCream] = useState(false);

  

  return (
    <section className="my-6 w-full" id="menu">
      <div className="flex w-full flex-col items-center justify-center">
        <p
          className="before:content relative mr-auto from-orange-400
         to-orange-600 text-2xl font-semibold capitalize 
         text-headingColor transition-all duration-100 ease-in-out 
         before:absolute before:-bottom-2 before:left-0 
         before:h-1 before:w-16 before:rounded-lg before:bg-gradient-to-tr"
        >
          Our Hot Dishes
        </p>

        <div
          className="flex w-full items-center justify-start gap-8
         overflow-x-scroll py-6 scrollbar-none lg:justify-center"
        >
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } flex h-28 w-24 min-w-[94px] cursor-pointer flex-col
                 items-center justify-center gap-3 rounded-lg drop-shadow-xl hover:bg-cartNumBg `}
                onClick={() => {
                  setFilter(category.urlParamName);
                  setChicken(category.urlParamName === "chicken");
                  setFruits(category.urlParamName === "fruits");
                  setCurry(category.urlParamName === "curry");
                  setRice(category.urlParamName === "rice");
                  setFish(category.urlParamName === "fish");
                  setIceCream(category.urlParamName === "icecreams");
                  setDrinks(category.urlParamName === "drinks");
                }}
              >
                <div
                  className={`h-10 w-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } flex items-center justify-center group-hover:bg-white`}
                >
                  {category.urlParamName === "chicken" ? (
                    <GiChickenOven
                      onClick={() => {
                        setChicken(true);
                        setCurry(false);
                        setDrinks(false);
                        setFish(false);
                        setFruits(false);
                        setIceCream(false);
                        setRice(false);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : category.urlParamName === "fruits" ? (
                    <GiFruitBowl
                      onClick={() => {
                        setChicken(false);
                        setCurry(false);
                        setDrinks(false);
                        setFish(false);
                        setFruits(true);
                        setIceCream(false);
                        setRice(false);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : category.urlParamName === "curry" ? (
                    <BiBowlHot
                      onClick={() => {
                        setChicken(false);
                        setCurry(true);
                        setDrinks(false);
                        setFish(false);
                        setFruits(false);
                        setIceCream(false);
                        setRice(false);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : category.urlParamName === "rice" ? (
                    <BiBowlRice
                      onClick={() => {
                        setChicken(false);
                        setCurry(false);
                        setDrinks(false);
                        setFish(false);
                        setFruits(false);
                        setIceCream(false);
                        setRice(true);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : category.urlParamName === "fish" ? (
                    <GiDoubleFish
                      onClick={() => {
                        setChicken(false);
                        setCurry(false);
                        setDrinks(false);
                        setFish(true);
                        setFruits(false);
                        setIceCream(false);
                        setRice(false);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : category.urlParamName === "icecreams" ? (
                    <FaIceCream
                      onClick={() => {
                        setChicken(false);
                        setCurry(false);
                        setDrinks(false);
                        setFish(false);
                        setFruits(false);
                        setIceCream(true);
                        setRice(false);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : category.urlParamName === "drinks" ? (
                    <GiSodaCan
                      onClick={() => {
                        setChicken(false);
                        setCurry(false);
                        setDrinks(true);
                        setFish(false);
                        setFruits(false);
                        setIceCream(false);
                        setRice(false);
                      }}
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  ) : (
                    <IoFastFood
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } text-lg group-hover:text-textColor`}
                    />
                  )}
                </div>

                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => {
              if (chicken) {
                return n.category === "chicken";
              } else if (fruits) {
                return n.category === "fruits";
              } else if (rice) {
                return n.category === "rice";
              } else if (fish) {
                return n.category === "fish";
              } else if (curry) {
                return n.category === "curry";
              } else if (iceCream) {
                return n.category === "icecreams";
              } else if (drinks) {
                return n.category === "drinks";
              }
              return false; // Return false if none of the conditions match
            })}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
