import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch,useSelector} from "react-redux";
import { SetCartItems } from "../Redux/cartSlice";
import { increaseQuantity,decreaseQuantity } from "../Redux/cartSlice";

const CartItem = ({ item, setFlag, flag }) => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();

  // const cartDispatch = (updatedItems) => {
  //   localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  //   dispatch(SetCartItems(updatedItems));
  // };

 




// useEffect(() => {
// }, [cartItems])

  

  return (
    <div
      className="flex w-full items-center gap-2 rounded-lg bg-cartItem 
    p-1 px-2"
    >
      <img
        src={item?.imageURL}
        className="h-20 w-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="block text-sm font-semibold text-gray-300">
          $ {parseFloat(item?.price) * item?.qty}
        </p>
      </div>

      {/* button section */}
      <div className="group ml-auto flex cursor-pointer items-center gap-2">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => dispatch(decreaseQuantity(item))}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p
          className="flex h-5 w-5 items-center justify-center rounded-sm 
        bg-cartBg text-gray-50"
        >
          {item?.qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => dispatch(increaseQuantity(item))}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
