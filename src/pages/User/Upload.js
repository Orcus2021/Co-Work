import React, { useEffect, useState } from "react";
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
    transition: 1s;
  }
`;
const Form = styled.div`
  display: flex;
  margin-top: 50px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;
const FormLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
  }
`;
const FormCenter = styled.div`
  display: flex;
  width: 400px;
  margin-right: 20px;
  @media screen and (max-width: 1279px) {
    justify-content: center;
  }
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
    transition: 1s;
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
const MultiUploadPreview = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  overflow-y: auto;
`;
const MultiUploadPreviewImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
`;
const ImageReminder = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
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
  resize: none;
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
    label: "????????????",
    key: "category",
    options: [
      {
        label: "??????",
        value: "men",
      },
      {
        label: "??????",
        value: "women",
      },
      {
        label: "??????",
        value: "accessories",
      },
    ],
  },
  { label: "????????????", key: "title" },
  { label: "????????????", key: "description", textarea: true },
  { label: "??????", key: "price" },
  { label: "??????", key: "texture" },
  { label: "??????", key: "wash" },
  { label: "??????", key: "place" },
  { label: "????????????", key: "story", textarea: true },
];

const VariantsCardStyled = styled.label`
  position: relative;
  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
`;
const ImgBx = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  overflow: hidden;
`;

const variantsFormGroups = [
  {
    label: "????????????#",
    key: "color_code",
  },
  {
    label: "????????????",
    key: "color_name",
  },
  { label: "????????????", key: "stock" },
  {
    label: "????????????",
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

const ButtonContainer = styled.div`
  display: flex;
`;
const VariantsButton = styled.button`
  border: 0px;
  border-radius: 30px;
  padding: 5px;
  cursor: pointer;
  margin: 20px 5px 0 5px;
  width: 100%;
`;
const ColorCode = styled.div`
  width: 25px;
  height: 25px;
  background-color: #${(props) => (props.$code ? props.$code : "fff")};
  border-radius: 3px;
  border: 1px solid black;
  margin-left: 5px;
`;
const CloseBx = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  top: 0;
  right: 0;
  background-color: #99262a;
  color: #fff;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const VariantsBx = styled.div`
  position: relative;
  width: 100%;
