import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    timerPanelContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    timerDigits: {
        height: 56, 
        lineHeight: 56,
    }
})