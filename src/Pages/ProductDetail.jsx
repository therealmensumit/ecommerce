import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LottieAnim from "../Component/LottieAnim";
import Zoom from "react-medium-image-zoom";
import { Rating } from "react-simple-star-rating";
import "react-medium-image-zoom/dist/styles.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        // Set the main image to the first image in the product images array initially
        if (res.data.images.length > 0) {
          setMainImage(res.data.images[0]); // Set the main image to the first image URL
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  //   if (!product) return <p>Product not found.</p>;

  return (
    <>
      <div className="container py-16">
        {loading ? (
          <LottieAnim />
        ) : (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <figure className="h-96 bg-white">
                <Zoom>
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="max-w-full h-96 mx-auto object-contain"
                  />
                </Zoom>
              </figure>
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    onClick={() => handleThumbnailClick(img)}
                    key={i}
                    className={`overflow-hidden border-2 rounded ${
                      mainImage === img ? "border-primary" : ""
                    }`}>
                    <img src={img} className="w-24 h-24 object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-8">
              <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
              <Rating
                initialValue={product.rating}
                iconsCount={5}
                size={24}
                allowFraction={true}
                readonly={true}
                SVGclassName={`inline-block`}
              />

              <p className="mb-3">
                <strong>Category: </strong>
                <span>{product.category}</span>
              </p>
              <p className="mb-3">
                <strong>Price: </strong>
                <span>${product.price}</span>
              </p>
              <p className="">{product.description}</p>
            </div>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
};

export default ProductDetail;
