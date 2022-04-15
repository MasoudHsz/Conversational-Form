import RatingBox from "../Fields/RatingBox";
import UploadInput from "../Fields/UploadInput";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function UserMessages(props) {
  const formData = useSelector((state) => state.data);
  const [data, setData] = useState();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      {data?.userAnswer && <Message type="answer" text={data?.userAnswer} />}
      {data?.userAnswer === "Yes" ? (
        <>
          <Message text={formData?.data?.form?.fields?.p9Uykl94.title} />
          {data?.showUploadInput && (
            <UploadInput send={data?.handleUploadFile} />
          )}
        </>
      ) : data?.userAnswer === "No" ? (
        <>
          <Message text={"Understood!"} />
          <Message text={formData?.data?.form?.fields?.p9Uykl94.title} />
          {data?.showUploadInput && (
            <UploadInput send={data?.handleUploadFile} />
          )}
        </>
      ) : null}
      {data?.uploadFileMessage && <Message type="answer" text="Sent!" />}
      {data?.showRatingBox && (
        <>
          <Message text={formData?.data?.form?.fields?.s0tOaWwY.title} />
          <RatingBox rate={data?.handleRating} />
        </>
      )}
      {data?.show4 && <Message text={data?.rate} type="answer" />}
    </>
  );
}

export default UserMessages;
