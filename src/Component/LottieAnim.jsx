import React from "react";
import Lottie from "lottie-react";
import Loader from "../assets/loader.json";

const LottieAnim = () => (
  <Lottie animationData={Loader} loop={true} className="w-24 h-24" />
);

export default LottieAnim;
