import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [userAuth, setUserAuth] = useState(null); // 사용자 인증 상태 관리

    return (
        <AuthContext.Provider value={{ userAuth, setUserAuth }}>
            {props.children} {/* 하위 컴포넌트를 렌더링 */}
        </AuthContext.Provider>
    );
};
