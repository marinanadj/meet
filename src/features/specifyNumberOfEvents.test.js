import { loadFeature, defineFeature } from 'jest-cucumber';
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
let AppWrapper;

defineFeature(feature, test => {

    test('When user hasn\'t specified a number, 32 is the default number.', ({ given, when, then }) => {
        given('the user is on the main page of the app', () => {

        });

        when('the user hasn\'t specified a number of events', () => {

        });

        then(/^the default number of displayed events will be (\d+)$/, (arg0) => {

        });
    });

    test('When user hasn’t specified a number, 12 is the default number', ({ given, when, then }) => {
        given('the user has not specified a number of events to show', () => {
            AppWrapper = mount(<App />);
        });

        when('the page loads', () => {
            AppWrapper.update();
        });

        then('12 events should be displayed (unless there are less available)', () => {
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });

    test('When the user types a number into the textbox, the number of events displayed should match the input number', ({ given, when, then }) => {
        given('the main page is open', () => {
            AppWrapper = mount(<App />);        
        });

        when('the user selects a different amount into the textbox', () => {
            AppWrapper.update();
            AppWrapper.find('.events_number__input').simulate('change', { target: { value: '1' } });
        });

        then('the number of events displayed should match the number', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            AppWrapper.update();
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(1);
        });
    });
});