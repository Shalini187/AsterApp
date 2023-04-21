import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { logoutHandler, onLoginSuccess } from '../redux/actions/auth';
import { getItem } from '../cache';
import store from '../redux/store';
import types from '../redux/types';

export const isIos = Platform.OS == "ios";

export const checkTheme = () => {
    getItem("Theme").then((res: any) => {
        const { dispatch } = store;
        if (!!res) {
            dispatch({
                type: types.CHANGE_THEME,
                payload: res,
            });
        }
    }).catch((e) => {
        console.log(e);
    });
}

export const unregister = () => {
    const { dispatch } = store;
    auth().onAuthStateChanged((user) => {
        if (user) {
            firestore().collection('users').doc(user?.uid).update({ status: "online" });
            dispatch({
                type: types.LOGIN,
                payload: user,
            });
        }
    })
}

export let signIn = async (form: {}, setLoading: Function) => {
    let { Email: email, Password: password }: any = form;
    setLoading(true);
    try {
        let userCredentials = await auth().signInWithEmailAndPassword(email, password);
        auth().onAuthStateChanged((user) => {
            if (user) {
                firestore().collection('users').doc(user?.uid).update({ status: "online" });
                onLoginSuccess(user);
            }
        })
        setLoading(false)
    } catch (e: any) {
        Alert.alert('The email address or password is invalid!');
        setLoading(false);
    }
}

export let signOut = (user: any) => {
    Alert.alert(
        "Are you Sure ?",
        "you need to Sign Off !",
        [
            {
                text: "YES",
                onPress: () => {
                    firestore()?.collection('users')?.doc(user?.uid)?.update({ status: "offline" });
                    setTimeout(() => {
                        logoutHandler();
                    }, 1000);
                },
                style: 'destructive'
            },
            {
                text: "NO",
                onPress: () => { },
                style: "cancel"
            }
        ]
    )
}

export const getLoginUsers = async (setUsers: Function, user: any) => {
    const querySanp = await firestore().collection('users').where('uid', '==', user?.uid).get();
    const loginUser = querySanp.docs.map((docSnap: any) => docSnap.data());
    setUsers(loginUser);
}

export const titleWords = (str: string | any) => str?.match(/\b(\w)/g);

export const searchOptions = {
    isCaseSensitive: false,
    threshold: 0.3,
    keys: [
        "original_title",
        "title",
        "release_date",
        "vote_count",
        "vote_average",
        "overview"
    ],
};

export const createQueryString = (data: any) => {
    return Object.keys(data)?.map(key => {
        let val = data[key]
        if (val !== null && typeof val === 'object') val = createQueryString(val)
        return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
    }).join('&');
}

export const formatData = (data: any, numColumns: any) => {
    const numberOfFullRows = Math.floor(data?.length / numColumns);

    let numberOfElementsLastRow = data?.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data?.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};