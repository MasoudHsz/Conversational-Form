import styled from "styled-components";
import Button from "../UI/Button";

function YesNoField(props) {
  return (
    <>
      <BtnContainer>
        <Button text={"Yes"} click={() => props.handleYesNoAnswer("Yes")} />
        <Button text={"No"} click={() => props.handleYesNoAnswer("No")} />
      </BtnContainer>
    </>
  );
}

const BtnContainer = styled.div`
  margin: 10px;
  width: 30%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default YesNoField;
