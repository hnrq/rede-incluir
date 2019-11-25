import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  degree: {
    fontSize: 10,
  },
  candidate: {
    fontStyle: 'italic',
    fontSize: 10,
  },
});

export default class Education extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Title>Formação</Title>
        { this.props.graduations ?
          Object.entries(this.props.graduations).map((graduation)=>
            (<View key={graduation[0]}>
              <Text style={styles.school}>{graduation[1].institution}</Text>
              <Text style={styles.degree}>{graduation[1].graduation} em {graduation[1].area}</Text>
              <Text style={styles.candidate}>{graduation[1].startDate.year} - {graduation[1].endDate.year}</Text>
            </View>)) : 
              <Text style={styles.candidate}>Não possui formação.</Text>
        }
      </View>
    )
  }
}