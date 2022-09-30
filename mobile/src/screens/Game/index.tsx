import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { Header } from "../../components/Header";
import { DuoMatch } from "../../components/DuoMatch";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

import { GameRouteParams } from "../../@types/navigation";

import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { THEME } from "../../theme";

export function Game() {
  const route = useRoute();
  const game = route.params as GameRouteParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    await fetch(`http://192.168.100.69:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordSelected(data.discord));
  }

  const [duoList, setDuoList] = useState<DuoCardProps[]>([]);
  const [discordSlected, setDiscordSelected] = useState("");

  useEffect(() => {
    fetch(`http://192.168.100.69:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuoList(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Header title={game.title} subtitle="Conecte-se e começe a jogar" />

        <FlatList
          data={duoList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duoList.length > 0 ? styles.contentList : styles.emptyContentList
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há anúncios publicados
            </Text>
          )}
        />

        <DuoMatch
          visible={discordSlected.length > 0}
          discord={discordSlected}
          onClose={() => setDiscordSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
