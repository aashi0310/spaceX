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

it("must render a loading div before api call success", () => {
    
});
