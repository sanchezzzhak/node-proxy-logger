
description
----
this method is intended to display graphs call methods in the form of diagrams https://mermaid.js.org/
for your application

![image](https://github.com/user-attachments/assets/683fe054-dcc7-4f8f-8b50-cec8132fd4b1)


usage
----

For constructor:

```js
import {proxyLogger} from "node-proxy-logger"

export default class ExampleController extends AbstractController {

  logs = [];

  constructor(options) {
    super(options)
    
    return proxyLogger(this, {
      regexExclude: /^(is|get|set|pushlog)/i,
      loopStart: 'Start',
      logMethod: 'pushLog'
    });
  }

  pushLog(message, data, group = 'graph') {
    this.logs.push({message, data, group})
  }
  
  index() {
    return 'hello world'
  }
}
```

For instance object:

```js
import {proxyLogger} from "node-proxy-logger"
const exampleController = new proxyLogger(new ExampleController, {
	
})

exampleController.index();
```

