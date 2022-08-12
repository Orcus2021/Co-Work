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
  background-color: #fff;
  border: solid 2px #e6e6e6;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  margin-top: 24px;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
  }
`;
const Form = styled.div`
  display: flex;
  margin-top: 50px;
`;
const FormLeft = styled.div`
  display: flex;
  width: 300px;
  margin-right: 20px;
`;
const FormCenter = styled.div`
  display: flex;
  width: 400px;
  margin-right: 20px;
`;
const FormRight = styled.div`
  display: flex;
  width: 400px;
  display: flex;
  flex-direction: column;
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
  padding: 10px 10px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
  }
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
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  cursor: pointer;
`;

const FormFieldSet = styled.fieldset`
  margin-bottom: 50px;
`;
const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
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
const FormNumber = styled.input`
  width: 80px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
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
const uploadFormInputCheck = (label, key, textarea, options) => {
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

const VariantsCardStyled = styled.label`
  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
`;

const variantsFormGroups = [
  {
    label: "商品顏色",
    key: "color",
  },
  { label: "商品庫存", key: "stock" },
  {
    label: "商品尺寸",
    key: "size",
    options: [
      {
        label: "S",
        value: "S",
      },
      {
        label: "M",
        value: "M",
      },
      {
        label: "L",
        value: "L",
      },
      {
        label: "XL",
        value: "XL",
      },
    ],
  },
];
const variantsFormInputCheck = (label, key, options) => {
  if (options) {
    return options.map((option) => (
      <FormCheck key={option.value}>
        <FormCheckInput type="radio" />
        <FormCheckLabel>{option.label}</FormCheckLabel>
      </FormCheck>
    ));
  } else {
    return <FormNumber />;
  }
};

const AddBtn = styled.button`
  border: 0px;
  border-radius: 30px;
  padding: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

function Upload() {
  const navigate = useNavigate();
  const [fileSrc, setFileSrc] = useState(null);
  const [addVariant, setAddVariant] = useState([1]);
  const [createProductList, setCreateProductList] = useState({
    category: "men",
    title: "string",
    description: "高抗寒素材選用，保暖也時尚有型",
    price: "600",
    texture: "棉、聚脂纖維",
    wash: "手洗，溫水",
    place: "中國",
    note: "實品顏色以單品照為主",
    story: "休閒與我們的時尚街頭服飾品牌毫不費力地融為一體",
    main_image:
      "https://d1lbsv9yxow2js.cloudfront.net/uploads/1657851795868.jpg",
    other_images: [
      "https://d1lbsv9yxow2js.cloudfront.net/uploads/1657851796227.jpg, https://d1lbsv9yxow2js.cloudfront.net/uploads/1657851796227.jpg",
    ],
    variants: [
      {
        color: "FFFFFF",
        size: "S",
        stock: "10",
      },
    ],
  });

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
  const clickToAddVariant = (e) => {
    e.preventDefault();
    let tempArr = [...addVariant];
    tempArr.push(1);
    setAddVariant(tempArr);
  };

  const clickToCreateProduct = () => {
    const data = {
      product_id: "1231",
      category: "men",
      title: "string",
      description: "高抗寒素材選用，保暖也時尚有型",
      price: "600",
      texture: "棉、聚脂纖維",
      wash: "手洗，溫水",
      place: "中國",
      note: "實品顏色以單品照為主",
      story: "休閒與我們的時尚街頭服飾品牌毫不費力地融為一體",
      main_image:
        "https://d1lbsv9yxow2js.cloudfront.net/uploads/1657851795868.jpg",
      other_images: [
        "https://d1lbsv9yxow2js.cloudfront.net/uploads/1657851796227.jpg, https://d1lbsv9yxow2js.cloudfront.net/uploads/1657851796227.jpg",
      ],
      variants: [
        {
          color: "FFFFFF",
          size: "S",
          stock: "10",
        },
      ],
    };
    createProduct(data);
  };
  async function createProduct(data) {
    const response = await fetch(
      `https://kelvin-wu.site/api/1.0/admin/product`,
      {
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "form-data",
        }),
        method: "POST",
      }
    );
    console.log(response);
    if (response.ok) {
      return await response.json();
    }
    throw new Error("error message");
  }

  return (
    <Wrapper>
      <Title>商家上架系統</Title>
      <Content>請填寫以下資訊</Content>
      <form>
        <Form>
          <FormLeft>
            <UploadCardStyled>
              {fileSrc ? (
                <>
                  <ClearBtn onClick={handleClear}>刪除</ClearBtn>
                  <UploadPreview>
                    <UploadPreviewImg src={fileSrc} />
                  </UploadPreview>
                </>
              ) : (
                <UploadCardButton>商品照片上傳</UploadCardButton>
              )}
              <UploadCardInput onChange={handleUploadFile} />
            </UploadCardStyled>
          </FormLeft>
          <FormCenter>
            <FormFieldSet>
              {uploadFormGroups.map(({ label, key, textarea, options }) => (
                <FormGroup key={key}>
                  <FormLabel>{label}</FormLabel>
                  {uploadFormInputCheck(label, key, textarea, options)}
                </FormGroup>
              ))}
            </FormFieldSet>
          </FormCenter>
          <FormRight>
            <VariantsCardStyled>
              {addVariant.map((variant, index) => {
                {
                  return variantsFormGroups.map(({ label, key, options }) => (
                    <FormGroup key={key}>
                      <FormLabel>{label}</FormLabel>
                      {variantsFormInputCheck(label, key, options)}
                    </FormGroup>
                  ));
                }
              })}
            </VariantsCardStyled>
            <AddBtn onClick={clickToAddVariant}>+</AddBtn>
          </FormRight>
        </Form>
      </form>
      <BackButton onClick={clickToCreateProduct}>新增商品</BackButton>
    </Wrapper>
  );
}

export default Upload;
