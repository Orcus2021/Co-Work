import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import StreamerProduct from "./StreamerProduct";
import CreateList from "./CreateList";
import LoveAnimation from "../../components/Love/Love";
import { UserContext } from "../../contexts/UserContext";
import icon from "../../assets/icons8-happy.gif";
import videoBackground from "../../assets/videoBackground.jpg";
import loveIcon from "../../assets/love.png";
import logoIcon from "../../assets/logoIcon.png";
import remindIcon from "../../assets/come.gif";
import remindSound from "../../assets/babyshark.mp3";

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
  margin-left: 900px;
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
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;
const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const VideoBx = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: 550px;
  overflow: hidden;
  padding: 20px;
  border: 2.5px solid #e08386;
  border-right: none;
  border-radius: 30px 0 0 30px;
  @media screen and (max-width: 1279px) {
    width: 90%;
    border: 0;
    height: auto;
  }
`;
const BtnBx = styled.div`
  margin-top: 20px;
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
const CameraBtn = styled(Btn)`
  background-color: white;
  color: black;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &:hover {
    background-color: #e08386;
    color: #99262a;
    border: none;
    transition: 1s;
  }
`;
const LiveBtn = styled(Btn)`
  background-color: black;
  border: none;
  color: white;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &:hover {
    background-color: #e08386;
    color: #99262a;
    transition: 1s;
  }
`;
const StopBtn = styled(Btn)`
  background-color: rgb(240, 47, 47);
  color: white;
  border: 2px solid rgb(240, 47, 47);
`;
const ChatBx = styled.div`
  position: relative;
  width: 500px;
  height: 550px;
  max-height: 820px;
  padding: 20px;
  display: flex;
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
  width: 100%;
  height: 715px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
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
  flex-grow: 1;
  border: 2.5px solid #e08386;
  border-radius: 30px 30px 0 0;
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
  font-size: 1.5rem;
  border: #e08386;
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

  word-break: break-all;
`;
const UserName = styled.div`
  font-size: 1.5rem;
  letter-spacing: 5px;
  white-space: nowrap;
`;
const MessageBx = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  flex-direction: row;
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
const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Video = styled.video`
  width: 100%;
  max-width: 1280px;
  max-height: 720px;
  object-fit: contain;
  background-image: url("../../assets/videoBackground.jpg");
  background-repeat: ;
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

const PanelBtn = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-radius: 30px;
  background-color: #99262a;
  color: white;
  border: #99262a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &:hover {
    color: white;
    background-color: #e08386;
    transition: 1s;
  }
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
const RemindIcon = styled.img`
  position: absolute;
  width: 90px;
  height: 90px;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  object-fit: cover;
`;
const RemindText = styled.span`
  position: absolute;
  color: black;
  font-size: 1.5rem;
  top: 140px;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
