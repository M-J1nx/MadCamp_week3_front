import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Memo.css';
import { ToastMessage } from "./ToastMessage";



function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        // 로그인 처리 로직
        try {
          // 가정: 로그인 성공 후 사용자 정보를 받아옴
          const userData = { username: 'exampleUser', email: 'user@example.com' };
          login(userData);
          
          
        } catch (error) {
          // 로그인 실패 처리
          console.error('로그인 실패:', error);
        }
      };
    
    useEffect(() => {
        
        if (user) {
            console.log(user);
          navigate('/');
          
        }
    }, [user]);


    const [downloadToast, setDownloadToast] = useState(false);
    function activeToast() {
      setDownloadToast(true);
      let timer = setTimeout(() => {
        setDownloadToast(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }

    
    
    return (
      <div className="login">
        <div className="loginitem">
        {downloadToast && <ToastMessage text={"아이디/비번이 다릅니다."} />}
          <h2 >로그인</h2>
  
          <div>
            <p><input className="inputbar" type="text" name="username" placeholder="아이디" onChange={event => {
              setId(event.target.value);
            }} /></p>
            <p><input className="inputbar" type="password" name="pwd" placeholder="비밀번호" onChange={event => {
              setPassword(event.target.value);
            }} /></p>

            <p  className='LoginBox'><button style={{height: "10%",  marginRight: "10px",flex: 1}} className="btn" onClick={() => {
              {/* 통신 부분... */}
              {/* 밑에 이동하는 코드는 로그인이 성공했을 때만 이동하게 나중에 수정해야 함... */}
              {/* 비번 틀리면 토스트 하는 거?  */}
                axios.post("http://43.202.79.6:3001/login", {
                    userId: id,
                    userPw: password
                })
                .then(function (response) {
                    const {message, userName} = response.data;
                    if (message == 'true') {
                        
                        sessionStorage.setItem("id", id);
                        sessionStorage.setItem("userName", userName);
                        sessionStorage.setItem("hasroll", false);
                        window.location.href = "/mainhome"
                        console.log(userName)
                    } else {
                        activeToast()
                        
                    }
                }).catch(function (error) {
                    console.log(error);
                })
                
                }}>로그인</button>
                <button style={{height: "10%", marginRight: "10px", flex: 1}} className="btn" onClick={() => {
            window.location.href = "/sign"
          }}>계정 만들기</button>
          <button style={{height: "10%", flex: 1}} className="btn" onClick={()=>{window.location.href="/"}}>홈 화면 가기</button></p>
          </div>

          
        </div>
      
    </div> 
    )
  }

export default Login;