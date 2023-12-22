import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    buttonPosition: {
        marginTop: 20,
        marginBottom: 5, // 17 - 5 = 12
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    body: {
        flex: 1, 
        alignItems: 'center', 
        position: 'relative',
    },
    scrollContainer: {
        flex: 1,
        paddingVertical: 30,
        width: 340,
    },
    flatListPosition: {
        flex: 1,
        width: 340,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // marginBottom: 17,
        // borderTopWidth: 3,
        // borderBottomWidth: 3,
    }
})