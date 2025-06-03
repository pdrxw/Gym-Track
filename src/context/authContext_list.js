import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { themes } from '../global/themes';
import { Modalize } from 'react-native-modalize';
import { LinearGradient } from 'react-native-svg';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContextList = createContext();

// Configurações de pontos
const POINTS_CONFIG = {
  FIXED_TASK: 20,
  CUSTOM_TASK: 10,
  DAILY_LIMIT: 100
};

export default function Font() {
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    });

    if (!fontsLoaded) {
        return(
            <LinearGradient 
            style={style.container} 
            colors={[themes.colors.black, themes.colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        </LinearGradient>
        );
    }
}

export const AuthProviderList = ({ children }) => {
    // Estados para autenticação
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Refs e estados existentes
    const addTaskModalRef = useRef(null);
    const optionsModalRef = useRef(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        flag: 'Saúde',
        color: '#2D9CDB'
    });
    const [modalMode, setModalMode] = useState('predefined');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);
    const [dailyPoints, setDailyPoints] = useState(0);

    // Dados estáticos
    const flagOptions = [
        { label: 'Saúde', value: 'Saúde', color: '#2D9CDB' },
        { label: 'Exercício', value: 'Exercício', color: '#EB5757' },
        { label: 'Alimentação', value: 'Alimentação', color: '#F2994A' },
        { label: 'Recuperação', value: 'Recuperação', color: '#9B51E0' },
        { label: 'Mobilidade', value: 'Mobilidade', color: '#27AE60' },
        { label: 'Atividade', value: 'Atividade', color: '#F2C94C' }
    ];

    const predefinedTasks = [
        {
            title: 'Hidratar-se',
            description: 'Meta diária de hidratação.',
            flag: 'Saúde',
            color: '#2D9CDB',
            isPredefined: true
        },
        {
            title: 'Treinar',
            description: 'Treinar grupo muscular do dia.',
            flag: 'Exercício',
            color: '#EB5757', 
            isPredefined: true
        },
        {
            title: 'Alimentação saudável',
            description: 'Siga sua dieta e se alimente bem.',
            flag: 'Alimentação',
            color: '#F2994A',
            isPredefined: true
        },
        {
            title: 'Cardio',
            description: 'Melhore seu condicionamento físico.',
            flag: 'Atividade',
            color: '#F2C94C',
            isPredefined: true
        },
        {
            title: 'Sono de qualidade',
            description: 'Priorize o descanso na sua rotina.',
            flag: 'Recuperação',
            color: '#9B51E0',
            isPredefined: true
        }
    ];

    // Carrega todos os pontos
    const loadPoints = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const savedTotal = await AsyncStorage.getItem('@totalPoints');
            const savedDaily = await AsyncStorage.getItem(`@dailyPoints_${today}`);
            
            setTotalPoints(savedTotal ? parseInt(savedTotal) : 0);
            setDailyPoints(savedDaily ? parseInt(savedDaily) : 0);
        } catch (error) {
            console.error('Erro ao carregar pontos:', error);
        }
    };

    // Função para atualizar pontos totais
    const updateTotalPoints = async (newPoints) => {
        try {
            setTotalPoints(newPoints);
            await AsyncStorage.setItem('@totalPoints', newPoints.toString());
        } catch (error) {
            console.error('Erro ao atualizar pontos totais:', error);
        }
    };

    // Verifica se passou da meia-noite e reseta dailyPoints
    const checkAndResetDailyPoints = async () => {
        try {
            const lastReset = await AsyncStorage.getItem('@lastResetTime');
            const now = new Date();
            let shouldReset = false;

            if (!lastReset) {
                shouldReset = true;
            } else {
                const lastResetDate = new Date(lastReset);
                const nextResetDate = new Date(lastResetDate);
                nextResetDate.setDate(nextResetDate.getDate() + 1);
                nextResetDate.setHours(0, 0, 0, 0);

                if (now >= nextResetDate) {
                    shouldReset = true;
                }
            }

            if (shouldReset) {
                const today = now.toISOString().split('T')[0];
                await AsyncStorage.setItem(`@dailyPoints_${today}`, '0');
                setDailyPoints(0);
                await AsyncStorage.setItem('@lastResetTime', now.toISOString());
            }
        } catch (error) {
            console.error('Erro ao resetar pontos diários:', error);
        }
    };

    // Verificar autenticação ao iniciar
    useEffect(() => {
        async function loadStorageData() {
            const storedUser = await AsyncStorage.getItem('@AuthData:user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        }
        loadStorageData();
        loadTasks();
        loadPoints();
        checkAndResetDailyPoints();
    }, []);

    // Funções de autenticação
    const signIn = async (userData) => {
        setUser(userData);
        await AsyncStorage.setItem('@AuthData:user', JSON.stringify(userData));
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('@AuthData:user');
        setUser(null);
    };

    // Funções existentes
    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('@tasks');
            if (savedTasks) setTasks(JSON.parse(savedTasks));
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
    };

    const onOpen = (mode = 'predefined') => {
        setModalMode(mode);
        addTaskModalRef.current?.open();
    };

    const handleTaskPress = (task) => {
        setSelectedTask(task);
        optionsModalRef.current?.open();
    };

    const toggleTaskCompletion = async (task) => {
        // Apenas marca como concluída se não estiver concluída ainda
        if (!task.completed) {
            try {
                const today = new Date().toISOString().split('T')[0];
                const pointsValue = task.isPredefined ? POINTS_CONFIG.FIXED_TASK : POINTS_CONFIG.CUSTOM_TASK;

                // Verifica se pode adicionar pontos
                if (dailyPoints < POINTS_CONFIG.DAILY_LIMIT) {
                    const newDailyPoints = dailyPoints + pointsValue;
                    const newTotalPoints = totalPoints + pointsValue;
                    
                    await AsyncStorage.setItem(`@dailyPoints_${today}`, newDailyPoints.toString());
                    await AsyncStorage.setItem('@totalPoints', newTotalPoints.toString());
                    
                    setDailyPoints(newDailyPoints);
                    setTotalPoints(newTotalPoints);
                }

                // Atualiza a tarefa
                const updatedTasks = tasks.map(t => 
                    t.item === task.item ? { ...t, completed: true } : t
                );
                setTasks(updatedTasks);
                await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
            } catch (error) {
                console.error('Erro ao atualizar tarefa e pontos:', error);
            }
        }
    };

    const handleDeleteTask = async (task) => {
        const updatedTasks = tasks.filter(t => t.item !== task.item);
        setTasks(updatedTasks);
        await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
    };

    const handleAddPredefinedTask = (task) => {
        if (tasks.some(t => t.title === task.title && t.isPredefined)) {
            setShowDuplicateWarning(true);
            setTimeout(() => setShowDuplicateWarning(false), 3000);
            return;
        }

        const newTaskItem = {
            item: Date.now(),
            ...task,
            completed: false,
            isPredefined: true
        };
        
        const updatedTasks = [...tasks, newTaskItem];
        setTasks(updatedTasks);
        AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
        addTaskModalRef.current?.close();
    };

    const handleAddCustomTask = () => {
        if (!newTask.title.trim()) return;
        
        const task = {
            item: Date.now(),
            title: newTask.title,
            description: newTask.description,
            flag: newTask.flag,
            color: flagOptions.find(f => f.value === newTask.flag)?.color || '#2D9CDB',
            completed: false,
            isPredefined: false
        };
        
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
        setNewTask({ title: '', description: '', flag: 'Saúde', color: '#2D9CDB' });
        addTaskModalRef.current?.close();
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthContextList.Provider value={{ 
            signed: !!user,
            user,
            loading,
            signIn,
            signOut,
            tasks: filteredTasks,
            setTasks,
            onOpen,
            handleTaskPress,
            searchTerm,
            setSearchTerm,
            loadTasks,
            totalPoints,
            dailyPoints,
            POINTS_CONFIG,
            updateTotalPoints // Adicionando a nova função ao contexto
        }}>
            {children}

            {/* Modal de OPÇÕES */}
            <Modalize 
                ref={optionsModalRef}
                modalHeight={250}
                handlePosition="inside"
                overlayStyle={styles.modalOverlay}
                modalStyle={{
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingHorizontal: 15,
                }}
            >
                <View style={styles.optionsModalContent}>
                {selectedTask && (
    <>
        <Text style={styles.optionsModalTitle}>{selectedTask.title}</Text>
        
        <TouchableOpacity 
            style={[
                styles.modalOption,
                selectedTask.completed && styles.completedOption
            ]}
            onPress={() => {
                toggleTaskCompletion(selectedTask);
                optionsModalRef.current?.close();
            }}
            disabled={selectedTask.completed}
        >
            <Text style={styles.modalOptionText}>
                {selectedTask.completed ? 'Atividade Concluída' : 'Concluir Atividade'}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.modalOption, styles.deleteOption]}
            onPress={() => {
                handleDeleteTask(selectedTask);
                optionsModalRef.current?.close();
            }}
        >
            <Text style={styles.deleteText}>Remover Tarefa</Text>
        </TouchableOpacity>
    </>
)}
                </View>
            </Modalize>

            {/* Modal de ADICIONAR TAREFA */}
            <Modalize 
                ref={addTaskModalRef}
                modalHeight={Dimensions.get('window').height * 0.75}
                handlePosition="inside"
                overlayStyle={styles.modalOverlay}
                modalStyle={{
                    backgroundColor: themes.colors.primary,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingHorizontal: 15,
                }}
            >
                <View style={styles.addTaskModalContent}>
                    {showDuplicateWarning && (
                        <View style={styles.warningBox}>
                            <Text style={styles.warningText}>Esta tarefa já existe na sua lista!</Text>
                        </View>
                    )}

                    {modalMode === 'predefined' ? (
                        <>
                            <Text style={styles.addTaskModalTitle}>Escolha uma Tarefa</Text>
                            <View style={styles.predefinedTasksContainer}>
                                {predefinedTasks.map((task, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.predefinedTask}
                                        onPress={() => handleAddPredefinedTask(task)}
                                    >
                                        <View style={[styles.flagPreview, { backgroundColor: task.color }]} />
                                        <Text style={styles.predefinedTaskTitle}>{task.title}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    style={styles.customTaskButton}
                                    onPress={() => setModalMode('custom')}
                                >
                                    <Text style={styles.customTaskButtonText}>Adicionar Tarefa Personalizada</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.addTaskModalTitle}>Criar Tarefa Personalizada</Text>
                            
                            <TextInput
                                style={styles.input}
                                placeholder="Título da tarefa"
                                placeholderTextColor={themes.colors.gray}
                                value={newTask.title}
                                onChangeText={(text) => setNewTask({...newTask, title: text})}
                            />
                            
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                placeholder="Descrição (opcional)"
                                placeholderTextColor={themes.colors.gray}
                                multiline
                                value={newTask.description}
                                onChangeText={(text) => setNewTask({...newTask, description: text})}
                            />
                            
                            <Text style={styles.sectionTitle}>Categoria:</Text>
                            <View style={styles.flagContainer}>
                                {flagOptions.map((flag) => (
                                    <TouchableOpacity
                                        key={flag.value}
                                        style={[
                                            styles.flagButton,
                                            { backgroundColor: flag.color },
                                            newTask.flag === flag.value && styles.selectedFlag
                                        ]}
                                        onPress={() => setNewTask({...newTask, flag: flag.value})}
                                    >
                                        <Text style={styles.flagText}>{flag.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            
                            <TouchableOpacity
                                style={[styles.addButton, !newTask.title.trim() && styles.addButtonDisabled]}
                                onPress={handleAddCustomTask}
                                disabled={!newTask.title.trim()}
                            >
                                <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modalize>
        </AuthContextList.Provider>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    optionsModalContent: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: themes.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: Dimensions.get('window').height * 0.268,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    },
    optionsModalTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 20,
        textAlign: 'center',
        color: themes.colors.white,
    },
    modalOption: {
        backgroundColor: themes.colors.secondary,
        width: '65%',
        padding: 15,
        borderRadius: 30,
        borderBottomWidth: 1,
        borderBottomColor: themes.colors.darkgray,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        marginBottom: 10,
    },
    modalOptionText: {
        color: themes.colors.white,
        fontFamily: 'Montserrat_700Bold',
    },
    deleteOption: {
        backgroundColor: themes.colors.exercise
    },
    deleteText: {
        color: themes.colors.white,
        fontFamily: 'Montserrat_700Bold',
    },
    addTaskModalContent: {
        padding: 25,
        paddingBottom: 40,
        backgroundColor: themes.colors.primary
    },
    addTaskModalTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 25,
        textAlign: 'center',
        color: themes.colors.white
    },
    warningBox: {
        backgroundColor: '#EB5757',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    warningText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    predefinedTasksContainer: {
        marginBottom: 20
    },
    predefinedTask: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: themes.colors.veryblack,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: themes.colors.black
    },
    flagPreview: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12
    },
    predefinedTaskTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: themes.colors.white
    },
    customTaskButton: {
        padding: 16,
        backgroundColor: themes.colors.secondary,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    },
    customTaskButtonText: {
        color: themes.colors.white,
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold'
    },
    input: {
        borderWidth: 1,
        borderColor: themes.colors.veryblack,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        color: themes.colors.white,
        fontFamily: 'Montserrat_400Regular',
        backgroundColor: themes.colors.black
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 15,
        color: themes.colors.white
    },
    flagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
        gap: 10
    },
    flagButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    selectedFlag: {
        borderWidth: 2,
        borderColor: themes.colors.white
    },
    flagText: {
        color: 'white',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 13
    },
    addButton: {
        backgroundColor: '#00b853',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    },
    addButtonDisabled: {
        opacity: 0.5
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    completedOption: {
        backgroundColor: themes.colors.gray,
    },
});

export const useAuthList = () => useContext(AuthContextList);