import { Theme } from "../styles"

const headerStyles = {
    headerStyle: {
        height: 88,
        backgroundColor: Theme.levelOne,
    },
    headerTitleStyle: {
        color: Theme.textCommon,
        fontWeight: 400,
        fontFamily: 'roboto-regular',
        fontSize: 20,
    },
    headerTintColor: Theme.textCommon,
}

const drawerStyles = {
    ...headerStyles,
    drawerStyle: {
        backgroundColor: Theme.levelOne,
        paddingTop: 60,
    },
    drawerActiveBackgroundColor: Theme.base,
    drawerActiveTintColor: Theme.textCommon,
    drawerLabelStyle: {
        color: Theme.textCommon,
        fontFamily: 'roboto-regular',
        fontWeight: 400,
        fontSize: 14,
    },
}

export {
    headerStyles,
    drawerStyles,
}
