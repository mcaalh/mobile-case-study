import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { useUserState, useUserDispatch } from '../../../../context';
import { GET_SLOTS } from '../../../../graphql/queries/order';

import {
  ModalContainer,
  ModalText,
  Categories,
  Category,
  CategoryName,
  CategoryUnderline,
  ModalDesign,
  Slots,
  SlotItem,
  SlotItemText,
} from './styles';

const slotsAvailable = [
  { id: 1, start: '2021-05-03T14:05:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 2, start: '2021-05-03T10:15:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 3, start: '2021-05-03T11:25:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 4, start: '2021-05-03T11:35:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 5, start: '2021-05-03T14:45:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 6, start: '2021-05-03T14:15:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 7, start: '2021-05-03T10:25:00.000Z', end: '2021-05-03T14:05:00.000Z' },
  { id: 8, start: '2021-05-03T10:30:00.000Z', end: '2021-05-03T14:05:00.000Z' },
];

const groupByHour = array => {
  let slotsHour;
  array.reduce((slots, slot) => {
    const date = new Date(slot.start).getHours();
    if (!slots[date]) {
      slots[date] = [];
    }
    slots[date].push(slot);
    slotsHour = slots;
    return slotsHour;
  }, {});
  return Object.keys(slotsHour).map(hour => {
    return {
      hour,
      slots: slotsHour[hour],
    };
  });
};

const SlotList = ({ isOpened }) => {
  const { slot, slots } = useUserState();
  const [slotsData, setSlotsData] = useState(slotsAvailable); //TODO: change to slots
  const [slotMinute, setSlotMinute] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const dispatch = useUserDispatch();

  const { data, error, loading } = useQuery(GET_SLOTS, {
    onCompleted: () => {
      setSlotsData(data);
    },
  });

  useEffect(() => {
    setSlotsData(groupByHour(slotsAvailable));
    if (error) {
      alert(error);
    }
    if (loading) {
      // alert(loading);
    }
    // if (!error && !loading) {
    //   alert(data);
    //   setSlotsData(data.availableSlots);
    // }
  }, [loading, data, error, slot, slots]);

  const changeCategory = category => {
    //TODO Change to slots hour and load the proper available slot list
    // alert(category.slots);
    setSlotMinute(category.slots);
    setSelectedCategory(category);
  };

  return (
    <ModalDesign animationType="slide" transparent={true} visible={isOpened}>
      <ModalContainer>
        <ModalText>À quelle heure arrives-tu? </ModalText>
        <Categories horizontal={true} showsHorizontalScrollIndicator={false}>
          {slotsData.map(category => {
            return (
              <Category key={category.hour} onPress={() => changeCategory(category)}>
                <CategoryName selected={selectedCategory === category}>
                  {category.hour}h
                </CategoryName>
                {selectedCategory === category && <CategoryUnderline />}
              </Category>
            );
          })}
        </Categories>
        <Slots
          data={slotMinute}
          renderItem={({ item }) => {
            return (
              <SlotItem
                onPress={() => {
                  dispatch({
                    type: 'SET_SLOT',
                    payload: item,
                  });
                }}
                selected={slot === item}>
                <SlotItemText selected={slot === item}>
                  {dayjs(item.start).format('HH:mm')}
                </SlotItemText>
              </SlotItem>
            );
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          keyExtractor={({ key }) => key}
        />
      </ModalContainer>
    </ModalDesign>
  );
};

SlotList.protoTypes = {
  isOpened: PropTypes.bool,
};

export default SlotList;
