import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loadding from "../../../components/Loadding";
import "./style.scss";
function SlideShow(props) {
  const { slides } = props;
  console.log(slides);
  const slideShowRef = useRef();
  let [count, setCount] = useState(0);
  let runSlideShowRef = useRef();
  let mouseOverXRef = useRef(0);
  useEffect(() => {
    function handleStart(e) {
      mouseOverXRef.current = e.touches[0].clientX;
    }
    function handleEnd(e) {
      if (
        mouseOverXRef.current > e.changedTouches[0].clientX &&
        mouseOverXRef.current - e.changedTouches[0].clientX > 50
      ) {
        console.log("right");
        if (count < slides.length - 1) setCount(count + 1);
        else if (count >= slides.length - 1) setCount(0);
      } 

      else if (
        mouseOverXRef.current < e.changedTouches[0].clientX &&
        e.changedTouches[0].clientX - mouseOverXRef.current > 50
      ) {
        console.log("left");
        if (count > 0) setCount(count - 1);
        else if (count <= 0) setCount(slides.length - 1);
      }
    }
    let slide = slideShowRef.current;
    slide.addEventListener("touchstart", handleStart,{passive:true} );
    slide.addEventListener("touchend", handleEnd);
    runSlideShowRef.current = setInterval(() => {
      if (count >= slides.length - 1) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    }, 7000);
    return () => {
      slide.removeEventListener("touchstart", handleStart);
      slide.removeEventListener("touchend", handleEnd);
      clearInterval(runSlideShowRef.current);
    };
  }, [count, slides.length]);

  const changeSlideImg = (index) => {
    slideShowRef.current.style.transform = `translateX(-${index * 100}%)`;
    setCount(index);
  };
  return (
    <div className="home__slideShow">
      <div
        ref={slideShowRef}
        style={{
          transform: `translateX(-${count * 100}%)`,
        }}
        className="home__slideShow__container"
      >
        {slides.length?
          slides.map((item) => {
          return (
            <div key={item._id} className="home__slideShow__item">
              <Link to={`/watch-film/${item._id}`}>
                <img src={item.largerImg} alt={item.ename} />
                </Link>
            </div>
          );
        }):<Loadding/>
      }
      </div>
      <div className="home-slideShow-dotButton">
        <div onClick={() => {
          if (count > 0) {
            changeSlideImg(count - 1)
          }
        }} className="home-slideShow-arrow">
          <i className="fas fa-chevron-left"></i>
        </div>
        <ul>
          {slides.map((item, index) => {
            return (
              <li className={index} key={item._id}>
                <span
                  style={{
                    transform: count === index && 'scale(1.1)',
                    backgroundColor: count === index ? "rgba(255,255,255,0.9)" : "transparent",
                  }}
                  onClick={() => changeSlideImg(index)}
                ></span>
              </li>
            );
          })}
        </ul>
        <div onClick={() => {
          if (count < slides.length - 1) {
            changeSlideImg(count + 1)
          }
        }} className="home-slideShow-arrow">
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}

export default SlideShow;
