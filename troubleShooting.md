### msw 설치\_#3_2023.11.30

1. 11월 초 msw가 2버전으로 업그레이드된 것으로 보임
   - 이로 인해 기존 사용방식과 다른 부분이 많았고, 에러가 발생함에도 불구하고 자료가 굉장히 부족했음
     - `Module not found: Package path ./browser is not exported from package /Users/susu/workspace/personal_project/R.map/node_modules/msw (see exports field in /Users/susu/workspace/personal_project/R.map/node_modules/msw/package.json)`
     - 정확하지 않으나 worker.js `import { setupWorker } from 'msw/browser';`에서 /browser을 찾지 못했던 것으로 기억
     - 업데이트 후 관련 [문의이슈](https://github.com/mswjs/msw/issues/1801)가 생겼으나 next.js에도 익숙하지 않아 해결방법을 이해하지 못함
   - 결국 일단 낮은 버전으로 다운그레이드
2. 다운그레이드 후 예전 버전에 맞게 문법을 수정하였으나 setupWorker를 찾지 못하는 에러 발생
   - `Error: [MSW] Failed to execute "setupWorker" in a non-browser environment. Consider using "setupServer" for Node.js environment instead.`
   - 관련 자료가 너무 부족.. 그나마 찾은 자료는 [나와 동일한 문제를 겪는 사람이 올려놓은 이슈](https://github.com/mswjs/msw/discussions/873)가 있는데 나는 jest를 사용하지 않는데 이렇게 나와서 무엇이 문제인지 모르겠었음. 결론적으로는 브라우저에서 사용하지 않아서 나는 오류 같았음.
   - 찾아보니 브라우저에서 사용되는 것이 setupWorker이고, 브라우저 외에서 사용하려면 setupServer인거 같은데 next.js에선 "use client"를 작성하지 않으면 server element로 인식되기 때문에 워커사용처가 브라우저가 아니라고 판단되는 것으로 추측.
   - 그래서 워커 상단에 "use client"를 작성하자 해당 오류는 사라짐
3. 다른 오류 발생.
   - `Error: Attempted to call start() from the server but start is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.`
   - 기존엔 Root layout에 워커 조건문을 위치. 이 경우 "use client"를 상위에 적었을때 해당 에러가 사라짐
   - 때문에 사용하는 client component에서 워커를 키는 것이 나은 방법이라고 생각이 듦

<br/>

### tailWind 사용\_#4, #5_2023.12.05

1. tailwind의 동적사용

   - props로 숫자를 내려 받아 이를 tailwind에 바로 넣고자 했음. 하지만 다른 속성은 적용됨에 반해 w, h는 적용이 되지 않았음
     - 당시 코드: `...w-${width} h-${height}`
   - 알고보니 동적으로 값을 집어넣는 수정 전 방식은 tailwind가 인식할 수 없다고 한다. 이는 tailwind공식문서에 아래와 같이 나와있다.
     > 임의의 값을 사용할 때에도 제거 가능한 HTML을 작성 해야 하며 클래스를 Tailwind가 올바르게 감지하려면 완전한 문자열로 존재해야 합니다. (...) Tailwind에는 어떤 종류의 클라이언트 측 런타임도 포함되지 않으므로 클래스 이름은 빌드 시 정적으로 추출 가능해야 하며 클라이언트에서 변경되는 모든 종류의 임의 동적 값에 의존할 수 없습니다. [출처](https://v2.tailwindcss.com/docs/just-in-time-mode)
     - 수정코드: `(className을 value로 가지는 heightStyle객체 존재) ...${heightStyle[size]}`
   - 결론적으로 다른 자료들을 합해 이해하기론 최적화를 위해 사용하는 css속성만 빌드 파일에 포함하는데, 이를 `w-${width}`와 같은 방식으로 표현한다면 해당 내용을 추출할 수 없다. 때문에 완전한 className을 작성해야 하는 것으로 보인다. 여담으로 className을 확인하는 과정에서 className만을 확인하는 것은 아니고 JS파일을 모두 정규식으로 훑는다는 이야기가 있다.

2. 반응형 md: 적용안됨
   - 반응형을 사용하기 위해서 `md: w-[90%]` 이런 방식으로 className을 설정해주면 된다. 하지만 해당 방법이 적용되지 않았고, 결과적으로 명쾌하게 해답을 찾은 것은 아니지만 원인을 추론할 수는 있었다.
   - 초기 세팅을 하면서 `tailwind.config.ts` 파일에 반응형 웹 범위를 설정하는 코드를 넣었다. tailwind에서는 반응형 웹을 기본으로 지원(자체 중단점 기준을 가짐)해주고 있는데, 이를 커스텀하기 위해선 위 파일에 코드를 작성하면 되었다. 나는 이 사실을 모르고 설치를 하다가 해당 설정도 해버린 것이었다. 몇 시간을 해매다가 "혹시..." 하고 해당 코드를 지우고 다른 이런 저런 시도를 하다보니 어느새 반응형 웹이 적용되었다.
   - 때문에 원인이 커스텀 설정 때문인지는 모르겠지만 아마 맞을 것으로 추측된다...
