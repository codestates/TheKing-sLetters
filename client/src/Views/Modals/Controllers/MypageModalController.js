import React from 'react';

// 포탈 (선택한 컴포넌트를를 종속관계에 상관없이 원하는 위치에 렌더링)
import Portal from '../Portal/Portal';

// 모달 컨텍스트
import { useModalState, useModalDispatch } from '../../../context/ModalContext';

/* 렌더링할 모달창 */
import MyPageModal from '../MyPageModal';

const ModalController = () => {
  /* 모달창 온오프 컨트롤용 state */
  const modalState = useModalState();
  const modalDispatch = useModalDispatch();

  const myPageOpen = modalState.modalUserMypage;
  const setMyPageOpen = (bool) => modalDispatch({type: "MODAL_USER_MYPAGE", value: bool});
  
  return (
    <>
    {/* id로 렌더링할 위치를 지정 */}
    <Portal elementId="modal_mypage">
      <MyPageModal isOpen={myPageOpen} setIsOpen={setMyPageOpen}>ddddddddddddddddddddd</MyPageModal>
    </Portal>
    </>
  )
};

export default ModalController;