import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {getDateRange} from '../../utils/DateUtils'

export default class ExperienceList extends Component {

    editExperience = (initialValues, id) => this
        .props
        .listItemAction({
            ...initialValues,
            id,
            action: null
        })

    render() {
        const {title, listAction, type, items, showItemAction} = this.props;
        return (
            <div className="list">
                        <h3 className="list-title">{title}</h3>
                    {listAction
                        ? <i className="btn icon-button list-action" onClick={listAction}>
                                <FontAwesomeIcon icon={faPlus}/></i>
                        : null
}
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
                            showItemAction={showItemAction}
                            action={() => this.editExperience(item[1], item[0])}
                            type={type}/>)
                    : <i className='list-empty'>Não há experiências</i>}
            </div>
        )
    }
}