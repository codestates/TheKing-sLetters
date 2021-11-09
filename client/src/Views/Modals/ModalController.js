import React, { useState } from 'react';

// 포탈 (선택한 컴포넌트를를 종속관계에 상관없이 원하는 위치에 렌더링)
import Portal from './Portal/Portal';

/* 렌더링할 모달창 */
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import MyPageModal from './MyPageModal';
import AdminLoginModal from './AdminLoginModal';

const ModalController = ({children}) => {
  /* 모달창 온오프 컨트롤용 state */
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [adminSignInOpen, setAdminSignInOpen] = useState(false);

  return (
    <>
    {/* id로 렌더링할 위치를 지정 */}
    {/* 아래는 데스크탑용 모달 */}
    <Portal elementId="modal_signin">
      <SignInModal isOpen={signInOpen} setIsOpen={setSignInOpen} switcher={setSignUpOpen}></SignInModal>
    </Portal>
    <Portal elementId="modal_signup">
      <SignUpModal isOpen={signUpOpen} setIsOpen={setSignUpOpen}></SignUpModal>
    </Portal>
    <Portal elementId="modal_mypage">
      <MyPageModal isOpen={myPageOpen} setIsOpen={setMyPageOpen}></MyPageModal>
    </Portal>
    <Portal elementId="modal_admin_signin">
      <AdminLoginModal isOpen={adminSignInOpen} setIsOpen={setAdminSignInOpen}></AdminLoginModal>
    </Portal>
    {/* 아래는 토글용 모달 */}
    <Portal elementId="modal_signin_toggle">
      <SignInModal isOpen={signInOpen} setIsOpen={setSignInOpen} switcher={setSignUpOpen}></SignInModal>
    </Portal>
    <Portal elementId="modal_signup_toggle">
      <SignUpModal isOpen={signUpOpen} setIsOpen={setSignUpOpen}></SignUpModal>
    </Portal>
    <Portal elementId="modal_mypage_toggle">
      <MyPageModal isOpen={myPageOpen} setIsOpen={setMyPageOpen}></MyPageModal>
    </Portal>
    <Portal elementId="modal_admin_signin_toggle">
      <AdminLoginModal isOpen={adminSignInOpen} setIsOpen={setAdminSignInOpen}></AdminLoginModal>
    </Portal>
    {children}
    </>
  )
};

export default ModalController;