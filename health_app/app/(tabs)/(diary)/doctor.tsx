import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ExpoRouter } from 'expo-router/types/expo-router'
import { getAllBots } from '@/services/botServices'
import { getChatLatest } from '@/services/chatServices'
import { formatDate } from '@/utils/helper'
export default function DoctorScreen() {
  const [bots, setBots] = useState([])
  const [message, setMessage] = useState([])
  const [error, setError] = useState('')
  const [selectedBot, setSelectedBot] = useState(null)
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const botsData = await getAllBots()
        setBots(botsData.data)
        setSelectedBot(botsData.data[0])
      } catch (err: any) {
        setError(err.message)
      }
    }
    const fetchLatestChat = async () => {
      try {
        const chatData = await getChatLatest()
        setMessage(chatData.data)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchBots()
    fetchLatestChat()
  }, [])

  const handleNavigate = (location: ExpoRouter.Href) => {
    router.push(location)
  }

  const isDisableBtn = selectedBot == null
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.questionText}>Bạn có câu hỏi nào cho {selectedBot&&selectedBot.name} bác sĩ không?</Text>
            <TouchableOpacity
              style={[styles.button, isDisableBtn&&styles.disabledButton]}
              onPress={() => handleNavigate(`chat?botId=${selectedBot?._id}`)}
              disabled={selectedBot == null ? true : false}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                color="black"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Đặt câu hỏi</Text>
            </TouchableOpacity>
        </View>
        <Image
          resizeMode="cover"
          source={{
            uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC',
          }}
          style={styles.doctorImage}
        />
      </View>
      <View style={styles.specialityContainer}>
        <Text style={styles.sectionTitle}>Bác sĩ chuyên khoa</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.specialityList}>
        {bots &&
          bots.length > 0 &&
          bots.map((bot, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedBot(bot)}>
              <View style={styles.specialityItem}>
                <Image source={{ uri: bot.icon }} style={styles.specialityImage} />
                <Text style={[styles.specialityText, selectedBot && selectedBot._id == bot._id && styles.activeBot]}>{bot.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Lịch sử</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {message &&
        message.length > 0 &&
        message.map((item, index) => {
          return (
            <TouchableOpacity key={item._id} style={styles.historyItem} 
            onPress={()=> handleNavigate(`chat?botId=${item?.botId}`)}
            >
              <Image
                source={{
                  uri: item?.icon || 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC',
                }}
                style={styles.historyImage}
              />
              <View style={styles.historyTextContainer}>
                <Text numberOfLines={4} ellipsizeMode="tail" style={styles.historyText}>
                  {item.message}
                </Text>
                <Text style={styles.historySubText}>{item?.user?.name}</Text>
                <Text style={styles.historySubText}>{formatDate(item.createdAt)}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 18,
    width: 20,
    height: 20,
    marginRight: 16,
  },

  backArrow: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  credits: {
    fontSize: 16,
    marginLeft: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  specialityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 16,
    color: '#00796b',
  },
  specialityList: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  specialityItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  specialityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  specialityText: {
    fontSize: 14,
    textAlign: 'center',
  },
  historyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  historyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  historyTextContainer: {
    flex: 1,
  },
  historyText: {
    fontSize: 16,
  },
  historySubText: {
    fontSize: 14,
    color: '#757575',
  },
  disabledButton: {
    backgroundColor: '#757575',
  },
  activeBot: {
    color: '#00796b',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})
