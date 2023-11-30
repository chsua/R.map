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
