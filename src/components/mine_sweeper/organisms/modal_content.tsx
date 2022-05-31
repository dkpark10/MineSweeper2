import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/index";
import styled from "styled-components";
import Button from "../../common/atoms/button";
import axiosInstance from "../../../utils/default_axios";

interface Props {
  takenTime: number;
  level: string;
  isGameSuccess: boolean;
  onMouseClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalContentStyle = styled.div`
  width: 294px;
  padding: 35px 50px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
  text-align: center;
  background-color: white;
  box-shadow:  17px 17px 38px #121212,
         -1px -1px 3px #ffffff;
`;

const CloseButton = styled(Button)`
  margin-top: 20px;
  font-family: "Noto Sans KR", sans-serif;
  background-color: ${({ theme }) => theme.mainColor};
  color: white;

  &:hover{
    background: linear-gradient(70deg, 
      ${({ theme }) => theme.mainColor}, 
      ${({ theme }) => theme.gradientColor});
  }
`;

export default function ModalContent({
  takenTime,
  level,
  isGameSuccess,
  onMouseClick
}: Props) {

  const userid = useSelector((state: RootState) => state.login.id);

  useEffect(() => {

    const request = async () => {
      try {
        await axiosInstance.post("/api/game", {
          id: userid === "" ? "anonymous" : userid,
          record: takenTime / 1000,
          success: isGameSuccess ? "success" : "fail",
          level: level
        })
      } catch (e) {
      }
    }
    
    request();
  }, [isGameSuccess, level, takenTime, userid]);

  return (
    <ModalContentStyle>
      <div> Time : {(takenTime) / 1000}</div>
      <div> Level : {level}</div>
      <CloseButton
        width={"75px"}
        height={"25px"}
        radius={"5px"}
        border={"none"}
        onClick={onMouseClick}
      >
        close
      </CloseButton>
    </ModalContentStyle>
  )
}