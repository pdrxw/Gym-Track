import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthList } from '../../context/authContext_list';
import style from './styles';
import { themes } from '../../global/themes';

// Mantido por instrução do usuário
const getGreeting = () => {
    return 'Bom dia'; // Fixo, sem lógica de horário
};

export default function Home() {
    const { tasks, onOpen, handleTaskPress, searchTerm, setSearchTerm } = useAuthList();
    const [completedTasks, setCompletedTasks] = useState(0);
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    });

    useEffect(() => {
        setCompletedTasks(tasks.filter(task => task.completed).length);
    }, [tasks]);

    const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[style.card, item.completed && style.completedCard]}
            onPress={() => handleTaskPress(item)} // Agora abre o Modalize
            activeOpacity={0.7}
        >
            <View style={style.rowCard}>
                <View style={style.rowCardLeft}>
                    <View style={[style.ball, { backgroundColor: item.color }, item.completed && style.completedBall]} />
                    <Text style={[style.cardTitle, item.completed && style.completedText]}>{item.title}</Text>
                    {item.completed && (
                        <MaterialIcons 
                            name="check-circle" 
                            size={18} 
                            color={themes.colors.secondary}
                            style={style.checkIcon}
                        />
                    )}
                </View>
                <View style={[style.flagCard, { backgroundColor: item.color }, item.completed && style.completedFlag]}>
                    <Text style={style.flagText}>{item.flag}</Text>
                </View>
            </View>
            <Text style={[style.cardDescription, item.completed && style.completedText]}>{item.description}</Text>
        </TouchableOpacity>
    );

    if (!fontsLoaded) {
        return null;
    }

    return (
        <LinearGradient 
            style={style.container} 
            colors={[themes.colors.black, themes.colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={style.header}>
                <Text style={style.greeting}>{getGreeting()}, Pedro</Text>

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
                    <View style={style.progressBar}>
                        <View style={[style.progressFill, { width: `${progressPercentage}%` }]} />
                    </View>
                </View>

                <FlatList
                    data={tasks}
                    style={style.list}
                    contentContainerStyle={style.listContent}
                    keyExtractor={(item) => item.item.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <TouchableOpacity 
                style={style.addButton}
                onPress={() => onOpen('predefined')} // Continua abrindo o modal de adicionar tarefas
                activeOpacity={0.8}
            >
                <Text style={style.addButtonText}>+</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}