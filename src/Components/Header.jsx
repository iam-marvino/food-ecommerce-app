import React from 'react'
import logo from '../assets/img/logo.png'
import icon from '../assets/img/avatar.png'
import {MdShoppingBasket,MdAdd,MdLogout} from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react'
import { Auth } from '../firebase'
import { GoogleProvider } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useSelector,useDispatch } from 'react-redux'
import { LOGIN,LOGOUT } from '../Redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { SetShowCart } from "../Redux/cartSlice";
import CartContainer from './CartContainer'


function Header() {

  const [dropDown,setDropDown] = useState(false)

  let user = useSelector((store)=>store.user)
  let cartShow  = useSelector((store) => store.cart.cartShow);
  let cartItems  = useSelector((store) => store.cart.cartItems);

  let dispatch = useDispatch()
  let navigate = useNavigate()


   function cartClicked() {
     dispatch(SetShowCart(!cartShow));
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
}, [dispatch,cartShow]);


  
  async function login(){
   if(user.email === ''){
     try {
       await signInWithPopup(Auth, GoogleProvider);
     } catch (err) {
       console.log(err);
     }
   }
   else{

   }
  }


  async function signOUT(){
    try{
      await signOut(Auth)
      setDropDown(false)
    }
    catch(err){
      console.log(err)
    }
  }

  function dropDownClicked(){
    setDropDown((prev)=>{
      return !prev
    })
  }


  return (
    <header
      className=" fixed top-0 z-50 w-screen bg-primary p-3 
    px-4 md:p-[1.5rem] md:px-[4rem] "
    >
      {/* Pc and tablet */}
      <div className="hidden md:flex  ">
        <Link to="/" className=" flex cursor-pointer items-center gap-2 ">
          <img src={logo} alt="logo" className=" w-[2rem] object-cover " />
          <p className=" text-xl font-bold text-headingColor ">City</p>
        </Link>

        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="ml-[auto] flex items-center gap-[3.25rem] "
        >
          <li
            onClick={() => {
              setDropDown(false);
              navigate("/");
            }}
            className=" cursor-pointer text-base text-textColor transition-all
            duration-100 ease-in-out hover:text-headingColor"
          >
            HOME
          </li>
          <li
            onClick={() => {
              setDropDown(false);
              navigate("/menuPage");
            }}
            className=" cursor-pointer text-base text-textColor 
          transition-all duration-100 ease-in-out  hover:text-headingColor"
          >
            MENU
          </li>
          <li
            onClick={() => {
              setDropDown(false);
            }}
            className=" cursor-pointer text-base text-textColor 
          transition-all duration-100 ease-in-out  hover:text-headingColor"
          >
            ABOUT US
          </li>
          <li
            onClick={() => {
              setDropDown(false);
            }}
            className="cursor-pointer text-base text-textColor 
          transition-all duration-100 ease-in-out  hover:text-headingColor"
          >
            SERVICE
          </li>
        </motion.ul>

        <div
          className=" relative ml-[2rem] mr-[2rem] flex items-center
         gap-4 shadow-2xl"
        >
          <MdShoppingBasket
            className=" text-2xl text-textColor hover:cursor-pointer "
            onClick={cartClicked}
          />

          {cartItems && cartItems.length > 0 && (
            <div
              className=" absolute -right-[7px] -top-[4px] flex h-5
             w-5 items-center justify-center rounded-full bg-cartNumBg 
             "
            >
              <p className=" text-xs font-semibold text-white  ">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <motion.img
          whileTap={{ scale: 0.6 }}
          onClick={Auth.currentUser === null ? login : dropDownClicked}
          src={user.email === "" ? icon : user.photoURL}
          alt="icon"
          className=" h-[40px] min-h-[40px] w-[40px] min-w-[40px] cursor-pointer 
          rounded-full  "
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="  absolute right-[1.5rem] top-[4.25rem] flex flex-col
           rounded-lg bg-gray-50 shadow-xl"
          style={{ display: dropDown ? "block" : "none" }}
        >
          {user.email === "osakue100@gmail.com" && (
            <button
              onClick={() => {
                navigate("/createItem");
                setDropDown(false);
              }}
              className=" flex w-[100%] cursor-pointer items-center justify-center 
              gap-[0.75rem] px-4 py-2 text-textColor transition-all duration-100
              ease-in-out hover:bg-slate-100 "
            >
              New Item <MdAdd />
            </button>
          )}

          <button
            className=" flex w-[100%] cursor-pointer items-center justify-center
             gap-[0.75rem] px-4 py-2 text-textColor transition-all duration-100
            ease-in-out hover:bg-gray-200 "
            onClick={signOUT}
          >
            Logout <MdLogout />{" "}
          </button>
        </motion.div>
      </div>

      {/* Mobile */}

      <div className=" flex md:hidden  ">
        <div className=" relative mr-[auto] flex items-center gap-4 shadow-2xl">
          <MdShoppingBasket
            className=" text-2xl text-textColor hover:cursor-pointer "
            onClick={cartClicked}
          />

          {cartItems && cartItems.length > 0 && (
            <div
              className=" absolute -right-[7px] -top-[4px] flex h-5
             w-5 items-center justify-center rounded-full bg-cartNumBg "
            >
              <p className=" text-xs font-semibold text-white  ">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to="/" className=" flex cursor-pointer items-center gap-2 ">
          <img src={logo} alt="logo" className=" w-[2rem] object-cover " />
          <p className=" text-xl font-bold text-headingColor ">City</p>
        </Link>

        <motion.img
          whileTap={{ scale: 0.6 }}
          onClick={Auth.currentUser === null ? login : dropDownClicked}
          src={user.email === "" ? icon : user.photoURL}
          alt="icon"
          className=" ml-[auto] h-[40px] min-h-[40px] w-[40px] min-w-[40px] 
          cursor-pointer rounded-full "
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="  absolute right-[1.5rem] top-[4rem] flex flex-col rounded-lg
           bg-gray-50 shadow-xl"
          style={{ display: dropDown ? "block" : "none" }}
        >
          {user.email === "osakue100@gmail.com" && (
            <button
              onClick={() => {
                navigate("/createItem");
                setDropDown(false);
              }}
              className=" flex w-[100%] cursor-pointer items-center justify-center
               gap-[0.75rem] px-4 py-2 text-textColor transition-all 
               duration-100 ease-in-out hover:bg-slate-100 "
            >
              New Item <MdAdd />
            </button>
          )}

          <motion.ul className="flex flex-col">
            <li
              onClick={() => {
                setDropDown(false);
                navigate("/");
              }}
              className=" cursor- w-[100%] cursor-pointer items-center justify-center
               px-4 py-2 text-base text-textColor transition-all duration-100 
               ease-in-out  hover:bg-slate-100 hover:text-headingColor"
            >
              HOME
            </li>
            <li
              onClick={() => {
                setDropDown(false);
                navigate("/menuPage");
              }}
              className=" w-[100%] cursor-pointer items-center justify-center px-4 
              py-2  text-base text-textColor transition-all duration-100 
               ease-in-out  hover:bg-slate-100 hover:text-headingColor"
            >
              MENU
            </li>
            <li
              onClick={() => {
                setDropDown(false);
              }}
              className=" w-[100%] cursor-pointer items-center justify-center px-4
               py-2 text-base text-textColor transition-all duration-100 
               ease-in-out  hover:bg-slate-100 hover:text-headingColor"
            >
              ABOUT US
            </li>
            <li
              onClick={() => {
                setDropDown(false);
              }}
              className="w-[100%]  cursor-pointer  items-center justify-center px-4
               py-2 text-base text-textColor transition-all duration-100 
               ease-in-out hover:bg-slate-100 hover:text-headingColor"
            >
              SERVICE
            </li>
          </motion.ul>

          <button
            className=" m-2 mx-[auto] flex w-[90%]  cursor-pointer items-center 
            justify-center gap-[0.75rem] rounded-md bg-gray-200 p-2
            text-textColor shadow-md transition-all duration-100
            ease-in-out hover:bg-slate-100 "
            onClick={signOUT}
          >
            Logout <MdLogout />
          </button>
        </motion.div>
      </div>

      <section
      >{cartShow && <CartContainer />}</section>
    </header>
  );
}

export default Header
