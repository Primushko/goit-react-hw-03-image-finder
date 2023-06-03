import styled from '@emotion/styled';

export const ButtonLoad = styled.button`
  width: 120px;
  height: 48px;

  line-height: 100%;
  text-align: center;
  color: #ffffff;

  border-radius: 12px;

  background: linear-gradient(260deg, #4840df 0%, #2f439f 100%);
  box-shadow: 0px 2px 4px rgb(165, 196, 243, 0.3);

  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover,
  :focus {
    background: #2f4aa1;
  }
`;
