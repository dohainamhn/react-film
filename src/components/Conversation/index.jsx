import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { storage } from "../../fireBase";
import icons, { checkIcon } from "./icons";
import userContext from "../../context/UserContext";
import io from "socket.io-client";
import conversationApi from "../../api/conversationApi";
import Loadding from "../Loadding";
const socket = io(process.env.REACT_APP_API_URL, { transports: ["websocket"] });

function Conversation() {
  const [imageUrl, setImageUrl] = useState([]);
  const [loadding, setLoadding] = useState(false);
  const imageUploadedRef = useRef([]);
  const [currentChats, setCurrentChat] = useState([]);
  const chatRef = useRef([]);
  const chatBox = useRef();
  const { user, setUser } = useContext(userContext);
  const popupRef = useRef();
  const inputValueRef = useRef();
  const renderIcon = () => {
    let rowNumbers = Math.ceil(icons.length / 8);
    let tbodyArr = [];
    let id = 0;
    for (let i = 0; i < rowNumbers; i++) {
      let arr = [];
      for (let y = 0; y < 8; y++) {
        let iconImg = React.createElement("img", {
          id: id,
          onClick: onClickIcon,
          src: icons[id].url,
        });
        let td = React.createElement("td", { key: id }, iconImg);
        arr.push(td);
        id++;
      }
      let tr = React.createElement("tr", { key: id }, arr);
      tbodyArr.push(tr);
    }
    let tbody = React.createElement("tbody", null, tbodyArr);
    return tbody;
  };
  const handleOnchange = (e) => {
    if (e.target.files[0] !== undefined) {
      console.log("zoday");
      imageUploadedRef.current.push(e.target.files[0]);
      e.target.files = null;
      console.log(imageUploadedRef.current);
      imageUploadedRef.current.forEach((item) => {
        setImageUrl([...imageUrl, URL.createObjectURL(item)]);
      });
    }
  };
  const createChat = (data, image = false) => {
    console.log(image);
    if (image) {
      return (
        <div className="conversation__chatBox__item__inner">
          <div className="conversation__chatBox__item__inner__avatar">
            <img src={data.sender[0].avatar} alt="" />
          </div>
          <div className="conversation__chatBox__item__inner__info">
            <div className="conversation__chatBox__item__inner__info__sender">
              {data.sender[0].userName}
            </div>
            <div className="conversation__chatBox__item__inner__info__img">
              <img src={data.content} alt="" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="conversation__chatBox__item__inner">
        <div className="conversation__chatBox__item__inner__avatar">
          <img src={data.sender[0].avatar} alt="" />
        </div>
        <div className="conversation__chatBox__item__inner__info">
          <div className="conversation__chatBox__item__inner__info__sender">
            {data.sender[0].userName}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="conversation__chatBox__item__inner__info__content"
          ></div>
        </div>
      </div>
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let Arr = [...currentChats];
    if (imageUploadedRef.current.length > 0) {
      for (let i = 0; i < imageUploadedRef.current.length; i++) {
        const uploadTask = storage
          .ref(`images/${imageUploadedRef.current[i].name}`)
          .put(imageUploadedRef.current[i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => { },
          (err) => {
            console.log(err);
          },
          () => {
            storage
              .ref("images")
              .child(imageUploadedRef.current[i].name)
              .getDownloadURL()
              .then((url) => {
                socket.emit("updateData", {
                  senderId: user._id,
                  isImg: true,
                  content: url,
                });
              })
              .then(() => {
                setTimeout(() => {
                  if (i === imageUploadedRef.current.length - 1) {
                    console.log("zo day");
                    imageUploadedRef.current = [];
                    setImageUrl([]);
                  }
                }, 1000);
              });
          }
        );
      }
    }
    if (e.target.inputText.value.trim() !== "") {
      let data = e.target.inputText.value;
      let check = checkIcon(data);
      if (check) {
        for (let x of check) {
          data = data.split(x.syntax).join(`<span><img src="${x.url}"></span>`);
        }
      }
      console.log(data);
      socket.emit("updateData", {
        senderId: user._id,
        isImg: false,
        content: data,
      });
    }

    e.target.inputText.value = "";
  };
  const handleClick = (e, index) => {
    if (e.target.id === "removeUploadImg") {
      let a = [...imageUrl];
      a.splice(index, 1);
      imageUploadedRef.current.splice(index, 1);
      setImageUrl(a);
    } else if (e.target.id === "input-file") {
      e.target.value = null;
    } else {
      popupRef.current.classList.toggle("visiblePopup");
    }
  };

  const onClickIcon = (e) => {
    inputValueRef.current.value += icons[parseInt(e.target.id)]["syntax"];
    inputValueRef.current.focus();
  };

  useEffect(() => {
    console.log(currentChats);
    chatRef.current = currentChats;
    chatBox.current.scrollTop = chatBox.current.offsetHeight;
  }, [currentChats, imageUrl]);
  useEffect(() => {
    conversationApi
      .getMany({
        limit: 10,
      })
      .then((res) => {
        if (res.status === 200) {
          let arr = [];
          res.data.data.forEach((item) => {
            if (item.isImg) arr.unshift(createChat(item, item.isImg));
            else arr.unshift(createChat(item, item.isImg));
          });
          setCurrentChat(arr);
        }
      });
    socket.on("serverSend", (data) => {
      console.log(chatRef.current);
      let arr = chatRef.current;
      arr.push(createChat(data, data.isImg));
      setCurrentChat([...arr]);
    });
    return () => {
      socket.off("serverSend");
    };
  }, []);
  return (
    <div className="conversation">
      <div className="conversation__title">Conversation</div>
      {loadding && <Loadding fonsize={"20px"} />}
      <div
        ref={chatBox}
        onScroll={(e) => {
          let scrolled = e.target.scrollTop;
          if (scrolled <= 0) {
            setLoadding(true);
            conversationApi
              .getMany({
                limit: currentChats.length + 5,
              })
              .then((res) => {
                if (res.status === 200) {
                  let arr = [];
                  res.data.data.forEach((item) => {
                    if (item.isImg) arr.unshift(createChat(item, item.isImg));
                    else arr.unshift(createChat(item, item.isImg));
                  });
                  setCurrentChat(arr);
                  setLoadding(false);
                }
              });
          }
        }}
        className="conversation__chatBox"
      >
        {currentChats.map((item, index) => (
          <div className="conversation__chatBox__item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="conversation__inputChat">
        <div className="conversation__inputChat__imageUploaded">
          {imageUrl.length > 0 &&
            imageUrl.map((item, index) => (
              <div
                key={index}
                className="conversation__inputChat__imageUploaded__item"
              >
                <i
                  id="removeUploadImg"
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                  className="far fa-window-close"
                ></i>
                <img src={item} alt="" />
              </div>
            ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (user) {
              handleSubmit(e);
            } else alert("please SignIn");
          }}
          className="conversation__inputChat__form"
        >
          <input
            autoComplete="off"
            ref={inputValueRef}
            name="inputText"
            placeholder="Type your text here"
            type="text"
          />
          <label htmlFor="input-file">
            <i className="fas fa-image"></i>
          </label>
          <input
            onClick={handleClick}
            onChange={handleOnchange}
            style={{
              display: "none",
            }}
            id="input-file"
            type="file"
          />
          <div
            className="conversation__inputChat__form__icon"
            onClick={handleClick}
          >
            <div ref={popupRef} className="popupIconChat">
              <table>{renderIcon()}</table>
            </div>
            <i id="icon" className="fas fa-smile"></i>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Conversation;
