import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Text } from 'react-native';

import { useUserState } from '../../../../context';
import { GET_AVAILABLE_SLOTS } from '../../../../graphql/queries/order';

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
  const { data, error, loading } = useQuery(GET_AVAILABLE_SLOTS);

  // let datas = data.availableSlots.json();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const changeCategory = category => {
    setSelectedCategory(category);
  };

  return (
    <ModalDesign animationType="slide" transparent={true} visible={isOpened}>
      <ModalContainer>
        <ModalText>À quelle heure arrives-tu? </ModalText>
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
              <SlotItem>
                <SlotItemText>{item.label}</SlotItemText>
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

export default SlotList;
