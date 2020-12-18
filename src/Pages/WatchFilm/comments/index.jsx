import React, { useEffect, useState } from "react";
import filmApi from "../../../api/filmApi";
import Loadding from "../../../components/Loadding";
import "./style.scss";
function Comments(props) {
  const { comments = [],user,filmId } = props;
  const [loadding,setLoadding] = useState(false)
  const [allComments,setAllcomment] = useState([])

  useEffect(()=>{
    try{
      filmApi.getComments({
        id:filmId,
        limit:5
      }).then((res)=>{
        console.log(res);
        if(res.status === 200){
          setAllcomment(res.data.comments)
        }
      })
    }catch(err){
      alert(err)
    }
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    try{
      filmApi.postComment({
        id:filmId,
        userId:user._id,
        comment:e.target.inputComment.value
      }).then((res)=>{
        if(res.status===200){
          setAllcomment([{
            comment:e.target.inputComment.value,
            user:[
              {
                avatar:user.avatar,
                userName:user.userName,
              }
            ]
          },...allComments])
          e.target.inputComment.value=""
        }
      })
    }catch(err){
      alert(err)
    }
  }
  useEffect(()=>{
  },[allComments])
  return (
    <div className="comments">
      <form onSubmit={(e)=>{
        e.preventDefault()
        if(user){
          handleSubmit(e)
        }
        else {
          e.target.inputComment.value=""
          alert('you have to login to comment')
        }
      }} className="comments__form">
        <img
          src={user?user.avatar:'https://firebasestorage.googleapis.com/v0/b/react-upload-image-d14cb.appspot.com/o/images%2Ficon-user.svg?alt=media&token=a31c548c-bc91-4cee-b861-80ecf0128d58'}
          alt="logo"
        />
        <input
          autoComplete="off"
          type="text"
          maxLength="185"
          placeholder="Your comments"
          name="inputComment"
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comments__listComment">
        <ul className="comments__listComment__container">
          {allComments.map((item,index) => (
            <li key={index}>
              <div className="comments__listComment__container__img">
                <img src={item.user[0].avatar} alt="logo" />
              </div>
              <div className="comments__listComment__container__info">
                <p>{item.user[0].userName}</p>
                <p>{item.comment}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="comments__listComment__loading">
                <span onClick={()=>{
                  try{
                    setLoadding(true)
                    filmApi.getComments({
                      id:filmId,
                      limit:allComments.length+5
                    }).then((res)=>{
                      console.log(res);
                      if(res.status === 200){
                        setAllcomment(res.data.comments)
                        setLoadding(false)
                      }
                    })
                  }catch(err){
                    alert(err)
                    setLoadding(false)
                  }
                }}>{loadding?<Loadding/>:'See More...'}</span>
        </div>
      </div>
    </div>
  );
}

export default Comments;
