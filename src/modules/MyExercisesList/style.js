import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    headerContainer: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },
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
        // paddingVertical: 30,
        width: Dimensions.get('window').width - 40,
    },
    flatListPosition: {
        flex: 1,
        width: Dimensions.get('window').width - 40,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // marginBottom: 17,
        // borderTopWidth: 3,
        // borderBottomWidth: 3,
    }
})