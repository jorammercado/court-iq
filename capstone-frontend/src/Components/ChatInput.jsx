import React, { useState, useEffect } from 'react'
import { Input } from 'baseui/input'
import { Search } from "baseui/icon"
import './ChatInput.scss'

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleChange = (event) => setMessage(event.currentTarget.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (message.trim() !== '') onSubmit(message)
    setMessage('')
  }

  const dynamicPadding = windowWidth > 768 ? '250px' : windowWidth > 480 ? '50px' : '20px'

  const inputOverrides = {
    InputContainer: {
      style: {
        width: '100%',
        maxWidth: 'none',
      },
    },
    Input: {
      style: {
        paddingRight: dynamicPadding,
        paddingLeft: dynamicPadding,
      },
    },
    EndEnhancer: {
      style: {
        cursor: 'pointer',
      },
    },
  }

  const endEnhancer = (
    <button onClick={handleSubmit} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      <Search size="24px" color="white" />
    </button>
  )

  return (
    <form onSubmit={handleSubmit} className="chatForm" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <Input
        value={message}
        onChange={handleChange}
        placeholder="Ask a stat question..."
        endEnhancer={endEnhancer}
        overrides={inputOverrides}
      />
    </form>
  )
}

export default ChatInput
