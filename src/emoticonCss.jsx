import { css } from '@emotion/react';
export const summaryTitle = css`
  font-family: "Work Sans", sans-serif;
  font-size: 20px;
  font-weight: 500; 
  color: #4D4C7D;
  margin-top: .8rem; 
  padding-bottom:2px;
`;

export const summaryDateAuthor = css`
  font-family: "Work Sans", sans-serif;
  font-size: 13px;
  font-weight: 400; 
  color: gray;
`;

export const summaryText = css`
  font-family: "Work Sans", sans-serif;
  font-size: 16px;
  font-weight: 400; 
  color: gray;
  margin-top: .8rem; 
  padding-bottom:4px;
  max-height: 4.5em;
  overflow: hidden;
`;

export const summaryButton = css`
  color: primary;
  font-family: "Work Sans", sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-transform: none;
  width: fit-content;
  padding:0;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export const imageListStyle = css`
  width: 416px;
  border-radius: 2px;
  margin-bottom: 15px;
`;

export const topographyMainHeading = css`
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  color: #214252;
  padding-bottom: 7px;
  font-size: 35px;
`;

export const blogyHeading = css `
  font-family: "Work Sans", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-left: 7rem
`;

export const appBar = css `
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
`;

export const headerUserAvatar = css `
  width: 35px;
  height: 35px;
  margin-left: 24rem;
  margin-top: 0.7rem;
`;

export const menuButton = css`
  color:#fff;
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-transform: none;
  :hover{
  color: rgba(255, 255, 255, 0.5)};
    margin-top: 0.68rem;
`;

export const formContainer = css`
  width:80ch;
  margin-top: 5em;
`;

export const formBorderBox = css`
  border: 3px solid #214252;
  margin-top: 5px;
  background-color:#fff;
  border-radius: 16px;
`;

export const formHeaderBox = css`
  background-color: #214252;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:1rem;
  border-radius: 11px 11px 0 0;
`;

export const formInnerBox = css`
  display: flex; 
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding:1.1em;
`;

export const formSubmitButton = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
`;

export const userAvatar = css `
  width: 35px;
  height: 35px;
  margin-right: 1rem;
`;