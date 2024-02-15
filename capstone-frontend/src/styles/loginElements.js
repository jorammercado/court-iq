import styled from 'styled-components'

export const LoginWrapper = styled.div`
  display: absolute;
  position: relative;
  width: 750px;
  border-radius: 50px;
  border-width: 4px;
  margin-left: -30px;
  margin-right: -30px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-bottom: 40px;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);
  min-height: 115vh;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  rgba(0, 0, 0, 0.12) 0px -12px 30px,
  rgba(0, 0, 0, 0.12) 0px 4px 6px,
  rgba(0, 0, 0, 0.17) 0px 12px 13px, 
  rgba(0, 0, 0, 0.9) 0px -3px 5px;
`

export const LoginBackground = styled.form`
  position: absolute;
  width: 460px;
  height: 400px;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #3a4664;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);
  background-image: url("../../../testBack1.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  background-attachment: fixed;
  background-size: cover; 
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  rgba(0, 0, 0, 0.12) 0px -12px 30px,
  rgba(0, 0, 0, 0.12) 0px 4px 6px,
  rgba(0, 0, 0, 0.17) 0px 12px 13px, 
  rgba(0, 0, 0, 0.9) 0px -3px 5px;
  border-radius: 10px;
  padding: 0 0 77px 0;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: auto;
    padding: 0;
    background: none;
    box-shadow: none;
  }
`

export const LoginBackground2 = styled.form`

  position: absolute;
  width: 560px;
  height: 680px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #3a4664;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 10px 10px 2px rgba(51, 51, 51, 0.1);
  border-radius: 10px;
  padding: 0 0 77px 0;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: auto;
    padding: 0;
    background: none;
    box-shadow: none;
  }
`

export const LoginBackground3 = styled.div`

  position: absolute;
  width: 560px;
  height: 540px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #3a4664;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        #48cae4 0px -12px 30px,
        rgba(0, 0, 0, 0.12) 0px 4px 6px,
        #48cae4 0px 12px 13px,
        #03045e 0px -3px 5px;

  border-radius: 10px;

  padding: 0 0 77px 0;
  box-sizing: border-box;

  transform: translate(-50%, -50%);
  background: #3a4664;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);
  background-image: url("../../../testBack6.jpeg");
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: auto;
    padding: 0;
    background: none;
    box-shadow: none;
  }
`;

export const LoginBackground4 = styled.div`
position: absolute;
width: 460px;
height: 400px;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: #3a4664;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
box-shadow: 0px 10px 10px 2px rgba(51, 51, 51, 0.1);
border-radius: 10px;
padding: 0 0 77px 0;
box-sizing: border-box;

@media screen and (max-width: 480px) {
  position: fixed;
  width: 90%;
  height: auto;
  padding: 0;
  background: none;
  box-shadow: none;
}
`

export const LoginLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);
  border-radius:20px;
  margin-bottom:5px;
  

  @media screen and (max-width: 480px) {
    position: absolute;
    bottom: 190px;
  }
`

export const LoginHeader = styled.h2`
  width: 259px;
  height: 30px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 2px;
  margin-top:5px;
  color:white;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
`

export const LoginHeaderV3 = styled.h2`
  width: 259px;
  height: 35px;
  margin-top: 10px;
  border-radius:20px;
  
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  color: #f2f2f2;
  background-color: #282828;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }

`

export const LoginHeaderV2 = styled.h4`
  width: 259px;
  height: 30px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 30px;
  text-align: left;
  
  color: black;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }

`

export const LoginHeaderV4 = styled.h2`
  width: 259px;
  height: 180px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 50px;
  text-align: center;
  color: #f2f2f2;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }

`

export const ErrorList = styled.ul`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 15px;
  margin-bottom: 15px;
  color: #000000;
  li{
    text-align: center;
  }
  li:first-child{
    font-weight: 500;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 480px) {
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    margin-top: 15px;

    li:first-child{
      font-weight: 500;
      margin-bottom: 7px;
    }
  }
`

export const ErrorList2 = styled.ul`
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: #f2f2f2;
  width:300px;

  border-radius: 20px;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
`

export const FormInput = styled.input`
  width: 300px;
  height: 50px;
  background: #F8F5F5;
  border-radius: 10px;
  border: none;
  margin-bottom: 15px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: rgba(0, 0, 0, 0.6);
  padding-left:25px;

  &:focus{
    outline: none;
  }

  &::placeholder{
    font-weight: normal;
  }

  @media screen and (max-width: 480px) {

    &:focus{
      box-shadow: 0px 4px 3px 0px rgb(51 51 51 / 40%);
      background: #FFFFFF;
    }
  }
`

export const LoginButton = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  rgba(0, 0, 0, 0.12) 0px -12px 30px,
  rgba(0, 0, 0, 0.12) 0px 4px 6px,
  rgba(0, 0, 0, 0.17) 0px 12px 13px, 
  rgba(0, 0, 0, 0.9) 0px -3px 5px;

  &:focus{
      outline: none;
  }
`

export const LoginButton2 = styled.button`  
  width: 300px;
  height: 50px;
  
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;
  

  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  #48cae4 0px -12px 30px,
  #03045e 0px 4px 6px,
  #48cae4 0px 12px 13px,
  #03045e 0px -3px 5px;

  &:focus{
      outline: none;
  }
`

export const LoginButton3 = styled.button`
  width: 125px;
  height: 40px;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  

  &:focus{
      outline: none;
  }
`

export const LoginButton4 = styled.button`
  width: 50px;
  height: 40px;
  background: #FF5B90;
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  &:focus{
      outline: none;
  }
`

export const LoginButton5 = styled.button`
  width: 125px;
  height: 40px;
  background: #FF5B90;
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  &:focus{
      outline: none;
  }
`

export const LoginButton6 = styled.button`
  width: 170px;
  height: 50px;
  background: #FF5B90;
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  &:focus{
      outline: none;
  }
`

export const LoginButton7 = styled.button`
  width: 330px;
  height: 50px;
  background: #FF5B90;
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  &:focus{
      outline: none;
  }
`

export const OkButton = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;
  background: linear-gradient(116.82deg, #48cae4 -5%, #03045e 100%);

  &:focus{
      outline: none;
  }
`