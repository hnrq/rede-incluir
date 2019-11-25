import React from 'react';

import { Link, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    textTransform: 'uppercase',
  },
  link: {
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
});

export default (props) => (
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>{`${props.firstName} ${props.lastName}`}</Text>
    </View>
    <View style={styles.linkColumn}>
      <Link style={styles.link}>JooJ</Link>
    </View>
  </View>
);
