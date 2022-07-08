import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Conversation from '../../components/Conversation'
import Message from '../../components/Message'
import { useAppContext } from '../../context/appContext'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import { ChatProfile } from '../../components'
import { FiSend } from 'react-icons/fi'

function Chat() {
  const location = useLocation()
  let conversationId = ''
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef(io('ws://localhost:8900'))
  const { user } = useAppContext()
  const scrollRef = useRef()

  useEffect(() => {
    if (!location.state) {
      return
    } else {
      let conversationId = location.state.conversationId
      const getConversation = async () => {
        const res = await axios('/api/conversation/byId/' + conversationId)
        setCurrentChat(res.data)
      }
      getConversation()
    }
  }, [location])
  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', (users) => {
      console.log(users)
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/conversation/' + user._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/api/message/' + currentChat?._id)
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage === '') {
      return
    }
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find((member) => member !== user._id)

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post('/api/message', message)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    console.log(currentChat)
  }, [messages])

  return (
    <Wrapper className='full-page'>
      <div className='chat-container'>
        <div className='search-container'>
          <input type='text' placeholder='Search' />
        </div>
        <div className='conversation-list'>
          {conversations.map((c) => {
            return (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  active={
                    currentChat && currentChat._id === c._id ? true : false
                  }
                  conversation={c}
                  currentUser={user}
                />
              </div>
            )
          })}
        </div>
        {currentChat ? (
          <>
            <ChatProfile currentChat={currentChat} />
            <div className='chat-message-list'>
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id} />
                </div>
              ))}
            </div>
            <div className='input-message'>
              <textarea
                placeholder='write something...'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button onClick={handleSubmit}>
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className='noConversationText'>
            Open a conversation to start a chat.
          </div>
        )}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .noConversationText {
    font-size: 30px;
    color: var(--grey-400);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-container {
    display: grid;
    grid:
      'search-container chat-title' 71px
      'conversation-list chat-message-list' 1fr
      'conversation-list input-message' calc(50px + 2rem)
      / 275px 1fr;
    max-width: 1440px;
    width: 100%;
    height: calc(100vh - 96px);
    background: white;
    margin: auto;
    border: 1px solid var(--grey-100);
  }

  // .chat-form {
  //   display: flex;
  //   align-items: center;
  //   grid-area: chat-form;
  //   background: #eee;
  //   border-radius: 0 0 10px 0;
  //   border-top: 1px solid darken(#eee, 12.16);
  //   padding-left: 42px;
  //   padding-right: 22px;

  //   input {
  //     flex: 1 0 0;
  //     outline: none;
  //     padding: 8px;
  //     border: 2px solid darken(#eee, 6.5%);
  //     border-right: none;
  //     color: darken(adjust-hue(#0048aa, -155), 23.33);
  //     border-radius: 6px 0 0 6px;
  //     font-size: 1.4rem;
  //     margin-left: -5px;
  //   }

  //   button {
  //     height: 46px;
  //     flex: 0 0 90px;
  //     border-radius: 0 6px 6px 0;
  //   }
  // }

  .input-message {
    grid-area: input-message;
    padding: 1rem;
    width: 100%;
    position: relative;
    border-top: 1px solid var(--grey-100);

    textarea {
      width: 100%;
      height: 50px;
      line-height: 20px;
      border-radius: 1.5rem;
      background: #f2f3f5;
      border: none;
      outline: none;
      resize: none;
      padding: 15px 15px;
      overflow: hidden;
      font-size: 15px;

      &:active {
        border: none;
      }

      &::-webkit-scrollbar {
        background-color: transparent;
        width: 0px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
    }
    button {
      position: absolute;
      border: none;
      outline: none;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
      color: var(--primary-500);
      svg {
        font-size: 20px;
      }
    }
  }

  .chat-message-list {
    grid-area: chat-message-list;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 0px 20px;
    overflow: auto;

    &::-webkit-scrollbar {
      background-color: #f2f3f5;
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
    }
  }
  .message-row {
    display: grid;
    grid-template-columns: 99%;
    margin-bottom: 20px;
  }
  .message-content {
    display: grid;
    > img {
      border-radius: 100%;
      grid-row: span 2;
      width: 48px;
      height: 48px;
    }
    > .message-time {
      font-size: 1.1rem;
      color: black;
    }
    > .message-text {
      padding: 9px 14px;
      font-size: 1.3rem;
      margin-bottom: 5px;
    }
  }
  .you-message {
    justify-content: end;

    > .message-content {
      justify-items: end;

      > .message-text {
        background: #0048aa;
        color: #fff;
        border: 1px solid #0048aa;
        border-radius: 14px 14px 0 14px;
      }
    }
  }

  .other-message {
    justify-items: start;

    > .message-content {
      justify-items: start;
      grid-template-columns: 48px 0.5fr;
      grid-column-gap: 5px;

      > .message-text {
        background: #eee;
        color: #111;
        border: 1px solid darken(#eee, 13.18);
        border-radius: 14px 14px 14px 0;
      }
    }
  }
  .conversation-list {
    grid-area: conversation-list;
    background: white;
    border-right: 1px solid var(--grey-100);
    overflow: auto;

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #e0e0e0;
      }
    }
  }
  .conversation {
    display: grid;
    grid-template-columns: 50px 1fr max-content;
    grid-gap: 2px;
    color: black;
    font-size: 1.3rem;
    border-bottom: 1px solid #54d1db;
    padding: 5px 20px 0px 15px;

    &.active,
    &:hover {
      background: darken(#0048aa, 8%);
    }

    &:hover {
      cursor: pointer;
    }

    &.active {
      .title-text,
      .created-date,
      .conversation-message {
        font-weight: bold;
      }
    }

    > img {
      grid-row: span 2;
      height: 40px;
      width: 40px;
      border-radius: 100%;
    }

    .title-text {
      font-weight: bold;
      padding-left: 5px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

    .created-date {
      color: #555555;
      white-space: nowrap;
      font-size: 0.9rem;
    }

    .conversation-message {
      grid-column: span 2;
      padding-left: 5px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }
  .search-container {
    display: flex;
    align-items: center;
    grid-area: search-container;
    background: #54d1db;
    padding: 0 20px;
    z-index: 1;

    input {
      width: 0;
      flex: 1 0 0;
      color: #eee;
      outline: none;
      font-weight: bold;
      border-radius: 2px;
      height: 30px;
      border: 0;
      padding-left: 48px;
      padding-right: 20px;
      font-size: 1.4rem;
      background: url('search2.webp') no-repeat #ffffff;
      background-position: 15px center;
      background-size: 20px 20px;
    }

    input::placeholder {
      color: #ddd;
      font-weight: bold;
    }
  }
  .chat-title {
    display: grid;
    grid: 1fr / 0.2fr 300px;
    align-content: center;
    align-items: center;
    grid-area: chat-title;
    background: #54d1db;
    color: white;
    font-weight: bold;
    font-size: 1.9rem;
    box-shadow: 0 1px 3px -1px darken(#eee, 75.29);
    padding: 0 20px;
    z-index: 1;

    > img {
      height: 40px;
      width: 40px;
      border-radius: 100%;
    }
  }
`

export default Chat
