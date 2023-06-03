import styled from '@emotion/styled';

export const SearchbarHeader = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100vw;
  background: rgb(100, 150, 200);
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const Form = styled.form`
  width: 100%;
  max-width: 600px;
  border-radius: 3px;
  overflow: hidden;
`;
export const Button = styled.button`
  width: 120px;
  height: 48px;
  line-height: 100%;
  text-align: center;
  color: #ffffff;
  border-radius: 12px;
  background: linear-gradient(180deg, #40df9f 0%, #3ed598 100%);
  box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);
  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover,
  :focus {
    background: #2fa186;
  }
`;
export const Input = styled.input`
  margin: 12px;
  width: 400px;
  height: 48px;
  border-radius: 12px;
  background: #fafa5c;
`;
