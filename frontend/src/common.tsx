import styled from "styled-components";

export const Stack = styled.div<{
  gap?: string;
  direction?: string;
  center?: boolean;
  verticalSpacing?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "row"};
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "unset")};
  gap: ${(props) => props.gap ?? "0"};
  padding-top: ${(props) => props.verticalSpacing ?? "unset"};
  padding-bottom: ${(props) => props.verticalSpacing ?? "unset"};
`;

export const Row = styled(Stack)`
  flex-direction: row;
  align-items: center;
`;

export const Col = styled(Stack)`
  flex-direction: column;
  justify-content: center;
`;
