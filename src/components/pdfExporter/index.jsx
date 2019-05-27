import React from 'react';
import {Spinner} from 'react-bootstrap';

import {
    Text,
    Page,
    StyleSheet,
    Image,
    Link,
    PDFViewer,
    View,
    Document,
    PDFDownloadLink
} from '@react-pdf/renderer';
import {Modal,Button} from 'react-bootstrap';
import Title from './Title';
import {getShortDate} from '../../utils/DateUtils'
// import Skills from './Skills';

const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        '@media max-width: 400': {
            flexDirection: 'column'
        }
    },
    image: {
        marginBottom: 10
    },
    leftColumn: {
        flexDirection: 'column',
        width: 170,
        paddingTop: 30,
        paddingRight: 15,
        '@media max-width: 400': {
            width: '100%',
            paddingRight: 0
        },
        '@media orientation: landscape': {
            width: 200
        }
    },
    footer: {
        fontSize: 12,
        fontWeight: 900,
        textAlign: 'center',
        marginTop: 25,
        paddingTop: 10,
        borderWidth: 3,
        borderColor: 'gray',
        borderStyle: 'dashed',
        '@media orientation: landscape': {
            marginTop: 10
        }
    }
});

const educationStyles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    school: {
        fontWeight: 900,
        fontSize: 10
    },
    degree: {
        fontSize: 10
    },
    candidate: {
        fontStyle: 'italic',
        fontSize: 10
    }
});

const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch'
    },
    detailColumn: {
        flexDirection: 'column',
        flexGrow: 9
    },
    linkColumn: {
        flexDirection: 'column',
        flexGrow: 2,
        alignSelf: 'flex-end',
        justifySelf: 'flex-end'
    },
    name: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 900
    },
    subtitle: {
        fontSize: 10,
        justifySelf: 'flex-end',
        textTransform: 'uppercase'
    },
    link: {
        fontSize: 10,
        color: 'black',
        textDecoration: 'none',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end'
    }
});

const experienceStyles = StyleSheet.create({
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
                            <View style={headerStyles.container}>
                                <View style={headerStyles.detailColumn}>
                                    <Text style={headerStyles.name}>{`${this.props.firstName} ${this.props.lastName}`}</Text>
                                </View>
                                <View style={headerStyles.linkColumn}>
                                    <Link style={headerStyles.link}>JooJ</Link>
                                </View>
                            </View>
                            <View style={styles.container}>
                                <View style={styles.leftColumn}>
                                    <Image src={this.props.profilePic} style={styles.image}/>
                                    <View style={educationStyles.container}>
                                        <Title>Formação</Title>
                                        {this.props.graduations
                                            ? Object
                                                .entries(this.props.graduations)
                                                .map((graduation) => (
                                                    <View key={graduation[0]}>
                                                        <Text style={educationStyles.school}>{graduation[1].institution}</Text>
                                                        <Text style={educationStyles.degree}>{graduation[1].graduation} em {graduation[1].area}</Text>
                                                        <Text style={educationStyles.candidate}>{graduation[1].startDate.year}
                                                            - {graduation[1].endDate.year}</Text>
                                                    </View>
                                                ))
                                            : <Text style={educationStyles.candidate}>Não possui formação.</Text>}
                                    </View>
                                </View>
                                <View style={experienceStyles.container}>
                                    <Title>Experiências</Title>
                                    {this.props.experiences
                                        ? Object
                                            .entries(this.props.experiences)
                                            .map((experience) => (
                                                <View key={experience[0]} style={experienceStyles.entryContainer}>
                                                    <View style={experienceStyles.headerContainer}>
                                                        <View style={experienceStyles.leftColumn}>
                                                            <Text style={experienceStyles.title}>{experience[1].company} | {experience[1].post}</Text>
                                                        </View>
                                                        <View style={experienceStyles.rightColumn}>
                                                            <Text style={experienceStyles.date}>{getShortDate(experience[1].startDate)} até {experience[1].isCurrentWork
                                                                    ? 'o momento'
                                                                    : getShortDate(experience[1].endDate)}.</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        : <Text style={experienceStyles.date}>Não possui experiência</Text>}
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
                            {({loading}) => (<Button block disabled={loading}>{loading ? <><Spinner animation="border" />'Carregando arquivo...'</> : 'Baixar'}</Button>)}
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
