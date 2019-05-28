import React from 'react';
import {Spinner} from 'react-bootstrap';

import {
    Text,
    Page,
    StyleSheet,
    Image,
    PDFViewer,
    View,
    Document,
    PDFDownloadLink
} from '@react-pdf/renderer';
import {Modal,Button} from 'react-bootstrap';
import {getShortDate} from '../../utils/DateUtils'
// import Skills from './Skills';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    container: {
        flex: 2,
        flexDirection: 'column',
    },
    horizontalContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems:'center',
    },
    image: {
        marginBottom: 10,
        width:130,
        height:130,
    },
    detailColumn: {
        marginLeft: 10
    },
    info: {
        fontWeight: 'light',
        fontSize: 14,
        borderBottomWidth: 2,
        marginBottom:10,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
    },
    description:{
        fontSize: 14,
        width:'75%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
});

const listStyle = StyleSheet.create({
    container: {
        flex: 0,
        paddingTop: 30,
        paddingLeft: 15,
        '@media max-width: 400': {
            paddingTop: 10,
            paddingLeft: 0
        }
    },
    header:{
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        marginBottom:5,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
    },
    entryContainer: {
        marginBottom: 10
    },
    date: {
        fontSize: 11,
        fontStyle: 'italic'
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
        fontSize: 10
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
        fontWeight: 900
    }
});


export default class Output extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: true
        };
    }

    componentDidMount() {
        this.setState({ready: false});
        setTimeout(() => {
            this.setState({ready: true});
        }, 10);
    }

    componentWillUnmount(){

    }

    render() {
        if (this.state.ready) {
            const Doc =
                (<Document
                        author={this.props.firstName + " " + this.props.lastName}
                        subject={`Curriculo de ${this.props.firstName}`}
                        title={`Curriculo de ${this.props.firstName}`}>
                        <Page style={styles.page} size="A4">
                            <View style={styles.container}>
                                <View style={styles.horizontalContainer}>
                                    <Image src={this.props.profilePic} style={styles.image}/>
                                    <View style={styles.detailColumn}>
                                        <Text style={styles.title}>{this.props.email}</Text>
                                        <Text style={styles.title}>{`${this.props.firstName} ${this.props.lastName}`}</Text>
                                        <Text style={styles.info}>{`${this.props.userDisabilities.map((disability) => disability.label).join(', ')} ${this.props.cid10 ? ` • CID10: ${this.props.cid10}` : null}`}</Text>
                                        <Text style={styles.description}>{this.props.desc}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.container}>
                                    <Text style={listStyle.header}>Experiências</Text>
                                    {this.props.experiences
                                        ? Object
                                            .entries(this.props.experiences)
                                            .map((experience) => (
                                                <View key={experience[0]} style={listStyle.entryContainer}>
                                                    <View style={listStyle.headerContainer}>
                                                        <View style={listStyle.leftColumn}>
                                                            <Text style={listStyle.title}>{experience[1].company} | {experience[1].post}</Text>
                                                        </View>
                                                        <View style={listStyle.rightColumn}>
                                                            <Text style={listStyle.date}>{getShortDate(experience[1].startDate)} até {experience[1].isCurrentWork
                                                                    ? 'o momento'
                                                                    : getShortDate(experience[1].endDate)}.</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        : <Text style={listStyle.date}>Não possui experiência</Text>}
                                </View>
                                <View style={listStyle.container}>
                                    <Text style={listStyle.header}>Formação</Text>
                                    {this.props.graduations
                                        ? Object
                                            .entries(this.props.graduations)
                                            .map((graduation) => (
                                                <View key={graduation[0]}>
                                                    <View style={listStyle.leftColumn}><Text style={listStyle.title}>{graduation[1].institution}</Text></View>
                                                    <View style={listStyle.leftColumn}><Text style={listStyle.title}>{graduation[1].graduation} em {graduation[1].area}</Text></View>
                                                    <View style={listStyle.rightColumn}><Text style={listStyle.date}>{graduation[1].startDate.year} - {graduation[1].endDate.year}</Text></View>
                                                </View>
                                            ))
                                        : <Text style={listStyle.date}>Não possui formação.</Text>}
                                </View>
                            </View>
                        </Page>
                    </Document>);
            return (
                <>
                <PDFViewer width='100%' height='480'>
                    {Doc}
                </PDFViewer>
                <Modal.Footer>
                        <PDFDownloadLink style={{color:'white',textDecoration:'none', width:'100%'}} document={Doc} fileName="curriculum.pdf">
                            {({loading}) => (<Button block disabled={loading}>{loading ? <><Spinner animation="border" size="sm"/>'Carregando arquivo...'</> : 'Baixar'}</Button>)}
                        </PDFDownloadLink>
                </Modal.Footer>
                </>
            )
        } else 
            return <div style={{width:'100%',height:'480px',display: 'flex',justifyContent: 'center',alignItems: 'center'}}><Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner></div>;
        }
    }
