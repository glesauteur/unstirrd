import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Modal = ({ showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      {showModal ? (
        <Background>
          <ModalContainer showModal={showModal}>
            <CloseModal
              onClick={closeModal}
              aria-label="Close Modal"
            ></CloseModal>
            <ModalContent>
              <Title>Rate your cocktail!</Title>
              <InputContainer>
                Cocktail
                <Input></Input>
              </InputContainer>
              <p>Rating</p>
              <SubmitButton>Submit</SubmitButton>
            </ModalContent>
          </ModalContainer>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 400px;
  height: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  height: 70%;
`;

const Title = styled.h2`
  align-self: center;
`;

const InputContainer = styled.div``;

const Input = styled.input`
  width: 50%;
  border-radius: 10px;
  border-width: 0.8px;
  margin-left: 5px;
`;

const SubmitButton = styled.button`
  width: 50%;
  align-self: center;
  margin-top: 30px;
  background-color: var(--primary-color);
  border-style: none;
  color: white;
  padding: 10px 0px;
  font-size: 15px;
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  :hover {
    background-color: #cb3000;
  }
`;

const CloseModal = styled(MdClose)`
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
export default Modal;
