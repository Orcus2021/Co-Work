import React, { useRef, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VideoBx = styled.div`
  position: relative;
  width: 500px;
  height: 700px;
  overflow: hidden;
  padding: 20px;
  border: 2.5px solid black;
  border-right: none;
  border-radius: 30px 0 0 30px;
`;
const ChatBx = styled.div`
  position: relative;
  width: 500px;
  height: 700px;
  border: 2px solid red;
`;
const ProductBx = styled.div`
  position: relative;
  width: 500px;
  height: 700px;
  border: 2px solid red;
`;
const Video = styled.video`
  width: 460px;
  height: 600px;
  border-radius: 30px;
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

const LiveStream = () => {
  const remoteVideo = useRef();
  const peerConnect = useRef();
  const [test, setTest] = useState(0);
  const room = "room1";
  const socket = io("https://kelvin-wu.site");

  const connectIO = () => {
    //   offer socket
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
  const testAAAAA = async () => {
    const constraints = {
      audio: true,
      video: { width: 460, height: 600 },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);

    remoteVideo.current.srcObject = stream;
  };
  return (
    <Container>
      <VideoBx>
        <Video controls autoPlay playsInline ref={remoteVideo}></Video>
        <BtnBx>
          <LiveBtn onClick={init}>觀看</LiveBtn>
          <StopBtn onClick={testAAAAA}>結束</StopBtn>
        </BtnBx>
      </VideoBx>
      <ChatBx></ChatBx>
      <ProductBx></ProductBx>
    </Container>
  );
};

export default LiveStream;
