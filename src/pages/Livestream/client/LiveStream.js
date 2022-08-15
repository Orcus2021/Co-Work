import React, { useRef, useState, useContext, useEffect } from "react";
import Video from "../../../components/Video/Video";
import { io } from "socket.io-client";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { UserContext } from "../../../contexts/UserContext";

import icon from "../../../assets/icons8-happy.gif";
import SaleProduct from "./SaleProduct";
import onAir from "../../../assets/onair.png";

const Container = styled.div`
  margin: 0 auto;
  padding: 50px 0 50px;
  max-width: 1160px;

  @media screen and (max-width: 1279px) {
    padding: 20px 24px 236px;
  }
`;
const CardStyle = styled.div`
  width: 140px;
  height: 40px;
  border-radius: 20px 20px 0 0;
  margin-left: 50px;
  text-align: center;
  font-size: 20px;
  border: #e08386;
  padding-top: 10px;
  color: white;
  background-color: #e08386;
`;
const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const VideoBx = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: 750px;
  overflow: scroll;
  padding: 20px;
  border: 2.5px solid #e08386;
  border-right: none;
  border-radius: 30px 0 0 30px;
`;

// const Video = styled.video`
//   width: 1280px;
//   height: 720px;
//   background-color: black;
// `;

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
  border: 2px solid #e08386;
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
  background-color: white;
  position: relative;
  width: 400px;
  height: 750px;
  max-height: 750px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2.5px solid #e08386;
  border-left: none;
  border-radius: 0px 30px 30px 0px;
`;
const ChatContent = styled.div`
  background-color: white;
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: overlay;
  border: 2.5px solid #e08386;
  border-radius: 30px 30px 0 0;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: rgba(153, 38, 42, 0.7);
  }
`;
const InputBx = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #e08386;
  border-radius: 0 0 30px 30px;
  padding: 5px 5px 5px 25px;
`;
const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  outline: none;
  background-color: white;
  border-radius: 8px;
  border: #e08386;
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
  line-height: 34px;
  font-size: 1.5rem;

  word-break: break-all;
`;
const UserName = styled.p`
  line-height: 34px;
  font-size: 1.5rem;
  white-space: nowrap;
  align-self: flex-start;
`;
const MessageBx = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
  padding: 5px;
  background-color: ${(props) => (props.$isSelf ? "#f6dbdb" : "transparent")};
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
  margin-top: 40px;
  width: 100%;
`;

const LiveStream = () => {
  const remoteVideo = useRef();
  const peerConnect = useRef();
  const userCtx = useContext(UserContext);
  const [chatroomHeight, setChatroomHeight] = useState(0);

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
    socket = io("https://kelvin-wu.site");
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
    const obj = { name: userCtx.user.name, content: input, isSelf: true };
    if (input.trim().length > 0) {
      setChatContent((pre) => {
        const newContent = [...pre, obj];
        return newContent;
      });
    }
  };
  useEffect(() => {
    chatBottom.current.scrollTop = chatBottom.current.scrollHeight;
  }, [chatBottom, chatContent]);
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const showEmoji = () => {
    if (!userCtx.user) return;
    setChosenEmoji((pre) => !pre);
  };

  const closeLiveHandler = () => {
    if (peerConnect.current) {
      peerConnect.current.close();
      peerConnect.current = null;
    }
  };
  const chatPlaceholder = userCtx.user ? "與主播聊聊" : "請先登入會員";

  return (
    <Container>
      <CardStyle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-mic-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
        {"    "}
        直播中
      </CardStyle>
      <VideoContainer>
        <VideoBx>
          {/* <Video ref={remoteVideo} autoPlay controls playsInline></Video>
          <BtnBx>
            <LiveBtn onClick={init}>觀看</LiveBtn>
            <StopBtn onClick={closeLiveHandler}>暫停</StopBtn>
          </BtnBx> */}
          <Video onStart={init} videoRef={remoteVideo}></Video>
          <SaleProductBx>
            <SaleProduct></SaleProduct>
          </SaleProductBx>
        </VideoBx>
        <ChatBx>
          <ChatContent ref={chatBottom}>
            {chatContent.map((content) => {
              return (
                <MessageBx $isSelf={content.isSelf}>
                  <UserName>{content.name} :</UserName>
                  <Message>{content.content}</Message>
                </MessageBx>
              );
            })}
          </ChatContent>
          <InputBx>
            <Input
              type="text"
              value={input}
              onChange={inputHandler}
              placeholder={chatPlaceholder}
              disabled={!userCtx.user}
            />
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
    </Container>
  );
};

export default LiveStream;
