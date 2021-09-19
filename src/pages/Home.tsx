import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(item => item.title === newTaskTitle);

    if(taskAlreadyExists){
      return Alert.alert('Task já encontrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    setTasks([...tasks, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }])
    
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.find(task => task.id === id);
    task && setTasks([...tasks.filter(task => task.id !== id), {...task, done: !task.done}])
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => setTasks([...tasks.filter(task => task.id !== id)])}
    ])
  }

  function handleEditTask(id: number, newTaskTitle: string){
    
    const task = tasks.find(task => task.id === id);
    task && setTasks([...tasks.filter(task => task.id !== id), {...task, title: newTaskTitle}])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask} 
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})