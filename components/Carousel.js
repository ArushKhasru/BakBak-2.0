"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import one from "../assets/1.png"
import two from "../assets/2.png";
import three from "../assets/3.png";
import four from "../assets/4.png";
import five from "../assets/5.png";
import six from "../assets/6.png";
import seven from "../assets/7.png";
import eight from "../assets/8.png";

const images = [one, two, three, four, five, six, seven, eight];

export default function AppleCarousel() {

  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = (newDirection) => {

    setIndex(([prev]) => {

      const next =
        (prev + newDirection + images.length) % images.length;

      return [next, newDirection];

    });

  };

  useEffect(() => {

    if (paused) return;

    const interval = setInterval(() => {

      paginate(1);

    }, 1500);

    return () => clearInterval(interval);

  }, [paused]);


  const variants = {

    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),

    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: {
          type: "spring",
          stiffness: 120,
          damping: 20,
        },
        opacity: {
          duration: 0.25,
        },
        scale: {
          duration: 0.25,
        },
      },
    },

    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
      },
    }),

  };


  return (

    <div
      className="w-full max-w-5xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-2 shadow-2xl overflow-hidden">

        <div className="relative rounded-xl aspect-video overflow-hidden">

          <AnimatePresence initial={false} custom={direction}>

            <motion.img

              key={index}

              src={images[index].src}

              custom={direction}

              variants={variants}

              initial="enter"

              animate="center"

              exit="exit"

              drag="x"

              dragConstraints={{ left: 0, right: 0 }}

              dragElastic={0.2}

              onDragEnd={(e, { offset, velocity }) => {

                const swipe = offset.x + velocity.x;

                if (swipe < -100) paginate(1);

                else if (swipe > 100) paginate(-1);

              }}

              className="absolute w-full h-full object-cover"

            />

          </AnimatePresence>

        </div>

      </div>

      {/* Apple-style dots */}

      <div className="flex justify-center gap-2 mt-4">

        {images.map((_, i) => (

          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`

              h-2 rounded-full transition-all duration-300

              ${i === index
                ? "w-6 bg-white"
                : "w-2 bg-white/30 hover:bg-white/60"}

            `}
          />

        ))}

      </div>

    </div>

  );

}