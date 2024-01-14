import { useState } from "react"
import axios from 'axios'

function Signup() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setPassword2] = useState("");
  
    return (<>
      <h2>회원가입</h2>
  
      <div>
        <p><input className="login" type="text" placeholder="아이디" onChange={event => {
          setId(event.target.value);
        }} /></p>
        <p><input className="login" type="password" placeholder="비밀번호" onChange={event => {
          setPassword(event.target.value);
        }} /></p>
        <p><input className="login" type="text" placeholder="닉네임" onChange={event => {
          setPassword2(event.target.value);
        }} /></p>
  
        <p><input className="btn" type="submit" value="회원가입" onClick={() => {
          {/* 통신 부분.... */}
          {/* 이거도 db에 아이디 있는지 확인하고 토스트 해야 함... 로그인이랑 반대...*/}
          axios.post("http://143.248.225.204:3001/signup", {
                userId: id,
                userPw: password,
                userName: nickname
            })
            .then(function (response) {

                const {message} = response.data;
                if (message == 'true') {
                  console.log("200", message);
                  window.location.href = "/login"
                } else {
                  console.log("200", message);
                }
                
            }).catch(function (error) {
                console.log(error);
            })
        }} /></p>
      </div>
  
      <p>로그인화면으로 돌아가기  <button onClick={() => {
        window.location.href = "/login"
      }}>로그인 화면</button></p>
    </> );
  }


export default Signup;