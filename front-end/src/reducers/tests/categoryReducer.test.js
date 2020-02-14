
import reducer, {
  SET_MAJOR_CATS,
  ADD_MAJOR_CAT,
  ADD_SUB_CAT,
  setTopLevelCat,
  addTopLevelCat,
  addSubCat
} from '../categoryReducer';
import { act } from 'react-dom/test-utils';


test('setTopLevelCat  action', () => {

  const data = 'all category data';
  const retval = setTopLevelCat(data);
  expect(retval.type).toEqual(SET_MAJOR_CATS);
  expect(retval.data).toEqual(data);

});

test('addTopLevelCat action', () => {

  const data = 'new category data';
  const retval = addTopLevelCat(data);
  expect(retval.type).toEqual(ADD_MAJOR_CAT);
  expect(retval.data).toEqual(data);


});

test('addSubCat action', () => {

  const data = 'sub category data';
  const retval = addSubCat(data);
  expect(retval.type).toEqual(ADD_SUB_CAT);
  expect(retval.data).toEqual(data);

});

test('reducer set major category data', () => {

  const sampleCatData = {
    categoryName: 'sample cat',
    description: 'sample cat description',
    isMajor: false, //This should be set back to true
    parent: null,
    childCategories: [123, 456], 
    items: []
  };

  const sampleCatData2 = {
    categoryName: 'sample cat2',
    description: 'sample cat description2',
    isMajor: true,
    parent: null,
    childCategories: [789, 101112], 
    items: []
  };

  const action = {
    type: SET_MAJOR_CATS,
    data: [sampleCatData, sampleCatData2]
  };

  const retval = reducer([], action);

  expect(retval.length).toBe(2);
  expect(retval[1].categoryName).toEqual(sampleCatData2.categoryName);

});

test('add a new major category', () => {

  const sampleCatData = {
    categoryName: 'sample cat',
    description: 'sample cat description',
    isMajor: false, //This should be set back to true
    parent: 8675309,
    childCategories: [123, 456], 
    items: [789, 101112]
  };

  const action = {
    type: ADD_MAJOR_CAT,
    data: sampleCatData
  };

  const retval = reducer([], action);
  expect (retval.length).toBe(1);
  expect (retval[0].isMajor).toBe(true);

  //Verify that a deep copy was made, and that changing values will not change the store
  sampleCatData.categoryName = 'string changed';
  sampleCatData.childCategories = [];
  sampleCatData.items = [];

  expect(retval[0].categoryName).toEqual('sample cat');
  expect(retval[0].childCategories.length).toBe(2);
  expect(retval[0].items.length).toBe(2);

});

test('add a sub category', () => {

  const sampleCatData = {
    categoryName: 'sample cat',
    description: 'sample cat description',
    isMajor: true, //This should be set back to false
    parent: 8675309,
    childCategories: [123, 456], 
    items: [789, 101112]
  };

  const action = {
    type: ADD_SUB_CAT,
    data: sampleCatData
  };

  const retval = reducer([], action);
  expect (retval.length).toBe(1);
  expect (retval[0].isMajor).toBe(false);

  //Verify that a deep copy was made, and that changing values will not change the store
  sampleCatData.categoryName = 'string changed';
  sampleCatData.childCategories = [];
  sampleCatData.items = [];

  expect(retval[0].categoryName).toEqual('sample cat');
  expect(retval[0].childCategories.length).toBe(2);
  expect(retval[0].items.length).toBe(2);

});


