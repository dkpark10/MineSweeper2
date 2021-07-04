# 웹렌더링


브라우저는 렌더링엔진을 가지고 있다. 
브라우저가 페이지를 렌더링하려면 DOM , CSSOM트리를 생성해야 한다. 그러므로 HTML, CSS를 가장 빠르게 브라우저에 제공해야함.

HTML 마크업은 DOM으로 변환, CSS 마크업은 CSSOM으로 변환

### DOM

```javascript
 <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
</html> 
```

다음의 코드가 있다. 브라우저는 이를 어찌 처리할까?


![https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png?hl=ko)


1. 변환 : 브라우저가 html 원시 바이트를 디스크나 네트워크에서 읽어오고 해당파일에 지정된 인코딩에 따라 개별문자로 변환

2. 토큰화: 브라우저가 문자열을 W3C HTML5 표준에 지정된 고유토큰으로 변환

3. 렉싱: 방출된 토큰은 해당 속성 및 규칙을 정의하는 '객체'로 변환

4. DOM 생성: HTML 마크업이 여러태크간의 관계를 정의하기 때문에 생성된 객체는 트리구조로 연결  

![https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/dom-tree.png?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/dom-tree.png?hl=ko)


최종 출력이 바로 DOM이며 브라우저는 이후 모든 페이지 처리에 이 DOM을 사용한다.
브라우저는 마크업을 처리할 때 위 단계를 수행 처리해야할 HTML이 많은경우 연산시간이 증가한다.


### CSSOM

브라우저는 DOM을 생성하는 동안 외부 CSS 파일을 참조하는 문서의 링크태크를 접한다. 페이지를 렌더링하는데 이 CSS리소스가 필요하다고 판단한 브라우저는 다음의 결과를 받는다.

```javascript
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right } 
```

html과 마찬가지로 수신된 CSS규칙을 브라우저가 이해하고 처리할 수 있는 형식으로 변환해야 한다. 그러므로 위 HTML과 똑같은 프로세스를 반복한다.

![https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-construction.png?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-construction.png?hl=ko)


CSS바이트가 문자로 변환된 후 토큰과 노드객체로 변환 CSSOM 트리구조가 생성된다.
![https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png?hl=ko)


CSSOM은 왜 트리구조를 갖는가? 페이지에 있는 객체의 최종 스타일을 계산할 때 브라우저는 해당 노드에 적용 가능한 규칙(body 스타일)으로 시작 후 더욱 구체적인 규칙을 적용하는 방식으로 
'재귀'적으로 세분화한다. 

위 이미지를 보면 body요소내 span태그에 포함된 모든 텍스트 크기는 16px이고 색상은 레드다.
font-size 프로퍼티는 재귀적으로 하향식으로 적용되기 때문이다. 