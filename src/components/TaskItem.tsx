import React, { useEffect, useRef, useState } from 'react';

import { Image, TouchableOpacity, View, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'
import cancelIcon from '../assets/icons/X.png'

interface TaskProps {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  index: number;
  task: TaskProps;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({index, task, toggleTaskDone, removeTask, editTask} : TaskItemProps){
  const [hasEdit, setHasEdit] = useState(false);
  const [taskEdited, setTaskEdited] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing(){
    setHasEdit(true);
  }

  function handleCancelEditing(){
    setTaskEdited(task.title);
    setHasEdit(false);
  }

  function handleSubmitEditing(){
    editTask(task.id, taskEdited);    
    setHasEdit(false);
  }

  useEffect(() => {
    if(textInputRef.current){
      if(hasEdit){
        textInputRef.current.focus();
      }else{
        textInputRef.current.blur();
      }
    }
  }, [hasEdit])

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={task.done ? styles.taskTextDone : styles.taskText}
            editable={hasEdit}
            value={taskEdited}
            onChangeText={setTaskEdited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {hasEdit ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleCancelEditing()}
          >
            <Image source={cancelIcon} />
          </TouchableOpacity>

        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleStartEditing()}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider}/>

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={hasEdit}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{opacity: hasEdit ? 0.2 : 1}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#c4c4c43d',
    marginHorizontal: 12
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  viewButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
})