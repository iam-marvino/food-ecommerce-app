import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../assets/img/NotFound.svg";
import { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCartItems } from "../Redux/cartSlice";
import { addToCart, removeFromCart } from "../Redux/cartSlice.js";


const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  let  cartItems  = useSelector((store) => store.cart.cartItems);
  let [items, setItems] = useState([]);
  let dispatch = useDispatch()



    useEffect(() => {
      // Access the updated cartItems whenever it changes
      // and update the local state `items`
      setItems(cartItems);
    }, [cartItems]);





  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
    
  }, [scrollValue]);



  return (
    <div
      ref={rowContainer}
      className={`my-12 flex w-full items-center gap-3 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "flex-wrap justify-center overflow-x-hidden"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="min-w-[auto] relative my-12 flex h-[175px] w-275
            items-center justify-evenly  rounded-lg bg-cardOverlay px-4 py-2
            backdrop-blur-lg hover:drop-shadow-lg md:w-300 md:min-w-[350px]
            "
          >
            <div className="flex md:w-full items-center justify-between w-1/2">
              <motion.div
                className="-mt-8 h-40 w-40  drop-shadow-2xl g"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt={`${item?.title}`}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </div>

            <div className="-mt-8  flex md:w-full flex-col items-end justify-end w-1/2">
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="mt-[1.5rem] flex h-8 w-8 cursor-pointer items-center
                justify-center rounded-full bg-red-600 hover:shadow-md"
                onClick={() => dispatch(addToCart(item))}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
              <p className="text-end text-[0.8rem] font-semibold text-textColor md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-[0.6rem] text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg font-semibold text-headingColor">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center">
            <img src={NotFound} className="h-340" />
            <p className="my-2 text-xl font-semibold text-headingColor">
              Items Not Available
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RowContainer;
