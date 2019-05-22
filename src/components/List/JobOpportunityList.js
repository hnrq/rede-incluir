import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {Row, Col} from 'react-bootstrap';
import {formatMoney} from '../../utils/currencyUtils';

export default class ExperienceList extends Component {

    editJobOpportunity = (initialValues,id) => this.props.listItemAction({...initialValues, id, action: null})

    render() {
        const {title, listAction, type, items,showItemAction} = this.props;
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
                            subtitle={`R$ ${formatMoney(item[1].salary)} • ${item[1].workLoad}`}
                            picture="https://upload.wikimedia.org/wikipedia/commons/5/50/Business_Suitcase_Flat_Icon.svg"
                            extraInfo={item[1].desc}
                            collapsible
                            id={item[0]}
                            showItemAction={showItemAction}
                            action={() => this.editJobOpportunity(item[1],item[0])}
                            type={type}/>)
                    : <i className="list-empty">Não há vagas de emprego</i>}
            </div>
        )
    }
}