`;

function Upload() {
  const [fileSrc, setFileSrc] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [addVariant, setAddVariant] = useState([1]);
  const [recipient, setRecipient] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    texture: "",
    wash: "",
    place: "",
    note: "??????????????????????????????",
    story: "",
  });
  const [recipientVariants, setRecipientVariants] = useState([
    { color_code: "", color_name: "", size: "", stock: "" },
  ]);
  const [recipientImage, setRecipientImage] = useState({
    main_image: "",
    other_images: "",
  });

  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    // e.target.value = "";
    setRecipientImage({ ...recipientImage, main_image: e.target.files });
  };
  const handleMultipleUploadFile = (e) => {
    setRecipientImage({ ...recipientImage, other_images: e.target.files });
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
  };

  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const clickToAddVariant = (e) => {
    e.preventDefault();
    let tempArr = [...addVariant];
    tempArr.push(1);
    setAddVariant(tempArr);
    setRecipientVariants([
      ...recipientVariants,
      { color_code: "", color_name: "", size: "", stock: "" },
    ]);
  };

  const uploadFormInputCheck = (label, key, textarea, options) => {
    if (options) {
      return options.map((option) => (
        <FormCheck key={option.value}>
          <FormCheckInput
            type="radio"
            checked={recipient.category === option.value}
            onChange={(e) => {
              if (e.target.checked)
                setRecipient({ ...recipient, category: option.value });
            }}
          />
          <FormCheckLabel>{option.label}</FormCheckLabel>
        </FormCheck>
      ));
    } else if (textarea) {
      return (
        <FormText
          value={recipient[key]}
          onChange={(e) =>
            setRecipient({ ...recipient, [key]: e.target.value })
          }
        />
      );
    } else {
      return (
        <FormControl
          value={recipient[key]}
          onChange={(e) =>
            setRecipient({ ...recipient, [key]: e.target.value })
          }
        />
      );
    }
  };
  const variantsFormInputCheck = (
    label,
    key,
    options,
    index,
    recipientVariants
  ) => {
    // console.log(index);
    if (options) {
      return options.map((option) => {
        return (
          <FormCheck key={option.value}>
            <FormCheckInput
              type="radio"
              name={`size${index}`}
              onChange={(e) => {
                if (e.target.checked)
                  setRecipientVariants((pre) => {
                    pre[index].size = option.value;
                    const newArr = [...pre];
                    return newArr;
                  });
              }}
            />
            <FormCheckLabel>{option.label}</FormCheckLabel>
          </FormCheck>
        );
      });
    } else {
      if (key === "color_code") {
        return (
          <>
            <FormNumber
              value={recipientVariants[index][key]}
              onChange={(e) =>
                setRecipientVariants((pre) => {
                  pre[index][key] = e.target.value;
                  const newArr = [...pre];
                  return newArr;
                })
              }
            />
            <ColorCode $code={recipientVariants[index].color_code}></ColorCode>
          </>
        );
      } else {
        return (
          <FormNumber
            value={recipientVariants[index][key]}
            onChange={(e) =>
              setRecipientVariants((pre) => {
                pre[index][key] = e.target.value;
                const newArr = [...pre];
                return newArr;
              })
            }
          />
        );
      }
    }
  };

  const clickToCreateProduct = () => {
    if (images.length > 0) {
      createProduct();
      alert("??????????????????");
    } else if (
      images.length === 0 ||
      recipient.category === "" ||
      recipient.title === "" ||
      recipient.description === "" ||
      recipient.price === "" ||
      recipient.texture === "" ||
      recipient.wash === "" ||
      recipient.place === "" ||
      recipient.story === "" ||
      recipientVariants[0].color_code === "" ||
      recipientVariants[0].size === ""
    ) {
      alert("???????????????????????????");
    }
  };
  async function createProduct() {
    let formData = new FormData();

    const variantsArr = recipientVariants.map((obj) => {
      const newObj = {
        color_code: obj.color_code,
        size: obj.size,
        stock: obj.stock,
      };
      return newObj;
    });
    const colorsArr = recipientVariants.map((obj) => {
      const newObj = {
        code: obj.color_code,
        name: obj.color_name,
      };
      return newObj;
    });

    formData.append("category", recipient.category);
    formData.append("title", recipient.title);
    formData.append("description", recipient.description);
    formData.append("price", recipient.price);
    formData.append("texture", recipient.texture);
    formData.append("wash", recipient.wash);
    formData.append("place", recipient.place);
    formData.append("note", recipient.note);
    formData.append("story", recipient.story);
    formData.append("colors", JSON.stringify(colorsArr));
    //  formData.append("sizes", recipient.story);
    formData.append("variants", JSON.stringify(variantsArr));
    formData.append("main_image", recipientImage.main_image[0]);
    for (const file of recipientImage.other_images) {
      formData.append("other_images", file);
      // console.log(file);
    }

    const response = await fetch(
      `https://kelvin-wu.site/api/1.0/admin/product`,
      {
        body: formData,
        method: "POST",
      }
    );
  }

  // const UploadFile = (e) => {
  //   setRecipientImage({ ...recipientImage, main_image: e.target.files });
  // };
  // const MultipleUploadFile = (e) => {
  //   setRecipientImage({ ...recipientImage, other_images: e.target.files });
  // };

  const removeHandler = (index, e) => {
    e.preventDefault();
    setAddVariant((pre) => {
      if (pre.length === 1) {
        return pre;
      } else {
        pre.pop();
        const newArr = [...pre];
        return newArr;
      }
    });

    setRecipientVariants((pre) => {
      if (pre.length === 1) {
        return pre;
      } else {
        pre.splice(index, 1);
        const newArr = [...pre];
        return newArr;
      }
    });
  };
  return (
    <Wrapper>
      <Title>??????????????????</Title>
      <Content>?????????????????????</Content>
      <form>
        <Form>
          <FormLeft>
            <UploadCardStyled>
              {fileSrc ? (
                <>
                  <UploadPreview>
                    <UploadPreviewImg src={fileSrc} />
                  </UploadPreview>
                </>
              ) : (
                <UploadCardButton>????????????????????????</UploadCardButton>
              )}
              <UploadCardInput onChange={handleUploadFile} />
            </UploadCardStyled>
            <UploadCardStyled>
              {images.length > 0 ? (
                <MultiUploadPreview>
                  {images.map((image, idx) => {
                    return (
                      <ImgBx key={idx}>
                        <MultiUploadPreviewImg key={idx} src={image} alt="" />
                      </ImgBx>
                    );
                  })}
                </MultiUploadPreview>
              ) : (
                <UploadCardButton>????????????????????????</UploadCardButton>
              )}
              <UploadCardInput multiple onChange={handleMultipleUploadFile} />
            </UploadCardStyled>
            <ImageReminder>*??????????????????????????????</ImageReminder>
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
              {addVariant.map((data, index) => {
                {
                  return (
                    <VariantsBx key={index}>
                      {variantsFormGroups.map(({ label, key, options }) => (
                        <FormGroup key={key}>
                          <FormLabel>{label}</FormLabel>
                          {variantsFormInputCheck(
                            label,
                            key,
                            options,
                            index,
                            recipientVariants
                          )}
                        </FormGroup>
                      ))}
                      <CloseBx onClick={removeHandler.bind(null, index)}>
                        X
                      </CloseBx>
                    </VariantsBx>
                  );
                }
              })}
            </VariantsCardStyled>
            <ButtonContainer>
              <VariantsButton onClick={clickToAddVariant}>+</VariantsButton>
            </ButtonContainer>
          </FormRight>
        </Form>
      </form>
      <BackButton onClick={clickToCreateProduct}>????????????</BackButton>
    </Wrapper>
  );
}

export default Upload;
