import React from 'react'
import { useState } from 'react';
import {motion} from 'framer-motion'
import {MdFastfood,MdCloudUpload,MdDelete,MdAttachMoney,MdFoodBank,} from "react-icons/md"; 
import { categories } from '../Utils/Data';
import Loader from './Loader';
import {deleteObject,getDownloadURL,ref,uploadBytesResumable,} from "firebase/storage";
import { storage } from "../firebase";
import { saveItem,getAllFoodItems } from '../Utils/firebaseFunctions';
import { useDispatch,useSelector } from 'react-redux';
import { setFoodItems } from "../Redux/foodSlice";


function CreateContainer() {

  // all state for managing dif types of inputs
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [imageAsset , setImageAsset ] = useState(null)
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let dispatch = useDispatch();
  let foodItemData = useSelector((store)=>{store.foodItems});



  // function to upload images in the database before all inputs are saved
  async function uploadImage(e){
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMessage("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMessage("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  }

  
  // function to remove image in the database,(the other inputs have not been submitted) 
  function deleteImage(){
      setIsLoading(true);
      const deleteRef = ref(storage, imageAsset);
      deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMessage("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  }

  function saveDetails(){
     setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMessage("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMessage("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMessage("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  }

  
  function clearData(){
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  }


  async function fetchData() {
    await getAllFoodItems().then((data) => {
      dispatch(
        setFoodItems({
          foodItems: data,
        })
      );
    });
  }

  return (
    <section className=" flex min-h-screen w-full items-center justify-center">
      <div className=" flex w-[80%] flex-col items-center justify-center gap-4
      rounded-lg border border-gray-300 p-4 md:w-[75%] max-w-[450px] ">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={` w-full rounded-lg p-2 text-center text-lg font-semibold
             ${
               alertStatus === "danger"
                 ? "bg-red-400 text-red-800"
                 : "bg-emerald-400 text-emerald-800"
             }`}
          >
            {message}
          </motion.p>
        )}

        <div className=" flex w-full items-center gap-2 border-b border-gray-300 py-2">
          <MdFastfood className=" text-xl text-gray-700" />
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Food title..."
            className=" h-full w-full border-none bg-transparent text-lg
             font-semibold text-textColor outline-none
              placeholder:text-gray-400"
          />
        </div>

        <div className=" w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className=" w-full cursor-pointer rounded-md border-b-2 border-gray-200
            p-2 text-base outline-none"
          >
            <option value="other" className=" bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className=" border-0 bg-white text-base 
                   text-headingColor outline-none"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/*  */}

        <div className="group flex h-225 w-full cursor-pointer flex-col items-center
         justify-center rounded-lg border-2 border-dotted border-gray-300 md:h-340">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="flex h-full w-full cursor-pointer flex-col 
                  items-center justify-center">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-3xl text-gray-500 hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="h-0 w-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="h-full w-full object-cover "
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 cursor-pointer rounded-full 
                      bg-red-500 p-3 text-xl outline-none transition-all  duration-500 
                      ease-in-out hover:shadow-md"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/*  */}

        <div className="flex w-full flex-col items-center gap-3 md:flex-row">
          <div className="flex w-full items-center gap-2 border-b border-gray-300 py-2">
            <MdFoodBank className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="h-full w-full border-none bg-transparent text-lg 
              text-textColor outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex w-full items-center gap-2 border-b 
          border-gray-300 py-2">
            <MdAttachMoney className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="h-full w-full border-none bg-transparent text-lg
               text-textColor outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/*  */}

        <div className="flex w-full items-center">
          <button
            type="button"
            className="ml-0 w-full rounded-lg border-none bg-emerald-500 
            px-12 py-2 text-lg font-semibold text-white outline-none 
            md:ml-auto md:w-auto"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>

        {/*  */}
      </div>
    </section>
  );
}

export default CreateContainer
