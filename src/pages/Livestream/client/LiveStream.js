import React, { useRef, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import icon from "../../../assets/icons8-happy.gif";
import SaleProduct from "./SaleProduct";

const Container = styled.div`
  width: 1820px;
  margin: 0 auto;
`;
const VideoContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const VideoBx = styled.div`
  position: relative;
  width: 1320px;
  height: 820px;
  overflow: hidden;
  padding: 20px;
  border: 2.5px solid black;
  border-right: none;
  border-radius: 30px 0 0 30px;
`;
const Video = styled.video`
  width: 1280px;
  height: 720px;
  background-color: black;
`;
const BtnBx = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.button`
  width: 150px;
  font-size: 1rem;
  border-radius: 30px;
  border: 2px solid black;
  cursor: pointer;
  height: 40px;
`;
const LiveBtn = styled(Btn)`
  background-color: black;
  color: white;
  margin-right: 10px;
`;
const StopBtn = styled(Btn)`
  background-color: rgb(240, 47, 47);
  color: white;
  border: 2px solid rgb(240, 47, 47);
`;
const ChatBx = styled.div`
  position: relative;
  width: 500px;
  height: 820px;
  max-height: 820px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2.5px solid black;
  border-left: none;
`;
const ChatContent = styled.div`
  width: 100%;
  height: 715px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  border: 2.5px solid black;
  border-radius: 30px 30px 0 0;
  padding: 10px;
`;
const InputBx = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: black;
  border-radius: 0 0 30px 30px;
  padding: 5px 5px 5px 25px;
`;
const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  outline: none;
  background-color: white;
  border-radius: 8px;
  font-size: 1.5rem;
`;
const EnterBtn = styled.button`
  width: 60px;
  height: 100%;
  color: white;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
`;
const Message = styled.p`
  flex-grow: 1;
  font-size: 1.5rem;
  letter-spacing: 5px;
  margin-bottom: 10px;
  word-break: break-all;
`;
const UserName = styled.p`
  font-size: 1.5rem;
  letter-spacing: 5px;
  white-space: nowrap;
`;
const MessageBx = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;
const EmojiIcon = styled.img`
  position: absolute;
  width: 35px;
  height: 35px;
  object-fit: cover;
  bottom: 32px;
  right: 90px;
  cursor: pointer;
`;
const EmojiBx = styled.div`
  position: absolute;
  bottom: 100px;
  right: 90px;
`;

const SaleProductBx = styled.div`
  width: 100%;
`;

const LiveStream = () => {
  const remoteVideo = useRef();
  const peerConnect = useRef();
  const [test, setTest] = useState(0);
  const room = "room1";
  let socket;

  const chatBottom = useRef();

  const [chatContent, setChatContent] = useState([]);
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);
    setChosenEmoji(false);
  };

  const connectIO = () => {
    //   offer socket
    // socket = io("https://kelvin-wu.site");
    socket.on("offer", async (desc) => {
      console.log("view receive desc", desc);
      await peerConnect.current.setRemoteDescription(desc);
    });

    // ICE socket
    socket.on("candidate", async (data) => {
      console.log("收到candidate", data);
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: data.label,
        candidate: data.candidate,
      });
      await peerConnect.current.addIceCandidate(candidate);
    });
    socket.emit("join", room);
  };

  const initPeerConnection = () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    peerConnect.current = new RTCPeerConnection(configuration);
    peerConnect.current.addTransceiver("video", { direction: "recvonly" });
    peerConnect.current.addTransceiver("audio", { direction: "recvonly" });

    // 找尋到 ICE 候選位置後，送去 Server 與另一位配對
    peerConnect.current.onicecandidate = (e) => {
      console.log(e);
      // emit ICE
      if (e.candidate) {
        socket.emit("candidate", {
          label: e.candidate.sdpMLineIndex,
          id: e.candidate.sdpMid,
          candidate: e.candidate.candidate,
        });
      }
    };
    createAnswer();
    // 監聽視訊流
    peerConnect.current.onaddstream = ({ stream }) => {
      console.log("收到stream", stream);
      // 接收流並顯示遠端視訊
      remoteVideo.current.srcObject = stream;
      console.log(remoteVideo.current.srcObject);
    };
  };

  const createAnswer = async () => {
    if (!peerConnect.current) {
      initPeerConnection();
    }
    const localSDP = peerConnect.current.createAnswer();
    await peerConnect.current.setLocalDescription(localSDP);
    socket.emit("offer", peerConnect.current.localDescription);
  };
  const init = async () => {
    initPeerConnection();
    connectIO();
  };

  const transferChatHandler = () => {
    // console.log(chatBottom.current.scrollTop);
    // console.log(chatBottom.current.scrollHeight);
    chatBottom.current.scrollTop = chatBottom.current.scrollHeight;
    // chatBottom.current?.scrollIntoView(false);
    // chatBottom.current.scrollBottom = 0;
    const obj = { name: "Penny", content: input };
    if (input.trim().length > 0) {
      setChatContent((pre) => {
        const newContent = [...pre, obj];
        return newContent;
      });
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const showEmoji = () => {
    setChosenEmoji((pre) => !pre);
  };

  const closeLiveHandler = () => {
    if (peerConnect.current) {
      peerConnect.current.close();
      peerConnect.current = null;
    }
  };
  // const testAAAAA = async () => {
  //   const constraints = {
  //     audio: true,
  //     video: { width: 460, height: 600 },
  //   };

  //   const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //   console.log(stream);

  //   remoteVideo.current.srcObject = stream;
  // };
  return (
    <Container>
      <VideoContainer>
        <VideoBx>
          <Video ref={remoteVideo} autoPlay controls playsInline></Video>
          <BtnBx>
            <LiveBtn onClick={init}>觀看</LiveBtn>
            <StopBtn onClick={closeLiveHandler}>暫停</StopBtn>
          </BtnBx>
        </VideoBx>
        <ChatBx>
          <ChatContent ref={chatBottom}>
            {chatContent.map((content) => {
              return (
                <MessageBx>
                  <UserName>{content.name} :</UserName>
                  <Message>{content.content}</Message>
                </MessageBx>
              );
            })}
          </ChatContent>
          <InputBx>
            <Input type="text" value={input} onChange={inputHandler} />
            <EnterBtn onClick={transferChatHandler}>傳送</EnterBtn>
          </InputBx>
          <EmojiIcon src={icon} onClick={showEmoji}></EmojiIcon>
          {chosenEmoji && (
            <EmojiBx>
              <Picker onEmojiClick={onEmojiClick} />
            </EmojiBx>
          )}
        </ChatBx>
      </VideoContainer>
      <SaleProductBx>
        <SaleProduct></SaleProduct>
      </SaleProductBx>
    </Container>
  );
};

export default LiveStream;
