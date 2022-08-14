import React, { useRef, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import StreamerProduct from "./StreamerProduct";
import CreateList from "./CreateList";
import icon from "../../assets/icons8-happy.gif";

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
const CameraBtn = styled(Btn)`
  background-color: white;
  color: black;
  margin-right: 10px;
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
  flex-grow: 1;
  border: 2.5px solid black;
  border-radius: 30px 30px 0 0;
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

const Streamer = () => {
  const localStream = useRef();
  const localVideo = useRef();
  const peerConnect = useRef();
  const chatBottom = useRef();
  const [isStart, setIsStart] = useState(false);
  const [chatContent, setChatContent] = useState([]);
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  // -------------------第二方案--------------------
  // const [connected, setConnected] = useState(false);
  // const [cameraEnabled, setCameraEnabled] = useState(false);
  // const [streaming, setStreaming] = useState(false);
  // const [streamKey, setStreamKey] = useState("test");
  // const [streamUrl, setStreamUrl] = useState("");
  // const [textOverlay, setTextOverlay] = useState("");

  // const inputStreamRef = useRef();
  // const videoRef = useRef();
  // const canvasRef = useRef();
  // const wsRef = useRef();
  // const mediaRecorderRef = useRef();
  // const requestAnimationRef = useRef();
  // const nameRef = useRef();

  const room = "room1";
  let socket;

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
    console.log(stream);
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
      // socket發送 ICE
      if (e.candidate) {
        socket.emit("candidate", {
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
    socket.emit("offer", peerConnect.current.localDescription);
  };
  // connect io
  const connectIO = () => {
    //   offer socket
    // socket = io("https://kelvin-wu.site");

    socket.on("offer", async (desc) => {
      console.log("main receive desc", desc);
      await peerConnect.current.setRemoteDescription(desc);
      await createOffer();
    });
    //   candidate socket
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
  // init live stream
  const initLiveStream = () => {
    if (localStream.current) {
      connectIO();
      initPeerConnection();
      setIsStart(true);
    }
  };

  const closeLiveHandler = () => {
    if (peerConnect.current) {
      setIsStart(false);
      peerConnect.current.close();
      peerConnect.current = null;
    }
    localStream.current.getTracks().forEach((track) => track.stop());
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const transferChatHandler = () => {
    chatBottom.current.scrollTop = chatBottom.current.scrollHeight;

    const obj = { name: "Penny", content: input };
    if (input.trim().length > 0) {
      setChatContent((pre) => {
        const newContent = [...pre, obj];
        return newContent;
      });
    }
  };
  const showEmoji = () => {
    setChosenEmoji((pre) => !pre);
  };

  // --------------第二方案-------------

  // const CAMERA_CONSTRAINTS = {
  //   audio: true,
  //   video: true,
  // };

  // const getRecorderSettings = () => {
  //   const settings = {};
  //   if (MediaRecorder.isTypeSupported("video/mp4")) {
  //     settings.format = "mp4";
  //     settings.video = "h264";
  //     settings.audio = "aac";
  //   } else {
  //     settings.format = "webm";
  //     settings.audio = "opus";
  //     settings.video = MediaRecorder.isTypeSupported("video/webm;codecs=h264")
  //       ? "h264"
  //       : "vp8";
  //   }
  //   return settings;
  // };

  // const getRecorderMimeType = () => {
  //   const settings = getRecorderSettings();
  //   const codecs =
  //     settings.format === "webm"
  //       ? `;codecs="${settings.video}, ${settings.audio}"`
  //       : "";
  //   return `video/${settings.format}${codecs}`;
  // };

  // const enableCamera = async () => {
  //   inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
  //     CAMERA_CONSTRAINTS
  //   );

  //   videoRef.current.srcObject = inputStreamRef.current;

  //   await videoRef.current.play();

  //   canvasRef.current.height = videoRef.current.clientHeight;
  //   canvasRef.current.width = videoRef.current.clientWidth;

  //   requestAnimationRef.current = requestAnimationFrame(updateCanvas);

  //   setCameraEnabled(true);
  // };

  // const updateCanvas = () => {
  //   if (videoRef.current.ended || videoRef.current.paused) {
  //     return;
  //   }

  //   const ctx = canvasRef.current.getContext("2d");

  //   ctx.drawImage(
  //     videoRef.current,
  //     0,
  //     0,
  //     videoRef.current.clientWidth,
  //     videoRef.current.clientHeight
  //   );

  //   ctx.fillStyle = "#FB3C4E";
  //   ctx.font = "50px Akkurat";
  //   const date = new Date();
  //   const dateText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date
  //     .getMilliseconds()
  //     .toString()
  //     .padStart(3, "0")}`;
  //   ctx.fillText(
  //     `${nameRef.current}${dateText}`,
  //     10,
  //     50,
  //     canvasRef.current.width - 20
  //   );

  //   requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  // };

  // const stopStreaming = () => {
  //   if (mediaRecorderRef.current.state === "recording") {
  //     mediaRecorderRef.current.stop();
  //   }

  //   setStreaming(false);
  // };

  // const startStreaming = () => {
  //   setStreaming(true);
  //   const settings = getRecorderSettings();
  //   // const protocol = window.location.protocol.replace("http", "wss");
  //   // const wsUrl = new URL("wss://kelvin-wu.site/rtmp");
  //   // wsUrl.searchParams.set("video", settings.video);
  //   // wsUrl.searchParams.set("audio", settings.audio);
  //   // if (streamUrl) {
  //   //   wsUrl.searchParams.set("url", streamUrl);
  //   // }
  //   // if (streamKey) {
  //   //   wsUrl.searchParams.set("key", streamKey);
  //   // }

  //   wsRef.current = new WebSocket(
  //     "wss://kelvin-wu.site/rtmp?video=h264&audio=opus&url=rtmp%3A%2F%2F18.142.201.212%3A1935%2Flive&key=test"
  //   );

  //   console.log(wsRef.current.readyState);
  //   wsRef.current.addEventListener("open", function open() {
  //     console.log("open");
  //     setConnected(true);
  //   });

  //   wsRef.current.addEventListener("close", () => {
  //     console.log("close");
  //     setConnected(false);
  //     stopStreaming();
  //   });

  //   const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

  //   // Let's do some extra work to get audio to join the party.
  //   // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
  //   const audioStream = new MediaStream();
  //   const audioTracks = inputStreamRef.current.getAudioTracks();
  //   audioTracks.forEach(function (track) {
  //     audioStream.addTrack(track);
  //   });

  //   const outputStream = new MediaStream();
  //   [audioStream, videoOutputStream].forEach(function (s) {
  //     s.getTracks().forEach(function (t) {
  //       outputStream.addTrack(t);
  //     });
  //   });

  //   mediaRecorderRef.current = new MediaRecorder(outputStream, {
  //     mimeType: getRecorderMimeType(),
  //     videoBitsPerSecond: 3000000,
  //     audioBitsPerSecond: 64000,
  //   });

  //   mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
  //     wsRef.current.send(e.data);
  //   });

  //   mediaRecorderRef.current.addEventListener("stop", () => {
  //     stopStreaming();
  //     wsRef.current.close();
  //   });

  //   mediaRecorderRef.current.start(1000);
  // };

  // useEffect(() => {
  //   nameRef.current = textOverlay;
  // }, [textOverlay]);

  // useEffect(() => {
  //   return () => {
  //     cancelAnimationFrame(requestAnimationRef.current);
  //   };
  // }, []);

  return (
    <Container>
      <VideoContainer>
        <VideoBx>
          <Video muted autoPlay playsInline ref={localVideo}></Video>
          <BtnBx>
            <CameraBtn onClick={createStream}>開啟鏡頭</CameraBtn>
            {isStart ? (
              <StopBtn onClick={closeLiveHandler}>結束</StopBtn>
            ) : (
              <LiveBtn onClick={initLiveStream}>直播</LiveBtn>
            )}
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
      <StreamerProduct></StreamerProduct>
      <CreateList></CreateList>
    </Container>
  );
};

export default Streamer;
