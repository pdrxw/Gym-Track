import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, Alert, Image, StyleSheet } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthList } from '../../context/authContext_list';
import style from './styles';
import { themes } from '../../global/themes';
import { auth, db } from '../../services/firebase.config';
import { doc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
        return 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
};

export default function Home() {
    const { 
        tasks, 
        setTasks, 
        onOpen, 
        handleTaskPress, 
        searchTerm, 
        setSearchTerm, 
        loadTasks,
        totalPoints,
        dailyPoints,
        POINTS_CONFIG,
        updateTotalPoints,
        loadPoints
    } = useAuthList();
    
    const [completedTasks, setCompletedTasks] = useState(0);
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    });
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setCompletedTasks(tasks.filter(task => task.completed).length);
    }, [tasks]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const onRedeem = async (product) => {
        try {
            // Extrai o valor numérico do preço (remove " pontos")
            const pointsRequired = parseInt(product.price.replace(/\D/g, ''));
    
            if (totalPoints < pointsRequired) {
                alert(`Você precisa de ${pointsRequired} pontos para resgatar este produto. Você tem ${totalPoints} pontos.`);
                return;
            }
    
            // Calcula os novos pontos
            const newTotalPoints = totalPoints - pointsRequired;
            
            // Atualiza os pontos usando a função do contexto
            await updateTotalPoints(newTotalPoints);
    
            // Registra o resgate no Firestore (opcional)
            if (auth.currentUser) {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    redeemedProducts: arrayUnion({
                        productId: product.id,
                        name: product.name,
                        date: new Date().toISOString(),
                        pointsUsed: pointsRequired
                    })
                });
            }
    
            // Recarrega os pontos para garantir sincronização
            
            alert(`Parabéns, você resgatou o cupom ${product.redeem} para usar no site do(a) ${product.name}! Seu novo saldo de pontos é ${newTotalPoints}.`);
            await loadPoints();
        } catch (error) {
            // alert('Ocorreu um erro ao processar seu resgate. Por favor, tente novamente.');
        }
    };

    const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    // Dados dos produtos parceiros
    const partnerProducts = [
        {
            id: 1,
            name: 'Growth',
            description: 'Cupom de 10% de desconto',
            price: '2.000 pontos',
            redeem: 'GYMTRACK10',
            image: require('../../../assets/growth.png')
        },
        {
            id: 2,
            name: 'Insider',
            description: '15% de cashback na primeira compra',
            price: '3.000 pontos',
            redeem: 'INSIDER15',
            image: require('../../../assets/insider.png')
        },
        {
            id: 3,
            name: 'Netshoes',
            description: 'Cupom de 5% de desconto',
            price: '1.000 pontos',
            redeem: 'NETSHOES5',
            image: require('../../../assets/netshoes.png')
        },
        {
            id: 4,
            name: 'Liv Up',
            description: '25% de desconto na primeira compra',
            price: '6.000 pontos',
            redeem: 'LIVUP25',
            image: require('../../../assets/livup.png')
        }
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[style.card, item.completed && style.completedCard]}
            onPress={() => handleTaskPress(item)} 
            activeOpacity={0.7}
        >
            <View style={style.rowCard}>
                <View style={style.rowCardLeft}>
                    <View style={[style.ball, { backgroundColor: item.color }, item.completed && style.completedBall]} />
                    <Text style={[style.cardTitle, item.completed && style.completedText]}>{item.title}</Text>
                </View>
                <View style={[style.flagCard, { backgroundColor: item.color }, item.completed && style.completedFlag]}>
                    <Text style={style.flagText}>{item.flag}</Text>
                </View>
            </View>
            <Text style={[style.cardDescription, item.completed && style.completedText]}>{item.description}</Text>
            {item.completed && (
                <Text style={{
                    color: dailyPoints >= POINTS_CONFIG.DAILY_LIMIT ? themes.colors.gray : themes.colors.secondary,
                    fontSize: 12,
                    marginTop: 5,
                    fontFamily: 'Montserrat_400Regular',
                    fontStyle: 'italic',
                }}>
                    +{item.isPredefined ? POINTS_CONFIG.FIXED_TASK : POINTS_CONFIG.CUSTOM_TASK} pts
                    {dailyPoints >= POINTS_CONFIG.DAILY_LIMIT && ' (limite diário atingido)'}
                </Text>
            )}
        </TouchableOpacity>
    );

    // Renderiza o footer com os produtos parceiros
    const ListFooterComponent = () => (
        <View style={style.partnerSection}>
            <Text style={style.sectionTitle}>Produtos Parceiros</Text>
            <View style={style.productsGrid}>
                {partnerProducts.map((product) => (
                    <View key={product.id} style={style.productContainer}>
                        <View style={style.productItem}>
                            <Image source={product.image} style={style.productImage} />
                            <Text style={style.productName}>{product.name}</Text>
                            <Text style={style.productDescription}>{product.description}</Text>
                            <View style={style.productPriceContainer}>
                            <MaterialCommunityIcons name="trophy-variant" size={20} color={themes.colors.activity}/>
                            <Text style={style.productPrice}>{product.price}</Text>
                            </View>
                            <TouchableOpacity style={style.buyButton} onPress={() => onRedeem(product)}>
                                <Text style={style.buyButtonText}>Resgatar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    if (!fontsLoaded || !userData) {
        return (
            <LinearGradient 
                style={style.container} 
                colors={[themes.colors.black, themes.colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
        );
    }

    return (
        <LinearGradient 
            style={style.container} 
            colors={[themes.colors.black, themes.colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={style.header}>
                <Text style={style.greeting}>{getGreeting()}, {userData?.name || 'Usuário'}!</Text>

                <View style={style.boxInput}>
                    <MaterialIcons name="search" size={24} color={themes.colors.gray} />
                    <TextInput 
                        style={style.input}
                        placeholder="Pesquisar"
                        placeholderTextColor={themes.colors.darkgray}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
            </View>
            
            <View style={style.content}>
                <View style={style.progressContainer}>
                    <Text style={style.sectionTitle}>Metas Diárias</Text>
                    <Text style={style.progressText}>
                        {completedTasks} de {tasks.length} concluídas ({Math.round(progressPercentage)}%)
                    </Text>
                    
                    {/* Barra de progresso */}
                    <View style={style.progressBar}>
                        <View style={[style.progressFill, { width: `${progressPercentage}%` }]} />
                    </View>
                    
                    {/* Pontos diários */}
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text style={{color: themes.colors.gray, fontSize: 15, fontFamily: 'Montserrat_400Regular'}}>
                            Pontos diários: 
                        </Text>
                        <View style={{
                            backgroundColor: themes.colors.secondary,
                            borderRadius: 10,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            marginLeft: 4
                        }}>
                            <Text style={{color: themes.colors.white, fontWeight: 'bold', fontSize: 13, fontFamily: 'Montserrat_700Bold'}}>
                                {dailyPoints}/{POINTS_CONFIG.DAILY_LIMIT}
                            </Text>
                        </View>
                    </View>
                    
                    {/* Pontos totais */}
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Text style={{color: themes.colors.gray, fontSize: 15, fontFamily: 'Montserrat_400Regular'}}>
                            Pontos: 
                        </Text>
                        <View style={{
                            backgroundColor: themes.colors.secondary,
                            borderRadius: 10,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            marginLeft: 4
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="trophy-variant" size={13} color={themes.colors.activity}/>
                            <Text style={{color: themes.colors.white, fontWeight: 'bold', fontSize: 13, fontFamily: 'Montserrat_700Bold', marginLeft: 4}}>
                                {totalPoints}
                            </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={tasks}
                    style={style.list}
                    contentContainerStyle={style.listContent}
                    keyExtractor={(item) => item.item.toString()}
                    renderItem={renderItem}
                    ListFooterComponent={ListFooterComponent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <TouchableOpacity 
                style={style.addButton}
                onPress={() => onOpen('predefined')}
                activeOpacity={0.8}
            >
                <Text style={style.addButtonText}>+</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}