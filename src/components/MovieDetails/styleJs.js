import styled from 'styled-components'

const MainImg = styled.div`
  background-image: url('${props => props.backimageurl}');
  background-size: cover;
  height: 380px;
  width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    align-items: flex-end;
    height: 600px;
  }
`
export default MainImg