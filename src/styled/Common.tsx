import styled from "styled-components";

export const Button = styled.button<ButtonProps>`
  min-width: 40px;
  height: 40px;
  padding: 5px 10px;
  cursor: pointer;
  border: 0;
  background-color: ${({ active }) => (active ? "#333 !important" : "#ddd")};
  border-radius: 4px;
  outline: 0;
  color: #000;

  &:hover {
    background-color: #ccc;
    color: #000;
  }

  &:disabled {
    background-color: #eee;
    color: #ccc;
  }
`;

export const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: 0;

  &:disabled {
    background-color: #eee;
    color: #ccc;
  }
`;

export const Container = styled.div`
  padding: 16px;

  @media (min-width: 996px) {
    width: 1136px;
    margin: 0 auto;
  }
`;
