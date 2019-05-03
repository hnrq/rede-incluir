import React, {Component} from 'react';
import ListItem from './ListItem';
import {Row, Col} from 'react-bootstrap';
import placeholder from '../../images/ppic-placeholder.png';

export default class SearchList extends Component {

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
                            title={item[1].firstName + ' '+ item[1].lastName}
                            key={item[0]}
                            to={item[0]}
                            subtitle={item[1].occupation}
                            picture={placeholder}
                            info={item[1].workLocation}
                            id={item[0]}
                            type={type}/>)
                    : <i>A pesquisa não gerou resultados.</i>}
                <hr/>
            </div>
        )
    }
}