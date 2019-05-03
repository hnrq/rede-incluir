import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {Row, Col} from 'react-bootstrap';
import {getDateRange} from '../../utils/DateUtils'
import graduationPlaceholder from '../../images/graduation-placeholder.svg';

export default class GraduationList extends Component {
    editGraduation = (initialValues, id) => this
        .props
        .listItemAction({
            ...initialValues,
            id,
            action: null
        });

    getSortedItems = () => {
        const {items} = this.props;
        if(!items) return;
        var sortableItems = Object
            .keys(items)
            .map((key) => ({
                ...items[key],
                id: key
            }));
        sortableItems.sort((item1, item2) => item1.endDate.year - item2.endDate.year + item1.startDate.year - item2.startDate.year)
        return sortableItems;
    }

    render() {
        const {title, listAction, type} = this.props;
        const items = this.getSortedItems();
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
                                    < FontAwesomeIcon icon={faPlus}/></i>
                            </Col>
                        : null
}
                </Row>
                {!!this.props.items
                    ? items.map((item) => <ListItem
                        title={item.institution}
                        key={item.id}
                        subtitle={`${item.graduation}, ${item.area}`}
                        picture={graduationPlaceholder}
                        info={getDateRange(item.startDate, item.endDate, item.isCurrentWork)}
                        id={item.id}
                        action={() => this.editGraduation(item, item.id)}
                        type={type}/>)
                    : <i>Não há graduações</i>}
                <hr/>
            </div>
        )
    }
}