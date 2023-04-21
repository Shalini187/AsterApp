import { createContext } from "react";
import ThemeProvider from "./themeProvider";
import BottomUpRawSheet from "./bottomSheet";
import WrapperContainer from "./wrapperComponent";
import SystemSearch from './search';
import MovieList from "./movieCards";
import HeaderBar from "./header";
import Loader from "./loader";

const AuthContext = createContext({});
export { MovieList, BottomUpRawSheet, Loader, AuthContext, HeaderBar, SystemSearch, ThemeProvider, WrapperContainer };