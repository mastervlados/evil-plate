import { View, Text, Modal, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from './style'
import OnboardingItem from './OnboardingItem'
import slides from './slides'
import Paginator from './Paginator'
import Pagination from './Pagination'


export default function Onboarding() {

    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const slidesRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const scrollPrev = () => {
        if (currentIndex > 0) {
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    }

    const scrollNext = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    }

    return (
        <Modal visible={true} animationType='none'>
            <View style={styles.container}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem slide={item} currentIndex={currentIndex}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
                <View style={styles.footerContainer}>
                    <Paginator scrollX={scrollX} />
                    <Pagination currentIndex={currentIndex} prevHandler={scrollPrev} nextHandler={scrollNext}/>
                </View>
            </View>
        </Modal>
    )
}