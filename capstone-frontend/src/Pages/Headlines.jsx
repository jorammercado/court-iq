import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './HeadLine.scss'
import { Link } from 'react-router-dom'
import images from '../constants/images'
import 'animate.css'
import { Block } from 'baseui/block'
import { Heading, HeadingLevel } from 'baseui/heading'
import { LabelMedium, LabelLarge } from 'baseui/typography'

function Headlines() {
  const [headlines, setHeadlines] = useState([])
  const [error, setError] = useState(null)
  const [padding, setPadding] = useState(window.innerWidth / 100)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth > 1400 ? (window.innerWidth - 1300) / 400 - 10 : 65)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const URL = import.meta.env.VITE_HEADLINE_URL
  const KEY = import.meta.env.VITE_HEADLINE_KEY
  const HOST = import.meta.env.VITE_HEADLINE_HOST

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const options = {
          method: 'GET',
          url: URL,
          params: {
            recentNews: 'true',
            maxItems: '10',
          },
          headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': HOST,
          },
        }
        const response = await axios.request(options)
        if (Array.isArray(response.data)) {
          setHeadlines(response.data)
        } else if (response.data.body && Array.isArray(response.data.body)) {
          setHeadlines(response.data.body)
        } else {
          console.error('Invalid data format received from API')
          setError('Invalid data format received from API')
        }
      } catch (error) {
        setError(error.message)
        console.error('Error searching for headlines:', error)
      }
    }

    fetchHeadlines()
  }, [])

  return (
    <Block
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection="column"
      className="standings"
    >
      <Block
        className="subb__heading"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexDirection="row"
        backgroundColor="#EA6607"
        padding="0px"
        height="60px"
        marginBottom="5px"
      >
        <Block
          className="subHeading_contain"
          display="flex"
          justifyContent="left"
          alignItems="center"
          width="1270px"
          paddingLeft={padding - 5 + 'px'}
        >
          <HeadingLevel>
            <Heading styleLevel={!isMobile ? 5 : 6} color="black">
              Top Headline News
            </Heading>
          </HeadingLevel>
        </Block>
      </Block>
      <div className="headlines-container">
        <div className="headlines-description" style={{ maxWidth: '1270px', borderRadius: '8px' }}>
          <HeadingLevel>
            <Heading styleLevel={6} color="white">
              Welcome to our NBA news section, providing the latest and foremost headlines from the
              world of NBA. Keep abreast of the most recent developments in the basketball realm.
            </Heading>
          </HeadingLevel>
        </div>

        {error && <p className="error-message">Error: {error}</p>}
        <div className="headline-list">
          {headlines.map((headline, index) => (
            <div className="headline" key={index} style={{ borderRadius: '8px' }}>
              <img className="headline-image" src={headline.image} alt={headline.title} />
              <LabelLarge className="headline-title">{headline.title}</LabelLarge>
              <LabelMedium
                className="headline-link"
                onClick={() => window.open(headline.link, '_blank')}
              >
                Read more
              </LabelMedium>
            </div>
          ))}
        </div>
        <div className="compare-card">
          <h1 className="compare-title">Curious about player comparisons?</h1>
          <div className="img-headlines">
            <img className="court-im1" src={images.playerVs2} alt="" />
            <img className="court-im1" src={images.vs} alt="" />
            <img className="court-im1" src={images.playerVs} alt="" />
          </div>
          <h4 className="compare-description">
            <strong>
              {' '}
              Are you eager to see how your favorite NBA players stack up against each other?{' '}
            </strong>{' '}
            <br /> Our player comparison tool allows you to explore detailed statistics and make
            informed comparisons. <br />
            <strong>Click below to begin your exploration.</strong>
          </h4>
          <Link
            className="compare-link"
            to="/playerComparison"
            style={{ borderRadius: '8px', padding: '5px 15px' }}
          >
            <p className="text-btn" style={{ marginBottom: '4px' }}>
              {' '}
              <strong>Explore player comparisons</strong>
            </p>
          </Link>
        </div>
      </div>
    </Block>
  )
}

export default Headlines
