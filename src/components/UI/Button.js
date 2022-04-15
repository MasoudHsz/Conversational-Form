import styled from "styled-components";

function Button(props) {
  return (
    <Btn buttonType={props.text} onClick={props.click} disabled={props.disable}>
      {props.text}
    </Btn>
  );
}

const Btn = styled.button`
  background-color: ${(props) =>
    props.buttonType === "Send" ||
    props.buttonType === "Yes" ||
    props.buttonType === "Done"
      ? "#04AB69"
      : props.disabled === "disable"
      ? "grey"
      : props.buttonType === "Submit"
      ? "purple"
      : "grey"};
  width: ${(props) =>
    props.buttonType === "Yes" || props.buttonType === "No"
      ? "50%"
      : props.buttonType === "Submit"
      ? "80%"
      : props.buttonType === "Try Again"
      ? "200px"
      : "20%"};
  border-radius: 10px;
  font-weight: bold;
  margin: 3px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => (props.buttonType === "Submit" ? "auto" : "")};
  cursor: pointer;
  color: white;
  font-size: 20px;
  outline: none;
  border: none;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.212);
  transition: transform 0.1s ease-in-out;
  &:focus {
    transform: scale(1.02);
  }
  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default Button;
