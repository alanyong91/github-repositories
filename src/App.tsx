import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { store } from "./store";
import theme from "./theme";

import Repositories from "./Repositories";

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <Repositories />
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
