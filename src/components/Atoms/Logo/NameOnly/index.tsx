import {styled} from "styled-components";

export const NameOnly = () => {
    return (
        <Wrapper><h1>Whai</h1><Accent>Data</Accent></Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`

const Accent = styled.h1`
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
