import React from 'react'
import Header from './Components/Header'
import MainContainer from './Components/MainContainer'
import CreateContainer from './Components/CreateContainer'
import { Route,Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { getAllFoodItems } from './Utils/firebaseFunctions'
import { useEffect } from 'react'
import { setFoodItems } from "./Redux/foodSlice";
import { useDispatch, useSelector } from "react-redux";
import MenuPage from './Components/MenuPage'


function App() {

  let foodItemData = useSelector((store)=>{store.foodItems})

  let dispatch = useDispatch();

  async function fetchData(){
    await getAllFoodItems().then(data => {
      dispatch(setFoodItems(data));
    })
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  
  return (
    <AnimatePresence >
    <div className=' bg-primary w-screen h-auto'>
      <Header />

      <main className=' mt-14 md:mt-20 px-4 md:px16 py-4  w-full'>
       <Routes>
        <Route path='/' exact element={<MainContainer />} />
        <Route path='/createItem' element={<CreateContainer />} />
        <Route path='/menuPage' element={<MenuPage />} />
       </Routes>
      </main>

    </div>
    </AnimatePresence>
  )
}

export default App
