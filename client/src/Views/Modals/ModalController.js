import React, { useState } from 'react';

// 포탈 (선택한 컴포넌트를를 종속관계에 상관없이 원하는 위치에 렌더링)
import Portal from './Portal/Portal';

/* 렌더링할 모달창 */
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import MyPageModal from './MyPageModal';

const ModalController = ({children}) => {
  /* 모달창 온오프 컨트롤용 state */
  const [signInOpen, setSignUpnOpen] = useState(false);
  const [signUpOpen, setSignUnOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);

  return (
    <>
    {/* id로 렌더링할 위치를 지정 */}
    {/* 아래는 데스크탑용 모달 */}
    <Portal elementId="modal_signin">
      {/* 렌더링할 컴포넌트를 지정 */}
      <SignInModal isOpen={signInOpen} setIsOpen={setSignUpnOpen} switcher={setSignUnOpen}></SignInModal>
    </Portal>
    <Portal elementId="modal_signup">
      <SignUpModal isOpen={signUpOpen} setIsOpen={setSignUnOpen}></SignUpModal>
    </Portal>
    <Portal elementId="modal_mypage">
      <MyPageModal isOpen={myPageOpen} setIsOpen={setMyPageOpen}></MyPageModal>
    </Portal>
    {/* 아래는 토글용 모달 */}
    <Portal elementId="modal_signin_toggle">
      <SignInModal isOpen={signInOpen} setIsOpen={setSignUpnOpen} switcher={setSignUnOpen}></SignInModal>
    </Portal>
    <Portal elementId="modal_signup_toggle">
      <SignUpModal isOpen={signUpOpen} setIsOpen={setSignUnOpen}></SignUpModal>
    </Portal>
    {children}
    </>
  )
};

export default ModalController;