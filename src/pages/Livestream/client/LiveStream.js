import React, { useRef, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Video from "../../../components/Video/Video";
import { io } from "socket.io-client";
// import flvjs from "flv.js";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { UserContext } from "../../../contexts/UserContext";
import LoveAnimation from "../../../components/Love/Love";
import Loading from "../../../components/Love/Loading";

import icon from "../../../assets/icons8-happy.gif";
import SaleProduct from "./SaleProduct";
import loveIcon from "../../../assets/love.png";
import videoBack from "../../../assets/videoBackground.jpg";
import logoIcon from "../../../assets/logoIcon.png";
import api from "../../../utils/api";

// const dummy = {
//   id: 201807242222,
//   category: "men",
//   title: "經典商務西裝",
//   description: "厚薄：薄\r\n彈性：無",
//   price: 3999,
//   texture: "棉 100%",
//   wash: "手洗，溫水",
//   place: "中國",
//   note: "實品顏色依單品照為主",
//   story:
//     "O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.",
//   main_image: "https://api.appworks-school.tw/assets/201807242222/main.jpg",
//   images: [
//     "https://api.appworks-school.tw/assets/201807242222/0.jpg",
//     "https://api.appworks-school.tw/assets/201807242222/1.jpg",
//     "https://api.appworks-school.tw/assets/201807242222/0.jpg",
//     "https://api.appworks-school.tw/assets/201807242222/1.jpg",
//   ],
//   variants: [
//     {
//       color_code: "334455",
//       size: "S",
//       stock: 9,
//     },
//     {
//       color_code: "334455",
//       size: "M",
//       stock: 5,
//     },
//     {
//       color_code: "334455",
//       size: "L",
//       stock: 1,
//     },
//     {
//       color_code: "334455",
//       size: "XL",
//       stock: 9,
//     },
//   ],
//   colors: [
//     {
//       code: "334455",
//       name: "深藍",
//     },
//   ],
//   sizes: ["S", "M", "L", "XL"],
// };

const Container = styled.div`
  ${(props) => {
    if (props.$isMode === "show") {
      return "position:relative;margin: 0 auto;padding: 50px 0 50px;";
    } else if (props.$isMode === "hide") {
      return "position:absolute; top:-200%;";
    } else if (props.$isMode === "pop") {
      return "position:fixed; right:0;bottom:0; z-index:9999;overflow:hidden;background-color: transparent;pointer-events: none;";
    }
  }}

  max-width: 1160px;

  @media screen and (max-width: 1279px) {
    padding: ${(props) =>
      props.$isMode === "pop" ? "0px 0 70px 0;" : " 20px 24px 236px;"};
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
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;
const VideoBx = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  pointer-events:auto;
  width:${(props) => (props.$isMode === "pop" ? "500px;" : "800px;")}
  height:${(props) => (props.$isMode === "pop" ? "300px;" : "750px;")} 
  padding:${(props) => (props.$isMode === "pop" ? "0px;" : "20px;")} 
  border:${(props) =>
    props.$isMode === "pop" ? "none;" : " 2.5px solid #e08386;"} 
  border-right: none;
  border-radius: 30px 0 0 30px;
  @media screen and (max-width: 1279px) {
    width:${(props) => (props.$isMode === "pop" ? "500px;" : "90%;")} 
    border: 0;
  }
`;

const ChatBx = styled.div`
  background-color: white;
  position: relative;
  width: 400px;
  height: 750px;
  max-height: 750px;
  padding: 20px;
  display: ${(props) => (props.$isMode === "pop" ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  border: 2.5px solid #e08386;
  border-left: none;
  border-radius: 0px 30px 30px 0px;
  @media screen and (max-width: 1279px) {
    border: 0;
    width: 90%;
  }
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
  background-color: #f6dbdb;
  ${(props) => (props.$isMode === "pop" ? "display:none;" : "")};
`;
const StreamProductEmpty = styled.div`
  border: 1px dashed #99262a;
  height: 200px;
  font-size: 20px;
  text-align: center;
  padding: 90px;
  background-color: #f6dbdb;
`;
const LoveBx = styled.div`
  position: absolute;
  width: 35px;
  bottom: 90px;
  right: 30px;
`;
const LoveIcon = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  cursor: pointer;
`;
const LoveTotal = styled.p`
  font-size: 1rem;
  text-align: center;
`;
const ImgBx = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #f8f0f0;
  margin-right: 10px;
`;
const Img = styled.img`
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const LiveStream = () => {
  const remoteVideo = useRef();
  const peerConnect = useRef();
  const streamer = useRef();
  const socketRef = useRef(null);
  const chatBottom = useRef();
  const initSocket = useRef(false);
  const userCtx = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [chatContent, setChatContent] = useState([]);
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [loveAmount, setLoveAmount] = useState(0);
  const [saleProduct, setSaleProduct] = useState(null);
  const [showLove, setShowLove] = useState(false);
  const [viewStatue, setViewStatue] = useState("hide");
  const [isLoading, setIsLoading] = useState(true);
  const [videoBackground, setVideoBackground] = useState(videoBack);
  console.log(videoBackground);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (location.pathname.includes("liveStream")) {
      setViewStatue("show");
      remoteVideo.current.volume = 0.5;
    } else if (viewStatue === "pop") {
      return;
    } else {
      setViewStatue("hide");
      remoteVideo.current.volume = 0;
      closeLiveHandler();
      initSocket.current = false;
      setChatContent([]);
      remoteVideo.current.pause();
    }
  }, [location, viewStatue, remoteVideo, initSocket, isLoading]);

  useEffect(() => {
    const live = async () => {
      const response = await api.getLiveStream();
      console.log(response);
      if (response.response?.id) {
        setVideoBackground(response.response.image);
        if (response.response.is_live === 1) setIsLoading(false);
      }
    };
    live();
  }, []);

  useEffect(() => {
    socketRef.current = io("https://kelvin-wu.site/chatroom", {
      autoConnect: false,
    });
  }, [socketRef]);

  useEffect(() => {
    if (isLoading) return;
    chatBottom.current.scrollTop = chatBottom.current.scrollHeight;
  }, [chatBottom, chatContent, isLoading]);

  useEffect(() => {
    if (userCtx.user && socketRef) {
      // love socket
      socketRef.current.on("love", (data) => {
        setLoveAmount(data);
      });
      // message socket
      socketRef.current.on("message", (data) => {
        setChatContent((pre) => {
          const newContent = [...pre, data];
          return newContent;
        });
      });

      // product
      socketRef.current.on("product", (data) => {
        setSaleProduct(data);
      });

      // join chatroom
    }
  }, [userCtx.user, socketRef]);

  useEffect(() => {
    setShowLove(true);

    setTimeout(() => {
      setShowLove(false);
    }, 1500);
  }, [loveAmount]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);

    setChosenEmoji(false);
  };

  const connectIO = () => {
    console.log("init");
    socketRef.current.connect();

    //   answer socket
    socketRef.current.on("answer", async (id, desc) => {
      // console.log("view receive desc", desc);
      if (streamer.current === id) {
        await peerConnect.current.setRemoteDescription(desc);
      }
    });

    // ICE socket
    socketRef.current.on("candidate", async (data) => {
      // console.log("收到candidate", data);
      if (data.id === streamer.current) {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: data.label,
          candidate: data.candidate,
        });
        await peerConnect.current.addIceCandidate(candidate);
      }
    });

    // join socket
    if (userCtx.user) {
      socketRef.current.emit("join", userCtx.user?.name, (streamerID) => {
        streamer.current = streamerID.streamerID;
      });
    } else {
      socketRef.current.emit("join", "notLogIn", (streamerID) => {
        streamer.current = streamerID.streamerID;
      });
    }
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
      // console.log(e);
      // emit ICE
      if (e.candidate) {
        socketRef.current.emit("candidate", {
          label: e.candidate.sdpMLineIndex,
          id: socketRef.current.id,
          candidate: e.candidate.candidate,
        });
      }
    };
    createAnswer();
    // 監聽視訊流
    peerConnect.current.onaddstream = ({ stream }) => {
      // console.log("收到stream", stream);
      // 接收流並顯示遠端視訊
      remoteVideo.current.srcObject = stream;
    };
  };

  const createAnswer = async () => {
    if (!peerConnect.current) {
      initPeerConnection();
    }
    const localSDP = peerConnect.current.createAnswer();
    await peerConnect.current.setLocalDescription(localSDP);
    socketRef.current.emit(
      "offer",
      socketRef.current.id,
      peerConnect.current.localDescription
    );
  };
  const init = () => {
    if (!initSocket.current) {
      initPeerConnection();
      connectIO();
      initSocket.current = true;
    }
  };

  const sendLoveHandler = () => {
    // setLoveAmount((pre) => pre + 1);
    if (userCtx.user) {
      socketRef.current.emit("love", (love) => {
        setLoveAmount(love.love);
      });
    }
  };

  const transferChatHandler = () => {
    const obj = { img: userCtx.user.picture, content: input, isSelf: true };
    if (input.trim().length > 0) {
      setChatContent((pre) => {
        const newContent = [...pre, obj];
        return newContent;
      });
      const socketObj = { ...obj };
      socketObj.isSelf = false;
      socketRef.current.emit("message", socketObj);
      setInput("");
    }
  };

  const showEmoji = () => {
    if (!userCtx.user) return;
    setChosenEmoji((pre) => !pre);
  };

  const popUp = () => {
    if (viewStatue === "pop") {
      setViewStatue("show");
      navigate("/liveStream");
    } else {
      setViewStatue("pop");
      navigate("/");
    }
  };

  const closeLiveHandler = () => {
    if (peerConnect.current) {
      peerConnect.current.close();
      peerConnect.current = null;
    }
  };

  const chatPlaceholder = userCtx.user ? "與主播聊聊" : "請先登入會員";

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      transferChatHandler();
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={{ zIndex: "10000" }}>
          <Loading word="Coming soon...直播即將開始，請耐心等候" />
        </div>
      ) : (
        <Container $isMode={viewStatue}>
          <CardStyle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-mic-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
            </svg>
            直播中
          </CardStyle>
          <VideoContainer>
            <VideoBx $isMode={viewStatue} VideoBx={viewStatue}>
              <Video
                onStart={init}
                videoRef={remoteVideo}
                // onFlvStart={flvStart}
                poster={videoBackground}
                onPopUp={popUp}
                viewStatue={viewStatue}
              ></Video>
              <SaleProductBx $isMode={viewStatue}>
                {saleProduct && (
                  <SaleProduct product={saleProduct}></SaleProduct>
                )}
                <StreamProductEmpty>預計上架商品</StreamProductEmpty>
              </SaleProductBx>
            </VideoBx>
            <ChatBx $isMode={viewStatue}>
              <ChatContent ref={chatBottom}>
                {chatContent.map((content, index) => {
                  return (
                    <MessageBx $isSelf={content.isSelf} key={index}>
                      <UserName>
                        <ImgBx>
                          <Img src={content.img ? content.img : logoIcon}></Img>
                        </ImgBx>
                      </UserName>
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
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <EnterBtn onClick={transferChatHandler}>傳送</EnterBtn>
              </InputBx>
              <EmojiIcon src={icon} onClick={showEmoji}></EmojiIcon>
              <LoveBx>
                <LoveIcon src={loveIcon} onClick={sendLoveHandler}></LoveIcon>
                <LoveTotal>{loveAmount}</LoveTotal>
                {showLove && <LoveAnimation></LoveAnimation>}
              </LoveBx>

              {chosenEmoji && (
                <EmojiBx>
                  <Picker onEmojiClick={onEmojiClick} preload={true} />
                </EmojiBx>
              )}
            </ChatBx>
          </VideoContainer>
        </Container>
      )}
    </>
  );
};

export default LiveStream;
