import { useState, useEffect } from 'react';
import Memo from './Memo';
import './Memo.css'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import WriteMemo from './WriteMemo';
import { ToastMessage } from "./ToastMessage";
import {Helmet} from "react-helmet"
import KAKAOButton from './KAKAOButton';



export default function Roll() {
  const {idx} = useParams();//이거가 인덱스(paperid 가져오는 거...)
  const navigate = useNavigate();
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
  
  const [lst, setlst] = useState([]);
  const getlst = async () => {
    const res = await (await axios.get(`http://43.202.79.6:3001/getpost?paperId=${idx}`)).data;
    setlst(res)
  }

  useEffect(() => {
    getlst();
  });
  
  const [nickname, setnickname] = useState("")

  useEffect(() => {
    console.log(idx)
    axios.get(`http://43.202.79.6:3001/getname?paperId=${idx}`)
    .then(function (response) {
      const {userName} = response.data[0]
      console.log(userName)
      setnickname(userName)
    })
    .catch(function (error) {
      console.log(error)
    })  
    },[]);

  const [ispopup, setispopup] = useState(false)

  const [postData, setPostData] = useState('');

  const handleGetData = async () => {
    try {
      const response = await axios.get(`http://43.202.79.6:3001/result?paperId=${idx}`);
      const extractedBodies = response.data.map(item => item.body);
      const finalBody = extractedBodies.join('. ');
      
      setPostData(finalBody);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
/////////////////////////////////////////////////내용 부족하거나 이상하면 에러남. api 서버에서.
  useEffect(()=>{
    if (postData != ''){
      console.log(postData)
      handlesum()
      
      
    }
    
  }, [postData])

  const handlesum = async () => {
    try {
      const response = await axios.post("http://43.202.79.6:3001/api", {result: postData})
      const jsonString = JSON.stringify(response.data.summary);
      const finalresult = jsonString.slice(1, -1);
      
      navigate(`/roll/${idx}/result`, {state: {rst: finalresult, nick: nickname}})

    } catch (error) {
      activeToast()///////////////
    }
  }



  


    return (
      <div className='roll'>
        <Helmet>
          <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js" 
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8" crossorigin="anonymous"></script>
        </Helmet>
        <div>
        
          <div style={{padding: "20px", textAlign: "center"}}>
            <h2 style={{marginTop: 0}}>{nickname}의 롤링페이퍼</h2>
          </div>
          <div style={{marginLeft: "10vw", marginRight: "10vw",paddingRight: "20px"}} className='wrapper grid'>
            {lst.map((post)=>(
            <Memo postTitle = {post.userName} postDetail = {post.body} postId = {post.postId} />
            ))}
          </div>

          <div style={{textAlign: "center"}}>
            <button style={{marginBottom: "20px", marginRight: "10px"}} className='btn' onClick={()=>{
              handleGetData()
              
              
            }}>결과 보기</button> {/* 이거가 요약 해주는 버튼... */}
            <button style={{marginBottom: "20px", marginRight: "10px"}} className='btn' onClick={()=>{setispopup(true)}}>메모 쓰기</button>
            <button className='btn' onClick={()=>{window.location.href="/mainhome"}}>메인으로 돌아가기</button>
            <KAKAOButton txt={`http://localhost:3000/roll/${idx}`}/>
            
            
            <WriteMemo isOpen={ispopup} onClose={()=>setispopup(false)} paperId={idx}/>
            {downloadToast && <ToastMessage text={"아이디/비번이 다릅니다."} />}
            

          </div>
        </div>
      </div>
    );
  }