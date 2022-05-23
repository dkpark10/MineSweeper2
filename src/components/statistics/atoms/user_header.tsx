import React from "react";
import styled from "styled-components";
import Title from "../../common/atoms/title";

const UserHeaderStyle = styled.div`
  text-align:center;
`;

interface Props {
  id: string;
}

export default function UserHeader({ id }: Props) {
  return (
    <UserHeaderStyle>
      <Title
        fontSize={"1.28rem"}
        fontBold={true}
      >
        {id}
      </Title>
    </UserHeaderStyle>
  )
}

