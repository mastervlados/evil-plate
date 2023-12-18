import { 
    themeBase, 
    themeLevelOne, 
    themeTextCommon 
} from '../styles/generalStyles/theme'

const headerStyles = {
    headerStyle: {
        height: 88,
        backgroundColor: themeLevelOne,
    },
    headerTitleStyle: {
        color: themeTextCommon,
        fontWeight: 400,
        fontFamily: 'roboto-regular',
        fontSize: 20,
    },
    headerTintColor: themeTextCommon,
}

const drawerStyles = {
    ...headerStyles,
    drawerStyle: {
        backgroundColor: themeLevelOne,
        paddingTop: 60,
    },
    drawerActiveBackgroundColor: themeBase,
    drawerActiveTintColor: themeTextCommon,
    drawerLabelStyle: {
        color: themeTextCommon,
        fontFamily: 'roboto-regular',
        fontWeight: 400,
        fontSize: 14,
    },
}

export {
    headerStyles,
    drawerStyles,
}
