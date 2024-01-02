import { StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    defaultTab: {
        backgroundColor: Theme.levelOne,
        height: 48,
        width: 120,
        borderBottomWidth: 1,
        borderBottomColor: Theme.base,
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.positive,
    },
    defaultTabText: {
        color: Theme.textCommon,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'roboto-medium',
    },
    activeTabText: {
        color: Theme.positive,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'roboto-medium',
    },
})