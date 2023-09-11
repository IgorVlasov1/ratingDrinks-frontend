import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessagesFromPublicChat,
  sendMessageInPublicChat,
} from "../http/votingsApi";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { API_URL } from "../config";
import defaultAvatar from "../assets/default.svg";
import { AiOutlineSend } from "react-icons/ai";
const PublicChat = () => {
  const dispatch = useDispatch();
  const messagesRef = useRef(null);
  const isAuth = useSelector((state) => state.user.isAuth);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [messageList, setMessageList] = useState([]);
  const messages = useSelector((state) => state.votes.messages);
  const [isSending, setIsSending] = useState(false);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // если значение поля не пустое, то показываем элемент отправки сообщения
    if (e.target.value) {
      setIsSending(true);
    } else {
      setIsSending(false);
    }
  };

  const sendButtonStyles = {
    opacity: isSending ? 1 : 0,
    transition: "opacity .3s ease",
  };

  useEffect(() => {
    dispatch(getAllMessagesFromPublicChat());
  }, [dispatch]);

  useEffect(() => {
    setMessageList(messages);
    if (shouldScroll) {
    }
  }, [messages, shouldScroll]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    dispatch(
      sendMessageInPublicChat(currentUser.login, currentUser.avatar, message)
    );

    setMessage("");
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = messagesRef.current;
    if (scrollHeight - (clientHeight + scrollTop) >= 500) {
      console.log(
        "scrollTop: ",
        scrollTop,
        "clientHeight: ",
        clientHeight,
        "scrollHeight: ",
        scrollHeight
      );
      setShouldScroll(true);
    } else {
      setShouldScroll(false);
    }
    console.log("Надо крутить?", shouldScroll);
  };

  const scrollToBottom = () => {
    messagesRef.current.scrollTop = `${messagesRef.current.scrollHeight * 2}`;
    console.log(messagesRef.current.scrollTop);
    console.log(messagesRef.current.scrollHeight);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Общий чат</p>
        {shouldScroll && (
          <BsFillArrowDownSquareFill
            onClick={scrollToBottom}
            className="scrollDown"
          />
        )}
      </div>

      {/* Окно сообщений */}
      <div onScroll={handleScroll} ref={messagesRef} className="chat__messages">
        {/* Каждое сообщение */}
        {messageList.map((message) => (
          <div key={message.id} className="chat__message">
            <div className="chat__message-avatar">
              <img
                src={
                  // message.authorPicture
                  // ? `${API_URL}${message.authorPicture}`
                  // :
                  defaultAvatar
                }
                alt="User Avatar"
              />
            </div>
            <div className="chat__message-content">
              <div className="chat__message-name">{message.authorName}</div>
              <div className="chat__message-text">{message.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat__form">
        {isAuth ? (
          <>
            <input
              type="text"
              placeholder="Написать сообщение..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e);
                  setMessage("");
                  setTimeout(() => scrollToBottom(), 100);
                }
              }}
            />
            <AiOutlineSend
              className="chat__send-button"
              style={sendButtonStyles}
              onClick={(e) => {
                handleSendMessage(e);
                setMessage("");
                setTimeout(() => scrollToBottom(), 100);
              }}
            />
          </>
        ) : (
          <div className="login_phrase">
            <NavLink to="/login">Войдите</NavLink> и присоеденитесь к обсуждению
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicChat;
