import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native';

export const ModalDesign = styled(Modal)`
  justify-content: flex-end;
  margin: 0px;
`;

export const ModalContainer = styled.View`
  background-color: #fff;
  flex: 0.5;
  margin: 0px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 20px;
`;

export const ModalText = styled.Text`
  margin-top: 10px;
  color: #000;
  font-size: 25px;
  font-weight: 700;
`;

export const Categories = styled.ScrollView`
  margin-top: 43px;
  flex-grow: 0;
`;

export const Category = styled.TouchableOpacity`
  align-items: center;
  margin: 0 16px;
  height: 32px;
`;

export const CategoryUnderline = styled.View`
  width: 15px;
  height: 3px;
  background-color: #000;
`;

export const CategoryName = styled.Text`
  color: ${props => (props.selected ? '#000' : '#BDBDBD')};
  font-weight: ${props => (props.selected ? '700' : '500')};
`;

export const Slots = styled(FlatList)`
`;

export const SlotItem = styled.TouchableOpacity`
  background-color: ${props => (props.selected ? '#0C9266' : '#F2F2F2')};
  justify-content: center
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 3px;
  width: 66px;
  height: 36px;
`;

export const SlotItemText = styled.Text`
  color: ${props => (props.selected ? '#fff' : '#BDBDBD')};
  text-align: center;
  font-size: 16px;
  font-weight: ${props => (props.selected ? '700' : '200')};
`;
