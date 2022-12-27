import styled from "styled-components";

export const Table = styled.table`
  border: 0;
  border-spacing: 0;
  border-collapse: collapse;

  & th, 
  & td {
    padding: 5px;
    border: 1px solid #ccc;
  }
`

export const RepoTable = styled(Table)`
  width: 100%;
  margin-bottom: 20px;

  th,
  td {
    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      width: 100px;
      text-align: center;
    }

    &:first-child {
      width: 50px;
    }

    &:nth-child(2) {
      width: 100px;
    }

    &:nth-child(3),
    &:nth-child(4) {
      width: 200px;
    }

    &:last-child {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`