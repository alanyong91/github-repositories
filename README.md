# Github Repositories

To run this application:

1. Clone `.env.example` to `.env`
  ```
  cp .env.example .env
  ```
2. Run `yarn` or `npm install` to install dependencies
3. Run `yarn start` to run the application
4. Run `yarn test:dev` to run the test


## React lifecycle

A React component shall print DOM from `return` once it renders. Next, it will initialize all functions in `useEffect` or `componentDidMount` if class component. If one of the values in second parameter of `useEffect` is updated, it will trigger again all functions in `useEffect` and re-render the compoonent (aka `componentDidUpdate`). Lastly, a React component should unmount by returns a function in `useEffect` before remove from DOM.


## Redux

Redux is one of most used state management in React application. While `useState` is state management inside one component, Redux can manage state values across all components.

Tips: React Context + useReducer can create similar function like Redux.


## Unit Testing

It getting common and essential to have unit tests in most of the application. A high percentage of code coverage from unit test gives developers, even product team have more confidence to deploy an application to production. The purpose of unit test is to test and make sure a piece of standalone function is run and return correctly with expected result.