import Button from "../UI/Button";
import { useState } from "react";
import styled from "styled-components";

function UploadInput(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  function inputHandler(e) {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <InputBox>
      <StyledDiv class="file-input">
        <div>
          <StyledLabel for="file">
            Select file
            <p className="file-name"></p>
          </StyledLabel>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            className="file"
            onChange={inputHandler}
          />
        </div>
      </StyledDiv>
      <ImageData>
        <small>{selectedFile?.name}</small>
        <small>
          {selectedFile?.size && Math.round(selectedFile?.size / 1000)}
          {selectedFile?.size && "KB"}
        </small>
      </ImageData>
      <Button text={"Send"} click={() => props.send(selectedFile)} />
    </InputBox>
  );
}

const InputBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const ImageData = styled.div`
  font-size: 12px;
  color: grey;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const StyledLabel = styled.label`
  outline: none !important;
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(40deg, rgb(161, 161, 161), rgb(88, 88, 90));
  box-shadow: rgba(0, 0, 0, 0.21) 0px 4px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s ease-out 0s;
  transform: scale(1.02);
  outline: -webkit-focus-ring-color auto 2px;
`;

export default UploadInput;
