import React, { useState } from 'react';
import styled from 'styled-components';

export default function Account() {
    const [Name, setName] = useState("이름");
    const [Email, setEmail] = useState("이메일");
    const [Detail, setDetail] = useState("자기소개");
    const [Location, setLocation] = useState("지역");
    return (
    <Container>
        <NameContainer>
            {Name}
        </NameContainer>
        <EmailContainer>
            {Email}
        </EmailContainer>
        <DetailContainer>
            {Detail}
        </DetailContainer>
        <LocationContainer>
            {Location}
        </LocationContainer>
    </Container>);
}
const Container = styled.div`
    display:flex;
    flex-direction:column;
    padding:0 3%;

`;
const NameContainer = styled.div`
    margin-bottom: 4%;
`;
const EmailContainer = styled.div`
    margin-bottom: 4%;
`;
const DetailContainer = styled.div`
    margin-bottom: 4%;
`;
const LocationContainer = styled.div`
`;