`;

const Streamer = () => {
  const localStream = useRef();
  const localVideo = useRef();
  const peerConnect = useRef();
  const chatBottom = useRef();
  const audioRef = useRef();
  const viewers = useRef({});
  const socketRef = useRef(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [chatContent, setChatContent] = useState([]);
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [loveAmount, setLoveAmount] = useState(0);
  const [ButtonPop, setButtonPop] = useState(false);
  const [showLove, setShowLove] = useState(false);
  const [remindMsg, setRemindMsg] = useState("");

  useEffect(() => {
    if (userCtx.user?.role === "admin") {
      return;
    } else {
      navigate("/");
    }
  }, [userCtx]);

  useEffect(() => {
    socketRef.current = io("https://kelvin-wu.site/chatroom", {
      autoConnect: false,
    });
  }, [socketRef]);

  useEffect(() => {
    setShowLove(true);

    setTimeout(() => {
      setShowLove(false);
    }, 1500);
  }, [loveAmount]);

  useEffect(() => {
    chatBottom.current.scrollTop = chatBottom.current.scrollHeight;
  }, [chatBottom, chatContent]);

  const onEmojiClick = (event, emojiObject) => {
    setInput((pre) => pre + emojiObject.emoji);
    setChosenEmoji(false);
  };

  const createStream = async () => {
    const constraints = {
      audio: true,
      video: { width: 1280, height: 720 },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    localStream.current = stream;
    localVideo.current.srcObject = stream;
  };

  const initPeerConnection = () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnect.current = new RTCPeerConnection(configuration);
    localStream.current.getTracks().forEach((track) => {
      {
        peerConnect.current.addTrack(track, localStream.current);
      }
    });
    //create offer send offer

    peerConnect.current.onicecandidate = (e) => {
      // socket?????? ICE
      if (e.candidate) {
        socketRef.current.emit("candidate", {
          label: e.candidate.sdpMLineIndex,
          id: e.candidate.sdpMid,
          candidate: e.candidate.candidate,
        });
      }
    };
  };
  const createOffer = async () => {
    if (!peerConnect.current) {
      initPeerConnection();
    }
    const localSDP = peerConnect.current.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnect.current.setLocalDescription(localSDP);
    socketRef.current.emit(
      "answer",
      socketRef.current.id,
      peerConnect.current.localDescription
    );
  };
  // connect io
  const connectIO = () => {
    console.log("init");
    socketRef.current.connect();
    //   offer socket
    socketRef.current.on("offer", async (id, desc) => {
      // console.log("main receive desc", desc);
      initPeerConnection();
      viewers.current[id] = peerConnect.current;
      await peerConnect.current.setRemoteDescription(desc);
      await createOffer();
    });

    //   ICE socket
    socketRef.current.on("candidate", async (data) => {
      // console.log("??????candidate", data);
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: data.label,
        candidate: data.candidate,
      });
      await peerConnect.current.addIceCandidate(candidate);
    });

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
    //??????????????????
    socketRef.current.on("join", (data) => {
      // viewers.current[id] = "id";

      if (data === "notLogIn") return;
      setRemindMsg(data);
      audioRef.current.play();
      setTimeout(() => {
        setRemindMsg("");
      }, 7000);
    });

    //???????????????
    socketRef.current.emit("streamerJoin", userCtx.user.id);
  };

  // init live stream
  const initLiveStream = () => {
    if (localStream.current) {
      connectIO();

      setIsStart(true);
    }
  };

  const closeLiveHandler = () => {
    if (peerConnect.current) {
      peerConnect.current.close();
      peerConnect.current = null;
      localVideo.current.srcObject = null;
    }
    setIsStart(false);
    socketRef.current.disconnect();
    localStream.current.getTracks().forEach((track) => track.stop());
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const transferChatHandler = () => {
    const obj = { img: userCtx.user?.picture, content: input, isSelf: true };
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
    setChosenEmoji((pre) => !pre);
  };

  const addProductHandler = (data) => {
    socketRef.current.emit("product", data);
  };

  const removeSaleProductSocket = () => {
    socketRef.current.emit("product", null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      transferChatHandler();
    }
  };

  return (
    <>
      <CreateList trigger={ButtonPop} setButtonPop={setButtonPop} />
      <Container>
        <PanelBtn onClick={() => setButtonPop(true)}>
          ????????????????????????
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-angle-expand"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
            />
          </svg>
        </PanelBtn>
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
          ?????????
        </CardStyle>
        <VideoContainer>
          <LeftWrap>
            <VideoBx>
              <VideoWrapper>
                <Video
                  poster={videoBackground}
                  muted
                  autoPlay
                  playsInline
                  ref={localVideo}
                ></Video>
              </VideoWrapper>
              <BtnBx>
                <CameraBtn onClick={createStream}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-camera-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                  </svg>
                  ????????????
                </CameraBtn>
                {isStart ? (
                  <StopBtn onClick={closeLiveHandler}>??????</StopBtn>
                ) : (
                  <LiveBtn onClick={initLiveStream}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-camera-reels"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                      <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                      <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                    ????????????
                  </LiveBtn>
                )}
              </BtnBx>
            </VideoBx>
          </LeftWrap>
          <ChatBx>
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
            {remindMsg && (
              <>
                <RemindIcon src={remindIcon}></RemindIcon>
                <RemindText>{remindMsg}???????????????</RemindText>
              </>
            )}
            <audio src={remindSound} ref={audioRef}></audio>
            <InputBx>
              <Input
                type="text"
                value={input}
                onChange={inputHandler}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <EnterBtn onClick={transferChatHandler}>??????</EnterBtn>
            </InputBx>
            <EmojiIcon src={icon} onClick={showEmoji}></EmojiIcon>
            {chosenEmoji && (
              <EmojiBx>
                <Picker onEmojiClick={onEmojiClick} />
              </EmojiBx>
            )}
            <LoveBx>
              <LoveIcon src={loveIcon}></LoveIcon>
              <LoveTotal>{loveAmount}</LoveTotal>
              {showLove && <LoveAnimation></LoveAnimation>}
            </LoveBx>
          </ChatBx>
        </VideoContainer>

        <StreamerProduct
          onAdd={addProductHandler}
          onRemove={removeSaleProductSocket}
        ></StreamerProduct>
      </Container>
    </>
  );
};

export default Streamer;
