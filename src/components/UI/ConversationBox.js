import Message from "./Message";
import Button from "../UI/Button";
import UserMessages from "./UserMessages";
import YesNoField from "../Fields/YesNoField";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../prepared/config";
import createMarkup from "../../prepared/createMarkUp";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import { Modal } from "@mui/material";
import { Backdrop } from "@mui/material";
import { Typography } from "@mui/material";
import { Fade } from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

function ConversationBox() {
  const formData = useSelector((state) => state.data);

  const [showDefaultMessage, setShowDefaultMessage] = useState(false);
  const [userAnswer, setUserAnswer] = useState();
  const [yes, setYes] = useState(false);
  const [showRatingBox, setShowRatingBox] = useState(false);
  const [show4, setShow4] = useState(false);
  const [rate, setRate] = useState(null);
  const [messageType, setMessageType] = useState("type");
  const [showButtons, setShowButtons] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadFileMessage, setUploadFileMessage] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [progressValue, setProgressValue] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const [formSubmitResponse, setFormSubmitResponse] = useState();
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
    setTimeout(() => {
      setShowDefaultMessage(true);
    }, 1000);
  }, []);

  // Data for users's answers component
  const dataForUserMessages = {
    userAnswer,
    yes,
    showRatingBox,
    show4,
    rate,
    messageType,
    uploadedFile,
    uploadFileMessage,
    showUploadInput,
    handleYesNoAnswer,
    handleUploadFile,
    setUploadedFile,
    handleRating,
  };

  //Handle Yes No question field
  function handleYesNoAnswer(answer) {
    setUserAnswer(answer);
    setMessageType("answer");
    setShowButtons(false);
  }

  //Handle file Upload field
  function handleUploadFile(fileData) {
    setYes(false);
    if (!fileData) {
      alert("Please select a file!");
      return;
    }
    setUploadedFile(fileData);
    setShowRatingBox(true);
    setUploadFileMessage(true);
    setShowUploadInput(false);
  }

  //Handle Rating field in scale of 0-10
  function handleRating(index) {
    setShowRatingBox(false);
    setShow4(true);
    setRate(index + 1);
    setShowSubmit(true);
  }

  function handleSubmit(submitData) {
    setOpenModal(true);
    let data = new FormData();

    data.append("mEzrU8e2", submitData.userAnswer.toLowerCase());
    data.append("s0tOaWwY", submitData.rate);
    data.append("p9Uykl94", uploadedFile);
    data.append("submitter_referer_address", "https://formaloo.net/uhg2r");

    axios(
      config(
        "post",
        "https://api.formaloo.net/v3.1/form-displays/slug/kEbf5Qof/submit/",
        data,
        (progressEvent) => {
          setProgressValue((progressEvent.loaded / progressEvent.total) * 100);
        }
      )
    )
      .then(function (response) {
        setError(false);
        setResponse(true);
        setFormSubmitResponse(response);
      })
      .catch(function (error) {
        setResponse(true);
        setError(true);
      });
  }

  return (
    <Transition in={transition} timeout={500} mountOnEnter unmountOnExit>
      {(state) => (
        <Box state={state}>
          {formData && <Message type={"markUp"} formData={formData} />}
          {showDefaultMessage && (
            <>
              <Message text={formData?.data?.form?.fields?.mEzrU8e2.title} />
              {showButtons && (
                <YesNoField handleYesNoAnswer={handleYesNoAnswer} />
              )}
            </>
          )}

          <UserMessages data={dataForUserMessages} />
          {showSubmit && (
            <Button
              text={"Submit"}
              click={() => handleSubmit({ userAnswer, rate, uploadedFile })}
              disable={response && !error && "disable"}
            />
          )}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={openModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Box style={style}>
                {!response && (
                  <CircularProgressWithLabel
                    variant="determinate"
                    value={progressValue}
                    color="success"
                  />
                )}
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {!error && (
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        formSubmitResponse?.data?.data?.row?.form
                          ?.success_message
                      )}
                    />
                  )}
                  {error && <h2>Something went wrong!</h2>}
                </Typography>
                {response && (
                  <Button
                    text={!error ? "Done" : "Try Again"}
                    click={() => setOpenModal(false)}
                  ></Button>
                )}
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}
    </Transition>
  );
}

const Box = styled.div`
  width: 50%;
  height: 70vh;
  padding: 20px;
  background-color: #fefefe;
  overflow-y: scroll;
  position: relative;
  @media (max-width: 768px) {
    width: 70%;
  }

  transition: opacity 0.5s ease-out;
  opacity: ${({ state }) =>
    state === "exiting" || state === "entering" ? 0 : 1};
`;

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "60vh",
  bgcolor: "background.paper",
  borderTopLeftRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default ConversationBox;
