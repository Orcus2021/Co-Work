import { useEffect, useState, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.div`
  margin-top: 24px;
`;

const BackButton = styled.button`
  margin-top: 24px;
`;
const Form = styled.div`
  display: flex;
  margin-top: 50px;
`;
const FormLeft = styled.div`
  display: flex;
`;
const FormRight = styled.div`
  display: flex;
  width: 250px;
`;

const UploadCardStyled = styled.label`
  background-color: #fff;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  cursor: pointer;
`;
const UploadCardButton = styled.span`
  background-color: #fff;
  border: solid 2px #e6e6e6;
  padding: 16px 25px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  margin-bottom: 10px;
`;
const UploadCardInput = styled.input.attrs({
  type: "file",
  accept: "image/png, image/jpeg",
})`
  opacity: 0;
  z-index: -1;
  position: absolute;
`;
const UploadPreview = styled.div`
  max-width: 100%;
  max-height: 100%;
  text-align: center;
`;
const UploadPreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ClearBtn = styled.button`
  border: 1px solid white;
  position: absolute;
  border-radius: 30px;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 25px;
  cursor: pointer;
`;

// const DragBox = styled.div`
//   width: 250px;
//   height: 100px;
//   position: relative;
//   text-align: center;
//   font-weight: bold;
//   line-height: 95px;
//   color: black;
//   border: 2px dashed #ccc;
//   display: inline-block;
//   transition: transform 0.3s;
// `;
// const Preview = styled.div`
//   text-align: center;
// `;

const FormFieldSet = styled.fieldset`
  margin-bottom: 50px;
`;
const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 400px;
  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;
  }
`;
const FormLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const FormControl = styled.input`
  width: 250px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const FormText = styled.textarea`
  width: 250px;
  height: 60px;
  border-radius: 8px;
  border: solid 1px #979797;
  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const FormCheck = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  & + & {
    margin-left: 30px;
  }
  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;
    & + & {
      margin-left: 27px;
    }
  }
`;
const FormCheckInput = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
`;
const FormCheckLabel = styled.label`
  margin-left: 10px;
  line-height: 26px;
  @media screen and (max-width: 1279px) {
    font-size: 14px;
  }
`;

const uploadFormGroups = [
  {
    label: "商品類別",
    key: "category",
    options: [
      {
        label: "男裝",
        value: "men",
      },
      {
        label: "女裝",
        value: "women",
      },
      {
        label: "配件",
        value: "accessories",
      },
    ],
  },
  { label: "商品標題", key: "title" },
  { label: "商品描述", key: "description", textarea: true },
  { label: "價格", key: "price" },
  { label: "材質", key: "texture" },
  { label: "清洗", key: "wash" },
  { label: "產地", key: "place" },
  { label: "產品故事", key: "story", textarea: true },
];

const inputCheck = (label, key, textarea, options) => {
  if (options) {
    return options.map((option) => (
      <FormCheck key={option.value}>
        <FormCheckInput type="radio" />
        <FormCheckLabel>{option.label}</FormCheckLabel>
      </FormCheck>
    ));
  } else if (textarea) {
    return <FormText />;
  } else {
    return <FormControl />;
  }
};

function Upload() {
  const navigate = useNavigate();
  // const imgUpload = useRef();
  // const dragNdrop = (event) => {
  //   const filename = URL.createObjectURL(event.target.files[0]);
  //   const imgInsert = <img src={filename} />;
  //   imgUpload.setAttribute("src", filename);
  // };
  const [fileSrc, setFileSrc] = useState(null);
  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    e.target.value = "";
  };
  const handleClear = (e) => {
    e.preventDefault();
    setFileSrc(null);
  };

  return (
    <Wrapper>
      <Title>商家上架系統</Title>
      <Content>請填寫以下資訊</Content>
      <form>
        <Form>
          <FormLeft>
            <FormFieldSet>
              {uploadFormGroups.map(({ label, key, textarea, options }) => (
                <FormGroup key={key}>
                  <FormLabel>{label}</FormLabel>
                  {inputCheck(label, key, textarea, options)}
                </FormGroup>
              ))}
            </FormFieldSet>
          </FormLeft>
          <FormRight>
            <UploadCardStyled>
              {fileSrc ? (
                <>
                  <ClearBtn onClick={handleClear}>刪除</ClearBtn>
                  <UploadPreview>
                    <UploadPreviewImg src={fileSrc} />
                  </UploadPreview>
                </>
              ) : (
                <UploadCardButton>上傳</UploadCardButton>
              )}
              <UploadCardInput onChange={handleUploadFile} />
            </UploadCardStyled>
            {/* <DragBox>Drag and Drop Image here</DragBox>
            <input
              type="file"
              onChange={dragNdrop}
              // ondragover={drag()}
              // ondrop={drop()}
              // id="uploadFile"
            ></input>
            <Preview
              ref={imgUpload}
              // id
            /> */}
          </FormRight>
        </Form>
      </form>
      <BackButton onClick={() => navigate("/")}>返回首頁</BackButton>
    </Wrapper>
  );
}

export default Upload;
