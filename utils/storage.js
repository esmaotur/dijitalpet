import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@digital_pet_data';

export const initialPetData = {
    name: 'Mimi',
    hunger: 50,
    happiness: 50,
    energy: 100,
    coins: 0,
    xp: 0,
    level: 1,
    streak: 0,
    lastLogin: new Date().toISOString(),
    mood: 'neutral',
    achievements: [],
    dailyTasks: [
        { id: 1, title: 'Hayvanını besle', completed: false },
        { id: 2, title: 'Hayvanınla oyna', completed: false },
        { id: 3, title: 'Bugün giriş yap', completed: false },
    ],
};

// Get the pet data from storage
export const loadPetData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : initialPetData;
    } catch (e) {
        console.error('Failed to load pet data', e);
        return initialPetData;
    }
};

// Save the pet data to storage
export const savePetData = async (data) => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save pet data', e);
    }
};

// Reset pet data
export const resetPetData = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return initialPetData;
    } catch (e) {
        console.error('Failed to reset pet data', e);
        return initialPetData;
    }
};
