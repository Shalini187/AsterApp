import { createContext } from "react";
import ThemeProvider from "./themeProvider";
import BottomUpRawSheet from "./bottomSheet";
import WrapperContainer from "./wrapperComponent";
import CircularProgress from "./circularProgress";
import ShimmerEffect from "./shimmerEffect";
import SystemSearch from './search';
import MovieList from "./movieCards";
import HeaderBar from "./header";
import Loader from "./loader";

const AuthContext = createContext({});
export { ShimmerEffect, CircularProgress, MovieList, BottomUpRawSheet, Loader, AuthContext, HeaderBar, SystemSearch, ThemeProvider, WrapperContainer };