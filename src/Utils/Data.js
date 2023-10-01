import i1 from "../assets/img/i1.png";
import i2 from "../assets/img/f1.png";
import i3 from "../assets/img/c3.png";
import i4 from "../assets/img/fi1.png";


let heroData = [
  {
    id: 1,
    name: "IceCream",
    description: "Chocolate & Vanilla",
    ImageSrc: i1,
    price: "5.62",
    currency: "$",
  },
  {
    id: 2,
    name: "StrawBerries",
    description: "Fresh StrawBerries",
    ImageSrc: i2,
    price: "10.62",
    currency: "$",
  },
  {
    id: 3,
    name: "Chicken Kebab",
    description: "Mixed Kebab",
    ImageSrc: i3,
    price: "8.62",
    currency: "$",
  },
  {
    id: 4,
    name: "Fish Kebab",
    description: "Mixed Fish Kebab",
    ImageSrc: i4,
    price: "5.62",
    currency: "$",
  },
];


export const categories = [
  {
    id: 1,
    name: "Chicken",
    urlParamName: "chicken",
  },
  {
    id: 4,
    name: "Fish",
    urlParamName: "fish",
  },
  {
    id: 3,
    name: "Rice",
    urlParamName: "rice",
  },
  {
    id: 5,
    name: "Fruits",
    urlParamName: "fruits",
  },
  {
    id: 6,
    name: "Icecreams",
    urlParamName: "icecreams",
  },
  {
    id: 2,
    name: "Curry",
    urlParamName: "curry",
  },
  {
    id: 7,
    name: "Soft Drinks",
    urlParamName: "drinks",
  },
];


export default heroData