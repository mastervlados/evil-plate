import { StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        width: 280,
        marginLeft: 'auto',
        marginRight: 'auto',
        // borderWidth: 3,
    },
    tabsRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    commonBox: {
        width: 80,
        height: 60,
        borderWidth: 3,
        borderColor: Theme.base,
    },
    itemFirst: {
        backgroundColor: Theme.itemFirst,
    },
    itemSecond: {
        backgroundColor: Theme.itemSecond,
    },
    itemThird: {
        backgroundColor: Theme.itemThird,
    },
    itemFourth: {
        backgroundColor: Theme.itemFourth,
    },
    itemFifth: {
        backgroundColor: Theme.itemFifth,
    },
    itemSixth: {
        backgroundColor: Theme.itemSixth,
    },
    itemSeventh: {
        backgroundColor: Theme.itemSeventh,
    },
    itemEight: {
        backgroundColor: Theme.itemEight,
    },
    itemNinth: {
        backgroundColor: Theme.itemNinth,
    },
    defaultStyles: {
        opacity: 0.1,
        borderRadius: 10,
    },
    activeStyles: {
        opacity: 1,
        borderRadius: 20,
    },
})