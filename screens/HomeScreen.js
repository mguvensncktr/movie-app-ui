import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, FlatList, Animated, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profiles from '../components/Profiles';
import ProgressBar from '../components/ProgressBar';

//constants
import { COLORS, SIZES, FONTS, images, icons, dummyData } from '../constants';

const HomeScreen = () => {

    const navigation = useNavigation();
    const newSeasonScrollX = useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: SIZES.padding }}>
                <TouchableOpacity
                    onPress={() => console.log("Profile pressed")}
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={images.profile_photo}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Screen mirror Pressed")}
                >
                    <Image
                        source={icons.airplay}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderNewSeason() {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("Detail", { selectedMovie: item })}
                >
                    <View
                        style={{
                            width: SIZES.width,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ImageBackground
                            source={item.thumbnail}
                            resizeMode="cover"
                            style={{
                                width: SIZES.width * 0.85,
                                height: SIZES.width * 0.90,
                                justifyContent: 'flex-end',
                            }}
                            imageStyle={{ borderRadius: 20 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, marginBottom: SIZES.radius, paddingHorizontal: SIZES.radius }}>
                                {/* Play */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 20,
                                            backgroundColor: COLORS.transparentWhite,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Image
                                            source={icons.play}
                                            resizeMode="contain"
                                            style={{
                                                width: 15,
                                                height: 15,
                                                tintColor: COLORS.white
                                            }}
                                        />
                                    </View>
                                    <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3 }}>Play now</Text>
                                </View>
                                {/* Still watching */}
                                {item.stillWatching.length > 0 &&
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Still watching</Text>
                                        <Profiles
                                            profiles={item.stillWatching}
                                        />
                                    </View>
                                }
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{ marginTop: SIZES.radius }}
                data={dummyData.newSeason}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: newSeasonScrollX
                            }
                        }
                    }
                ], { useNativeDriver: false })}
                renderItem={renderItem}
            />
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {dummyData.newSeason.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [1, 5, 1],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [6, 20, 6],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                        extrapolate: "clamp"
                    })

                    return (
                        <Animated.View
                            opacity={opacity}
                            key={index}
                            style={{
                                width: dotSize,
                                height: 6,
                                borderRadius: SIZES.radius,
                                marginHorizontal: 3,
                                backgroundColor: dotColor
                            }}
                        >

                        </Animated.View>
                    )
                })}
            </View>
        )
    }

    function renderContinueWatching() {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Detail", { selectedMovie: item })}
                >
                    <View style={{
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0
                    }}>
                        <Image
                            source={item.thumbnail}
                            resizeMode="contain"
                            style={{
                                width: SIZES.width / 2 - 50,
                                height: SIZES.width / 2,
                                borderRadius: 25,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{ color: COLORS.white, ...FONTS.h4, marginTop: SIZES.base }}>{item.name}</Text>
                        <ProgressBar
                            containerStyle={{ marginTop: SIZES.radius, marginRight: SIZES.base }}
                            barStyle={{ height: 4 }}
                            barPercentage={item.overallProgress}
                        />
                    </View>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{ marginTop: SIZES.radius }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Continue Watching</Text>
                    <TouchableOpacity
                        onPress={() => console.log("Continue Watching Pressed")}
                    >
                        <Image
                            source={icons.right_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.primary
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {/* List */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    keyExtractor={item => `${item.id}`}
                    data={dummyData.continueWatching}
                    renderItem={renderItem}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {renderNewSeason()}
                {renderDots()}
                {renderContinueWatching()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    }
})

export default HomeScreen
