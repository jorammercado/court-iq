import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './SectionOne.scss'
import '../Pages/css/main.css'

const SectionOne = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  const ref = useRef(null)
  const [divWidth, setDivWidth] = useState(0)
  const [divHeight, setDivHeight] = useState(0)
  // console.log(divWidth,divHeight, screenHeight)

  useEffect(() => {
    if (ref.current) {
      setDivWidth(ref.current.getBoundingClientRect().width)
      setDivHeight(ref.current.getBoundingClientRect().height)
    }

    const handleResize = () => {
      if (ref.current) {
        setDivWidth(ref.current.getBoundingClientRect().width)
        setDivHeight(ref.current.getBoundingClientRect().height)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const variants = {
    onscreen: {
      x: screenWidth - divWidth,
    },
    offscreen: {
      x: screenWidth > 830 ? screenWidth - 30 : screenWidth - 40,
    },
  }

  function MoveInWhenVisible({ children }) {
    return (
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        transition={{ duration: 1.25 }}
        variants={variants}
        style={{
          marginRight: screenWidth > 830 ? '0px' : '-25px',
          padding: 0,
          width: '100%',
          position: screenWidth <= 830 ? 'absolute' : 'initial',
          top: screenWidth <= 830 ? '5vh' : 'initial',
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <section id="one" className="main style2 right dark fullscreen">
      <MoveInWhenVisible>
        <div
          className="content box style2"
          ref={ref}
          style={{
            backgroundColor: '#faf7f2',
            borderRadius: '8px',
            ...(screenWidth <= 830 ? { width: '100%' } : {}),
          }}
        >
          <header>
            <h2>What We Do</h2>
          </header>
          <h5>
            We're revolutionizing the way basketball enthusiasts, teams, and analysts experience the
            game. <br></br> <br></br>
            <span style={{ color: '#EA6607' }}>
              Click on any player from Rosters to see their stats graphically rendered for quick
              analysis.
            </span>
          </h5>
        </div>
      </MoveInWhenVisible>

      <a href="#three" className="button style2 down anchored">
        Next
      </a>
    </section>
  )
}

export default SectionOne
