import React from 'react';
import delivery from "../assets/img/delivery.png";
import heroBg from "../assets/img/heroBg.png";
import heroData from '../Utils/Data';
import { useSelector, useDispatch } from 'react-redux';
import { SetShowCart } from '../Redux/cartSlice';

function HomeContainer() {
  const cartShow = useSelector((store) => store.cart.cartShow);
  const heroDataList = heroData;
  const dispatch = useDispatch();

  function cartClicked() {
    dispatch(SetShowCart(!cartShow));
  }

  return (
    <section
      className="grid grid-cols-1 gap-2 md:mx-auto md:w-[95%]
     md:grid-cols-2"
    >
      {/* MOBILE SCREEN */}
      <div
        className="md:item-center flex flex-1 flex-col items-start
       justify-center gap-6 py-2"
      >
        <div
          className="flex items-center justify-center gap-2 rounded-full
         bg-orange-100 px-2 py-1"
        >
          <p className="text-base font-semibold text-orange-500">
            Bike Delivery
          </p>

          <div className="h-6 w-6 overflow-hidden rounded-full bg-white drop-shadow-xl">
            <img
              src={delivery}
              alt="delivery.png"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <p
          className="text-[2.5rem] font-bold tracking-wide text-headingColor 
        lg:text-[4.25rem]"
        >
          The Fastest Delivery in{" "}
          <span className="text-[3rem] text-orange-600 lg:text-[5rem]">
            your City
          </span>
        </p>

        <p className="text-center text-base text-textColor md:w-[80%] md:text-left">
          We take pride in offering a unique culinary experience that combines
          the freshest ingredients with innovative recipes to tantalize your
          taste buds. Our restaurant is a haven for food enthusiasts who
          appreciate the goodness of nature's bounty.
        </p>

        <button
          onClick={cartClicked}
          type="submit"
          className="w-full rounded-lg bg-gradient-to-br from-orange-400
           to-orange-500 px-4 py-2 transition-all duration-100 ease-in-out
            hover:shadow-lg md:w-[auto]"
        >
          Order Now
        </button>
      </div>

      {/* Hero data */}

      <div className="relative flex flex-wrap justify-center gap-[1rem] overflow-hidden py-2">
        <img
          src={heroBg}
          alt="heroBG"
          className="absolute right-0 top-0 ml-auto h-420 w-full md:w-[80%] lg:h-650"
        />

        {heroDataList.map((data) => (
          <div className="w-[40%]" key={data.id}>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-cardOverlay px-[0.5rem] py-[1.5rem] text-center backdrop-blur-md">
              <img
                src={data.ImageSrc}
                alt={data.id}
                className="h-full w-full"
              />
              <p className="mt-2 text-base font-semibold text-textColor lg:mt-4 lg:text-xl">
                {data.name}
              </p>
              <p className="my-1 text-[12px] font-semibold text-lighttextGray lg:my-3 lg:text-sm">
                {data.description}
              </p>
              <p className="text-center text-sm font-semibold text-headingColor">
                <span className="text-xs text-red-600">{data.currency}</span>{" "}
                {data.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeContainer;
