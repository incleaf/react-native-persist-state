# react-native-persist-state

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/incleaf/react-native-persist-state/Test%20Runner?style=flat-square)
![Codecov](https://img.shields.io/codecov/c/github/incleaf/react-native-persist-state?style=flat-square)
![GitHub](https://img.shields.io/github/license/incleaf/react-native-persist-state?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/incleaf/react-native-persist-state?style=flat-square)
![npm](https://img.shields.io/npm/v/react-native-persist-state?style=flat-square)

✨ Manage persist state with simple API

- Shared state across components using Hook
- Ability to access state outside of components
- Fully tested and written in TypeScript

## API Overview

```ts
// 1. Create a store
const store = createPersisStore<string | null>({
  key: 'authToken',
  initialData: null,
})


// 2. Use the store inside components
function HomeScreen() {
  const [authToken, setAuthToken] = usePersistState(store)
  
  if (authToken == null) {
     return <Login onSucess={setAuthToken} />
  }
  
  return <Home />
}


// 3. Access the store outside of components
function request() {
  ... 
  if (response.statusCode === 401) {
    authTokenStore.remove()
  }
}
```

## Installation

```sh
npm install react-native-persist-state

# Used as peer dependencies
npm install recoil react-native-async-storage/async-storage
```

## Setting Up

```jsx
// Add RecoilRoot and Suspense into your root component

import { RecoilRoot } from "recoil";
import { Suspense } from "react";

function App() {
  return (
    <RecoilRoot>
      <Suspense>
        <MyApp />
      </Suspense>
    </RecoilRoot>
  )
}
```
