import React from 'react';
import {getShortDate} from '../../utils/DateUtils'
import Title from './Title';
// import List, {Item} from './List';
import {Text, View, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0
    }
  },
  entryContainer: {
    marginBottom: 10
  },
  date: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  detailContainer: {
    flexDirection: 'row'
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9
  },
  bulletPoint: {
    fontSize: 10
  },
  details: {
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end'
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
});

const ExperienceEntry = ({company, startDate, endDate, post, workLocation, isCurrentWork}) => {
  const title = `${company} | ${post}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>{getShortDate(startDate)} até {isCurrentWork ? 'o momento' : getShortDate(endDate)}.</Text>
        </View>
      </View>
    </View>
  );
};

export default class Experience extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title>Experiências</Title>
        {this.props.experiences ? Object.entries(this.props.experiences).map((experience) => (
          <View key={experience[0]} style={styles.entryContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.title}>{experience[1].company} | {experience[1].post}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.date}>{getShortDate(experience[1].startDate)} até {experience[1].isCurrentWork ? 'o momento' : getShortDate(experience[1].endDate)}.</Text>
              </View>
            </View>
          </View>)) : <Text style={styles.date}>Não possui experiência</Text>
}
      </View>
    );
  }
}
