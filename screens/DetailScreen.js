import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Platform } from 'react-native'

import ProgressBar from '../components/ProgressBar';
import { LinearGradient } from 'expo-linear-gradient';

//constants
import { COLORS, FONTS, SIZES, icons } from '../constants'

const DetailScreen = ({ route, navigation }) => {

    const { selectedMovie } = route.params;

    function renderHeader() {
        return (
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    marginTop: Platform.OS === 'ios' ? 40 : 20
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 20,
                            backgroundColor: COLORS.transparentBlack
                        }}
                    >
                        <Image
                            source={icons.left_arrow}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log("Share Pressed")}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50,
                            borderRadius: 20,
                            backgroundColor: COLORS.transparentBlack
                        }}
                    >
                        <Image
                            source={icons.upload}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['transparent', '#000']}
                        style={{
                            width: '100%',
                            height: 120,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{selectedMovie?.details?.season}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.h1, marginTop: SIZES.base }}>{selectedMovie?.name}</Text>
                    </LinearGradient>
                </View>

            </ImageBackground>
        )
    }

    function renderInfos() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: SIZES.padding }}>
                <View style={styles.infoContainer}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{selectedMovie?.details?.age}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{selectedMovie?.details.genre}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Image
                        source={icons.star}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3 }}>{selectedMovie?.details?.ratings}</Text>
                </View>
            </View>
        )
    }

    function renderDetails() {
        return (
            <View style={{ marginTop: SIZES.padding * 1.5, paddingHorizontal: SIZES.padding, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{selectedMovie?.details?.currentEpisode}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>{selectedMovie?.details?.runningTime}</Text>
                </View>
                <ProgressBar
                    containerStyle={{
                        marginTop: SIZES.padding,
                    }}
                    barStyle={{
                        height: 7,
                        borderRadius: 3
                    }}
                    barPercentage={selectedMovie?.details?.progress}
                />
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.primary,
                        marginTop: SIZES.padding,
                        borderRadius: 15,
                        paddingVertical: 15,
                        paddingHorizontal: SIZES.radius
                    }}
                    onPress={() => console.log("Watch Button Pressed")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{selectedMovie?.details?.progress == "0%" ? "START WATCHING" : "CONTINUE WATCHING"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
            {renderHeader()}

            {renderInfos()}

            {renderDetails()}
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.gray1
    }
})

export default DetailScreen
