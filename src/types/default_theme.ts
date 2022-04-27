import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainColor: string;
    grayMainColor: string;
    gradientColor: string;
    fontColor: string;
    grayBackGround: string;
    HeaderFont: string;
    BodyFont: string;
    mainContentWidth: string;
  }
}