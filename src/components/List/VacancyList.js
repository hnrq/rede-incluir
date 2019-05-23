import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {formatMoney} from '../../utils/currencyUtils';

export default class ExperienceList extends Component {

    editVacancy = (initialValues, id) => this
        .props
        .listItemAction({
            ...initialValues,
            id,
            action: null
        })

    vacancyApply = (id, title) => this
        .props
        .listItemAction(id, title);

    render() {
        const {
            title,
            listAction,
            type,
            items,
            showItemAction,
            buttonText
        } = this.props;
        return (
            <div className="list">
                <h3 className="list-title">{title}</h3>
                {listAction
                    ? <i className="btn icon-button list-action" onClick={listAction}>
                            <FontAwesomeIcon icon={faPlus}/></i>

                    : null
                }
            {
            !!items
                ? Object
                    .entries(items)
                    .map((item) => <ListItem
                        title={item[1].post}
                        key={item[0]}
                        subtitle={`R$ ${formatMoney(item[1].salary)} • ${item[1].workLoad}`}
                        picture="https://upload.wikimedia.org/wikipedia/commons/5/50/Business_Suitcase_Flat_Icon.svg"
                        extraInfo={item[1].desc}
                        collapsible
                        buttonText={buttonText}
                        id={item[0]}
                        showItemAction={showItemAction}
                        action={() => buttonText
                        ? this.vacancyApply(item[0], item[1].post)
                        : this.editVacancy(item[1], item[0])}
                        type={type}/>)
                : <i className="list-empty">Não há vagas de emprego</i>
        } < /div>
        )
    }
}