import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {Row,Col} from 'react-bootstrap';

export default class List extends Component{
    render(){
        const {title,listActionOnClick,itemOnClick,type,items} = this.props;
        return(
            <div className="list">
                <Row>
                    <Col><h3 className="list-title">{title}</h3></Col>
                    <Col style={{textAlign:'right'}}><i className = "btn icon-button list-action"
                    onClick = {listActionOnClick} > < FontAwesomeIcon
                    icon={faPlus}
                    /></i></Col>
                </Row>
                { !!items ? Object.entries(items).map((item) => <ListItem {...item[1]} key={item[0]} itemOnClick={itemOnClick} type={type}/>) : <i>Lista Vazia</i>}
                <hr/>
            </div>
        )
    }
}