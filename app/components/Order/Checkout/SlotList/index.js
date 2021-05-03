import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

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

const categoryList = ['11h', '12h', '13h', '14h', '15h', '16h'];
const dataHours = [
  { label: '11h05' },
  { label: '11h10' },
  { label: '11h15' },
  { label: '11h20' },
  { label: '11h25' },
  { label: '11h30' },
];

const SlotList = ({ isOpened }) => {
  const { slot, slots } = useUserState();
  const [slotsData, setSlotsData] = useState([]); //TODO: change to slots
  const [selectedCategory, setSelectedCategory] = useState();
  const dispatch = useUserDispatch();

  const { error, loading } = useQuery(GET_SLOTS, {
    onCompleted: data => {
      setSlotsData(data.slots);
    },
  });

  const changeCategory = category => {
    //TODO Change to slots hour and load the proper available slot list
    setSelectedCategory(category);
  };

  return (
    <ModalDesign animationType="slide" transparent={true} visible={isOpened}>
      <ModalContainer>
        <ModalText>À quelle heure arrives-tu? </ModalText>
        <Text>{JSON.stringify(slotsData)}</Text>
        <Categories horizontal={true} showsHorizontalScrollIndicator={false}>
          {categoryList.map((category, index) => {
            return (
              <Category key={category.id} onPress={() => changeCategory(category)}>
                <CategoryName selected={selectedCategory === category}>{category}</CategoryName>
                {selectedCategory === category && <CategoryUnderline />}
              </Category>
            );
          })}
        </Categories>
        <Slots
          data={dataHours}
          renderItem={({ item }) => {
            return (
              <SlotItem
                onPress={() =>
                  dispatch({
                    type: 'SET_SLOT',
                    payload: item,
                  })
                }
                selected={slot === item}>
                <SlotItemText selected={slot === item}>{item.label}</SlotItemText>
              </SlotItem>
            );
          }}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between', // Needed for wrapping for the items
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
