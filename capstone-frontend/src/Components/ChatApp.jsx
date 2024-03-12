import React, { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatOutput from './ChatOutput'
import { Popover, PLACEMENT } from 'baseui/popover'
import { Spinner } from 'baseui/spinner'
import axios from 'axios'
import { Notification, KIND } from 'baseui/notification'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const ChatApp = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let timer
        if (isOpen && !isLoading) {
            // about 4 seconds
            timer = setTimeout(() => {
                setIsOpen(false)
            }, 4000)
        }
    
        return () => clearTimeout(timer)
    }, [isOpen, isLoading])

    const handleQuerySubmit = async (userQuery) => {
        setIsLoading(true)
        setIsOpen(true) 
        setResponse('') 
        setErrorMessage('') 

        if (!userQuery.trim()) {
            setIsLoading(false)
            setIsOpen(false)
            return
        }

        try {
            const response = await axios.post(`${VITE_BASE_URL}/flask/ask`, { question: userQuery })
            if (response.data && response.data.answer) {
                setResponse(response.data.answer)

            } else {
                setErrorMessage('No response received from the server.')
            }
        } catch (error) {
            console.error('Error getting response from flask app:', error)
            setErrorMessage('Type in a question!')
            
        } finally {
            setIsLoading(false) 
        }
    }

    return (
        <div>
            <Popover
                isOpen={isOpen}
                onClickOutside={() => setIsOpen(false)}
                content={() => (
                    isLoading ? <Spinner /> : errorMessage ?
                        <Notification kind={KIND.negative} closeable>
                            {errorMessage}
                        </Notification> :
                        <div style={{ padding: '10px' }}>{response}</div>
                )}
                placement={PLACEMENT.bottom}
            >
                <div>
                    <ChatInput onSubmit={handleQuerySubmit} />
                </div>
            </Popover>
        </div>
    )
}

export default ChatApp
