import styled from "styled-components";

import { Button } from "./Common";

export const Pagination = styled.div`
  ${Button} {
    &:not(:last-child) {
      margin-right: 3px;
    }
  }
`