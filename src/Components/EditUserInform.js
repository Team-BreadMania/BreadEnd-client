import React, { useState } from 'react';
import styled from 'styled-components';
import Account from './Account';

export default function EditUserInfo({ nickname, setNickname, email, setEmail, location, setLocation}) {
    const [newNickname, setNewNickname] = useState(nickname);
    const [newEmail, setNewEmail] = useState(email);
    const [newLocation, setNewLocation] = useState(location);

    const handleSave = () => {
        setNickname(newNickname);
        setEmail(newEmail);
        setLocation(newLocation);
    };

    return (
        <Container>
            <h2>유저 정보 수정</h2>
            <Form>
                <Label>
                    닉네임 : &nbsp;
                    <Input 
                        type="text" 
                        value={newNickname} 
                        onChange={(e) => setNewNickname(e.target.value)} 
                    />
                </Label>
                <Label>
                    이메일 :  &nbsp;
                    <Input 
                        type="email" 
                        value={newEmail} 
                        onChange={(e) => setNewEmail(e.target.value)} 
                    />
                </Label>
                <Label>
                    지역 :  &nbsp;
                    <Input 
                        type="text" 
                        value={newLocation} 
                        onChange={(e) => setNewLocation(e.target.value)} 
                    />
                </Label>
                <Button onClick={handleSave}>저장</Button>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 20px;
    @media (max-width: 800px) {
        margin-top: 10px;
    }
    @media (max-width: 400px) {
        margin-top: 6px;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.label`
    font-size: 16px;
    align-items:center;
`;

const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Textarea = styled.textarea`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
