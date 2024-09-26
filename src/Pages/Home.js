import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function Home() {
    return (
        <Container>
            메인
        </Container>
    );
}

const Container = styled.div` // 최상단 박스 컨테이너
    display: flex;
    width: 100%;
    font-size: 100px;
`;