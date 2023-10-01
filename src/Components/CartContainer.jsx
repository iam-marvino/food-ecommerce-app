import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import EmptyCart from "../assets/img/emptyCart.svg";
import { useSelector, useDispatch } from "react-redux";
import { SetShowCart, ClearCartItems, SetCartItems } from "../Redux/cartSlice";
import CartItem from "./CartItem";
import { Auth } from "../firebase";
import { GoogleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { LOGIN, LOGOUT } from "../Redux/userSlice";

const CartContainer = () => {
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  let cartShow = useSelector((store) => store.cart.cartShow);
  let cartItems = useSelector((store) => store.cart.cartItems);
  let user = useSelector((store) => store.user);
  let totalPrice = cartItems?.reduce((total, current) => {
    return total + current?.price * current?.qty;
  }, 0);

  let dispatch = useDispatch();

  function cartClicked() {
    dispatch(SetShowCart(!cartShow));
  }

  useEffect(() => {
    if (cartItems === []) {
      setTot(0);
    } else {

      setTot(totalPrice);
    }
  }, [totalPrice]);

  async function login() {
    if (user.email === "") {
      try {
        await signInWithPopup(Auth, GoogleProvider);
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  }
  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        dispatch(
          LOGIN({
            displayName: Auth.currentUser.displayName,
            email: Auth.currentUser.email,
            photoURL: Auth.currentUser.photoURL,
          })
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            displayName: Auth.currentUser.displayName,
            email: Auth.currentUser.email,
            photoURL: Auth.currentUser.photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(LOGOUT());
        localStorage.removeItem("user");
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe the event listener when the component unmounts
    };
  }, [dispatch]);

  return (
    <motion.section
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed right-0 top-0 z-[1500] flex h-[100vh]
       w-full flex-col bg-white drop-shadow-md md:w-375"
    >
      <div
        className="flex w-full cursor-pointer items-center
       justify-between p-4"
      >
        <motion.div whileTap={{ scale: 0.75 }} onClick={cartClicked}>
          <MdOutlineKeyboardBackspace className="text-3xl text-textColor" />
        </motion.div>
        <p className="text-lg font-semibold text-textColor">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="my-2 flex cursor-pointer items-center gap-2 rounded-md
           bg-gray-100 p-1 px-2  
           text-base text-textColor hover:shadow-md"
          onClick={() => dispatch(ClearCartItems())}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="flex h-full w-full flex-col rounded-t-[2rem] bg-cartBg">
          {/* cart Items section */}
          <div
            className="md:h-42 flex h-340 w-full flex-col gap-3 overflow-y-scroll px-6
           py-10 scrollbar-none"
          >
            {/* cart Item  */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div
            className="flex w-full flex-1 flex-col items-center
           justify-evenly rounded-t-[2rem] bg-cartTotal px-8 py-2"
          >
            <div className="flex w-full items-center justify-between">
              <p className="text-lg text-gray-400">Sub Total</p>
              <p className="text-lg text-gray-400">${tot}</p>
            </div>

            <div className="flex w-full items-center justify-between">
              <p className="text-lg text-gray-400">Delivery</p>
              <p className="text-lg text-gray-400">$ 2.5</p>
            </div>

            <div className="my-2 w-full border-b border-gray-600"></div>

            <div className="flex w-full items-center justify-between">
              <p className="text-xl font-semibold text-gray-200">Total</p>
              <p className="text-xl font-semibold text-gray-200">
                ${tot + 2.5}
              </p>
            </div>

            {!(user.email === "") ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="my-2 w-full rounded-full bg-gradient-to-tr 
                from-orange-400 to-orange-600 p-2 
                text-lg text-gray-50 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                onClick={login}
                whileTap={{ scale: 0.8 }}
                type="button"
                className="my-2 w-full rounded-full bg-gradient-to-tr
                 from-orange-400 to-orange-600 p-2 
                 text-lg text-gray-50 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex h-full w-full flex-col items-center
          justify-center gap-6"
        >
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl font-semibold text-textColor">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default CartContainer;
