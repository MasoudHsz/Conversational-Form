import styled from "styled-components";

function RatingBox(props) {
  const rateNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <RateBox>
      {rateNum.map((num, index) => (
        <span onClick={() => props.rate(index)}>{num}</span>
      ))}
    </RateBox>
  );
}

const RateBox = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  & span {
    width: 10%;
    background: #ededed;
    font-size: 20px;
    font-weight: 600px;
    border: 1px solid lightgrey;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  & span:hover {
    background: grey;
    color: white;
  }
`;

export default RatingBox;
