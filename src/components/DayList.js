import React from 'react';
import DayListItem from 'components/DayListItem';

// DayList renders a list of DayListItem components
export default function DayList(props) {

  const { days, value, onChange } = props;

  const dayListItems = days.map(d => {
 
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === value}
        setDay={onChange}
       />
    )
  })
  return <ul>{dayListItems}</ul>
}