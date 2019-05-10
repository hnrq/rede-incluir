import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {Row, Col} from 'react-bootstrap';
import {getDateRange} from '../../utils/DateUtils'

export default class ExperienceList extends Component {

    editJobOpportunity = (initialValues,id) => this.props.listItemAction({...initialValues, id, action: null})

    render() {
        const {title, listAction, type, items} = this.props;
        return (
            <div className="list">
                <Row>
                    <Col>
                        <h3 className="list-title">{title}</h3>
                    </Col>
                    {listAction
                        ? <Col
                                style={{
                                textAlign: 'right'
                            }}>
                                <i className="btn icon-button list-action" onClick={listAction}>
                                    <FontAwesomeIcon icon={faPlus}/></i>
                            </Col>
                        : null
}
                </Row>
                {!!items
                    ? Object
                        .entries(items)
                        .map((item) => <ListItem
                            title={item[1].post}
                            key={item[0]}
                            subtitle={item[1].company}
                            picture="https://upload.wikimedia.org/wikipedia/commons/5/50/Business_Suitcase_Flat_Icon.svg"
                            info={getDateRange(item[1].startDate, item[1].endDate, item[1].isCurrentWork)}
                            extraInfo={item[1].workLocation}
                            id={item[0]}
                            action={() => this.editJobOpportunity(item[1],item[0])}
                            type={type}/>)
                    : <i>Não há vagas de emprego</i>}
                <hr/>
            </div>
        )
    }
}