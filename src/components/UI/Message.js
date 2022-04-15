import styled from "styled-components";
import createMarkup from "../../prepared/createMarkUp";

function Message(props) {
  return (
    <Msg type={props.type}>
      {props.type === "markUp" && (
        <div
          dangerouslySetInnerHTML={createMarkup(
            props.formData?.data?.form?.description
          )}
        />
      )}
      {props.text}
    </Msg>
  );
}

const Msg = styled.div`
  width: fit-content;
  margin-left: ${(props) => (props.type === "answer" ? "auto !important" : "")};
  max-width: 50%;
  background-color: ${(props) =>
    props.type === "answer" ? "#04AB69" : "#3C3C3E"};
  color: white;
  font-weight: 600;
  font-size: 20px;
  border-top-right-radius: ${(props) =>
    props.type === "answer" ? "20px" : "20px"};
  border-top-left-radius: ${(props) =>
    props.type === "answer" ? "20px" : "20px"};
  border-bottom-right-radius: ${(props) =>
    props.type === "answer" ? "0px" : "20px"};
  border-bottom-left-radius: ${(props) =>
    props.type === "answer" ? "20px" : "0px"};
  padding: 15px 20px;
  margin: ${(props) => (props.type === "answer" ? "50px 0" : "10px 0")};
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.212);

  @media (max-width: 768px) {
    font-size: 12px;
  }
  transition: opacity 0.3s ease-out;

  & p {
    margin: 0;
  }
`;

export default Message;
