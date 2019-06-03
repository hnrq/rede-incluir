import React, {Component} from 'react';
import ListItem from './ListItem';
import {Row, Col} from 'react-bootstrap';
import placeholder from '../../images/ppic-placeholder.png';
import {disabilities} from '../../utils/Disabilities';

export default class SearchList extends Component {
    getDisabilities = (userDisabilities) => disabilities.filter((disability) => userDisabilities.includes(disability.value)).map((disability) => disability.label).join(', ');

    render() {
        const {title, type, items} = this.props;
        return (
            <div className="list">
                <Row>
                    <Col>
                        <h3 className="list-title">{title}</h3>
                    </Col>
                </Row>
                {!!items
                    ? Object
                        .entries(items)
                        .map((item) => <ListItem
                            title={item[1].isCompany ? item[1].name : item[1].firstName + ' '+ item[1].lastName}
                            key={item[0]}
                            picture={item[1].profilePic ? item[1].profilePic : placeholder}
                            to={item[0]}
                            subtitle={item[1].occupation}
                            info={item[1].workLocation}
                            extraInfo={item[1].disabilities ? this.getDisabilities(item[1].disabilities) : null}
                            id={item[0]}
                            type={type}/>
                        )
                    : <i>A pesquisa não gerou resultados.</i>}
                <hr/>
            </div>
        )
    }
}