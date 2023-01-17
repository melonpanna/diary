import React from 'react'
import {useState,useEffect} from 'react'
import styled from "styled-components"
import './Diary.css'
const Board=styled.div`
    height:600px;
    width:1200px;
    display:flex;
    justify-content:space-evenly;
    background-color:#EEDFCC;
    border-radius:20px;
`;
const Contents=styled.div`
    width:500px;
    background-color:#EEDFCC;
    padding:50px 20px;
`;
const FirstLine=styled.div`
    background-color: #FFFAF0;
    display:flex;
    align-items:center;
    width: 350px;
    height:24px;
    margin:6px;
    padding:4px 12px;
    font-size:18px;
    border:2px solid #DEB48C;
    border-radius:8px;
`;
const Right=styled.div`
    padding:10px;
    width:500px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    background-color:#EEDFCC;
`;
const Page=styled.div`
    width:90%;
    min-height:30%;
    border:2px solid #DEB48C;
    background-color: #FFFAF0;
    padding:30px;
`;

const Note=styled.div`
    border:2px solid #DEB48C;
    padding:30px;
    width:90%;
    min-height:200px;
    background-color:#FFFAF0;
`;
const Title=styled.input`
    font-style:italic;
    background-color:#FFFAF0;
`;
const Delete=styled.button`
    border:none;
    font-size:18px;
    height:26px;
    margin:0;
    background-color: #EEDFCC;
`;
const Register=styled.button`
    background-color:transparent;
    font-size:20px;
    font-style:italic;
    font-weight:bold;
    font-family:sans-serif;
    border:none;
`;

const Close=styled.button`
    background-color:transparent;
    border:none;
`;

export default function Diary() {
    const [diaries, setDiaries] = useState([])
    const [current, setCurrent] = useState({value: ""})
    const [showInput, setShowInput] = useState(true)
    const [list,setList]=useState([])
    const [currentPage,setCurrentPage]=useState(0)//현재 일기 페이지
    const [page,setPage]=useState(0)//총 페이지 수
    const [title,setTitle]=useState({value:""})
    const [clickRegister,setClickRegister]=useState(false)

    function handleChange(e) {
        setCurrent({
            value: e.target.value
        })
    }

    function handleTitleChange(e){
        setTitle({
            value: e.target.value
        })
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            setDiaries(prev => [...prev, current])
            setCurrent({value:""})
        }
    }
    function handleRegister(){
        if(diaries.length!==0&&title.length!==0){
            setDiaries(prev=>[title,...prev])
            setClickRegister(true)  
        }
    }

    useEffect(()=>{
        //diaries에 title이 추가됨(diaries 변화)+register 누름
        if(diaries.length!==0&&clickRegister===true){
            setList(prev=>[...prev,diaries])
            setTitle({value:""})
            setDiaries([])
            setPage(prev=>prev+1)
            setClickRegister(false)
        }
    },[diaries,clickRegister])

    function deleteInput(){
        setCurrent({value:""})
    }
    
    function handleInputClose() {
        setShowInput(prev => !prev)
    }

    return (
        <>
        <Board>
            <Contents>
            {list.map((elem,index) => {
                return <FirstLine onClick={()=>setCurrentPage(index)}>{elem[0].value} </FirstLine>//일기 추가
            })}
            </Contents>
        {/* 오른쪽 */}
            <Right>
                <Page>
            {page===0?"Empty!":<div>
                <div style={{"font-weight":"bold","font-size":"18px"}}>{list[currentPage][0].value}<br/><br/></div>
                {list[currentPage].map((elem,index)=>{
                    return <div>{index>0&&elem.value}</div>})}
                </div>}
                </Page>
                <Note>
                Title:<Title onChange={handleTitleChange} value={title.value}></Title><br/>
                {diaries.map(elem => {
                    return <div>{elem.value} </div>
                })}
                <div style={{display:"flex"}}>
                    {showInput && <div><input 
                value = {current.value}
                onChange = {handleChange}
                onKeyDown = {handleKeyDown} 
                >
                </input>
                <Delete onClick={deleteInput}>X</Delete>
                </div>
                }
                <Close onClick = {handleInputClose}>{showInput ? "닫기!" : "열기!"}</Close>
               </div>
                <Register onClick={handleRegister}>Register</Register>
                </Note>
        </Right>
    </Board>
    </>
    )
}