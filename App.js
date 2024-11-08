import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#007bff',
    },
    questionContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionImage: {
        width: 250,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
        marginBottom: 10,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    nameContainer: {
        marginBottom: 20,
    },
});

const questions = [
    { image: require('./img/elephant.jpg'), correctAnswer: 'Elephant' },
    { image: require('./img/deer.jpg'), correctAnswer: 'Deer' },
    { image: require('./img/giraffe.jpg'), correctAnswer: 'Giraffe' },
];

const MyApp = () => {
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));

    const handleAnswerChange = (value, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        let correctCount = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) correctCount += 1;
        });

        let message = `Well Done! You have ${correctCount} correct ${correctCount === 1 ? 'answer' : 'answers'}.`;
        Alert.alert(message);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Animal Quiz</Text>
            <View style={styles.nameContainer}>
                <Text>User Name:</Text>
                <TextInput style={styles.textInput} onChangeText={setName} value={name} />
            </View>
            <ScrollView>
                {questions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Image source={question.image} style={styles.questionImage} />
                        <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5 }}>
                            <Text style={styles.questionText}>What animal is this?</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => handleAnswerChange(value, index)}
                                items={[
                                    { label: 'Elephant', value: 'Elephant' },
                                    { label: 'Deer', value: 'Deer' },
                                    { label: 'Giraffe', value: 'Giraffe' },
                                ]}
                                style={styles.picker}
                                value={answers[index]}
                            />
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>SUBMIT ANSWER</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default MyApp;
