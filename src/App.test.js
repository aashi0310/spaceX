import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
});

let wrapper;

beforeEach(() => {
    const wrapper = shallow(<App />);
});

afterEach(() => {
    wrapper.unmount();
 });

 describe('App', () => {
    it('fetches data from server when server returns a successful response', done => { // 1
      const mockSuccessResponse = {};
      const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
      const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetchAPI').mockImplementation(() => mockFetchPromise); // 4
      
      const wrapper = shallow(<App />); // 5
                              
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://api.spacexdata.com/v3/launches?limit=100limit=150&launch_year=&launch_success=&land_success=');
  
      process.nextTick(() => { // 6
        expect(wrapper.state()).toEqual({
          // ... assert the set state
        });
  
        global.fetch.mockClear(); // 7
        done(); // 8
      });
    });
  });