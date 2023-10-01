import React from 'react'
import HomeContainer from './HomeContainer';
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from './RowContainer';
import { useState,useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { fireStore } from '../firebase';
import { useSelector,useDispatch} from 'react-redux';
import MenuContainer from './MenuContainer';
import { setFoodItems } from "../Redux/foodSlice";




function MainContainer() {
 const [scrollValue, setScrollValue] = useState(0);
 let foodItems = useSelector((store) => store.foodItems)
 let foodItemsRef = collection(fireStore,'foodItems')
 let dispatch = useDispatch()
 let cartShow = useSelector((store) => store.cart.cartShow);
 
 
  async function getData(){
  try{
      let data = await getDocs(foodItemsRef)
      let dataArray = data.docs.map((doc) => {
      return{
        ...doc.data(),
        id: doc.id,
      }
      })
      dispatch(setFoodItems(dataArray));
  }
  catch(err){
    console.log(err)
  }}


  useEffect(() => {
    getData();
  },[scrollValue, cartShow]);


  function scrollLeft(){
    setScrollValue((prev)=> prev -= 300)
  }

  function scrollRight() {
    setScrollValue((prev) => (prev += 300));
  }

  return (
    <main className=" flex h-auto w-full flex-col items-center justify-center">
      <HomeContainer />

      <section className="my-6 w-full">
        <div className="flex w-full items-center justify-between scroll-smooth">
          <p
            className="before:content relative from-orange-400
          to-orange-600 text-2xl font-semibold capitalize
          text-headingColor transition-all duration-100 ease-in-out
          before:absolute before:-bottom-2 before:left-0 before:h-1 
          before:w-32 before:rounded-lg before:bg-gradient-to-tr"
          >
            Our fresh & healthy fruits
          </p>

          <div className="hidden items-center gap-3 md:flex">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center
              rounded-lg bg-orange-300 hover:bg-orange-500 hover:shadow-lg"
              onClick={scrollLeft}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex h-8 w-8 cursor-pointer items-center
              justify-center rounded-lg bg-orange-300 transition-all 
              duration-100 ease-in-out hover:bg-orange-500 hover:shadow-lg"
              onClick={scrollRight}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>

        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems.filter((n) => n.category === "fruits")}
        />
      </section>

      <section className="my-6 w-full">
        <MenuContainer />
      </section>
    </main>
  );
}

export default MainContainer

 