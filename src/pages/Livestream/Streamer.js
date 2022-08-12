import React, { useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import StreamerProduct from "./StreamerProduct";
import CreateList from "./CreateList";
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2.5px solid black;
  border-left: none;
`;
const ChatContent = styled.div`
  width: 100%;
  flex-grow: 1;

  border: 2.5px solid black;
  border-radius: 30px 30px 0 0;
`;
const InputBx = styled.div`
  width: 100%;
  height: 60px;
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

const Streamer = () => {
  const localStream = useRef();
  const localVideo = useRef();
  const peerConnect = useRef();
  const room = "room1";
  const socket = io("https://kelvin-wu.site");

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
    }
  };

  const closeLiveHandler = () => {
    if (peerConnect.current) {
      peerConnect.current.close();
      peerConnect.current = null;
    }
    localStream.current.getTracks().forEach((track) => track.stop());
  };

  return (
    <Container>
      <VideoContainer>
        <VideoBx>
          <Video muted autoPlay playsInline ref={localVideo}></Video>
          <BtnBx>
            <CameraBtn onClick={createStream}>開啟鏡頭</CameraBtn>
            <LiveBtn onClick={initLiveStream}>直播</LiveBtn>
            <StopBtn onClick={closeLiveHandler}>結束</StopBtn>
          </BtnBx>
        </VideoBx>
        <ChatBx>
          <ChatContent>test</ChatContent>
          <InputBx>
            <Input />
            <EnterBtn>傳送</EnterBtn>
          </InputBx>
        </ChatBx>
      </VideoContainer>
      <StreamerProduct></StreamerProduct>
      <CreateList></CreateList>
    </Container>
  );
};

export default Streamer;
